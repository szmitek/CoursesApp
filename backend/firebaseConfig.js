const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
require("firebase/compat/auth");
require("firebase/compat/storage");

const firebaseConfig = {
    // Your config values go here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = firebase.firestore();

// Initialize Authentication
const auth = firebase.auth();

// Initialize Storage
const storage = firebase.storage();

module.exports = { firestore, auth, storage };