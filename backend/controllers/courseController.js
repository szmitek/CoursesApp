const { firestore } = require('../firebaseConfig');

exports.getCourses = (req, res) => {
    // Fetch all courses from Firestore
    firestore
        .collection('courses')
        .get()
        .then((snapshot) => {
            const courses = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    imageURL: data.imageURL, // Add the imageURL field
                    videos: [], // Initialize an empty array for videos
                };
            });

            // Fetch the videos for each course
            const videoPromises = courses.map((course) =>
                firestore
                    .collection('courses')
                    .doc(course.id)
                    .collection('videos')
                    .get()
                    .then((snapshot) => {
                        const videos = snapshot.docs.map((doc) => doc.data());
                        course.videos = videos; // Assign the videos to the course
                    })
            );

            // Wait for all video fetches to complete
            Promise.all(videoPromises)
                .then(() => {
                    res.json({ courses });
                })
                .catch((error) => {
                    res.status(500).send('Failed to fetch videos from Firestore');
                });
        })
        .catch((error) => {
            res.status(500).send('Failed to fetch courses from Firestore');
        });
};

exports.getCourseById = (req, res) => {
    const courseId = req.params.id;

    // Fetch the specific course by ID from Firestore
    firestore
        .collection('courses')
        .doc(courseId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const course = doc.data();

                // Fetch the videos for the course
                firestore
                    .collection('courses')
                    .doc(courseId)
                    .collection('videos')
                    .get()
                    .then((snapshot) => {
                        const videos = snapshot.docs.map((doc) => doc.data());
                        course.videos = videos; // Assign the videos to the course
                        res.json({ course });
                    })
                    .catch((error) => {
                        res.status(500).send('Failed to fetch videos from Firestore');
                    });
            } else {
                res.status(404).send('Course not found');
            }
        })
        .catch((error) => {
            res.status(500).send('Failed to fetch course from Firestore');
        });
};
