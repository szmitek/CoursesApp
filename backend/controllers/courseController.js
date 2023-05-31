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
                };
            });
            res.json({ courses });
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
                res.json({ course });
            } else {
                res.status(404).send('Course not found');
            }
        })
        .catch((error) => {
            res.status(500).send('Failed to fetch course from Firestore');
        });
};
