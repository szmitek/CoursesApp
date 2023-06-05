import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SingleCourse = ({ match }) => {
    const courseId = match.params.id;
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:7777/courses/${courseId}`);
            console.log('Fetched course:', response.data);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Failed to fetch course:', error);
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{course.title}</h2>
            <img src={course.imageURL} alt={course.title} />
            <p>Position: {course.position}</p>
            <p>Progress: {course.progress}%</p>
            <p>Description: {course.description}</p>
            {/* Additional course details */}
        </div>
    );
};

export default SingleCourse;
