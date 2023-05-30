const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
require("firebase/compat/auth");

const firebaseConfig = {
//Your firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = firebase.firestore();

// Initialize Authentication
const auth = firebase.auth();

module.exports = { firestore, auth };