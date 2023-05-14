const firebaseApp = require('../firebaseConfig.js');

exports.loginPage = (req, res) => {
    res.render('login.ejs')
}

exports.loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return res.redirect('/courses');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorCode + ' ' + errorMessage);
        });
}

exports.logout = (req, res) => {
    firebaseApp.auth().signOut()
        .then(() => {
            res.send('Logged out');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorCode + ' ' + errorMessage);
        });
}
