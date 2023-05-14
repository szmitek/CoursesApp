// Express server on port 3000
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const courseController = require('./controllers/courseController');
const authController = require('./controllers/authController');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/')
    .get(authController.loginPage)
    .post(authController.loginUser);

app.get('logout', authController.logout);
app.get('courses', courseController.getCourses);
app.get('courses/:id', courseController.getCourseById);
//app.post('courses', courseController.createCourse);
//app.put('courses/:id', courseController.updateCourse);
//app.delete('courses/:id', courseController.deleteCourse);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

