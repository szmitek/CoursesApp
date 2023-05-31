const { storage } = require('../firebaseConfig');

exports.getImage = (req, res) => {
    const filename = req.params.filename;

    // Create a reference to the image file
    const imageRef = storage.ref().child(filename);

    // Get the download URL for the image
    imageRef
        .getDownloadURL()
        .then((url) => {
            // Redirect the client to the image URL
            res.redirect(url);
        })
        .catch((error) => {
            res.status(404).send('Image not found');
        });
};



