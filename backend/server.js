const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 7777;

const courseController = require('./controllers/courseController');
const authController = require('./controllers/authController');
const imageController = require('./controllers/imageController'); // Import the image controller

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/')
    .post(authController.loginUser);

app.get('/logout', authController.logout); // Add the missing slash (/) at the beginning

app.route('/courses')
    .get(courseController.getCourses);
app.get('/courses/:id', courseController.getCourseById); // Add the missing slash (/) at the beginning

app.get('/images/:filename', imageController.getImage); // Add the image route

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
