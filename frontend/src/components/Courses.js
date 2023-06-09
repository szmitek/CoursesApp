import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CoursesPage.css';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('all');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:7777/courses');
            console.log('Fetched courses:', response.data);
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    const filteredCourses = selectedPosition === 'all' ? courses : courses.filter((course) => course.position === selectedPosition);

    console.log('Courses:', courses); // Check the value of the courses array

    return (
        <div className="courses-container">
            <h2>Courses Page</h2>
            <div className="position-filter">
                <label htmlFor="position-select">Filter by Position:</label>
                <select id="position-select" value={selectedPosition} onChange={handlePositionChange}>
                    <option value="all">All</option>
                    <option value="mid">Mid</option>
                    <option value="top">Top</option>
                    <option value="bot">Bot</option>
                    <option value="support">Support</option>
                    <option value="jungle">Jungle</option>
                </select>
            </div>
            <div className="courses-grid">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="course-box">
                        <div className="course-image">
                            <div className="position-tag">{course.position}</div>
                            <a href={`/courses/${course.id}`}>
                                <img src={course.imageURL} alt={course.title} />
                            </a>
                        </div>
                        <div className="course-details">
                            <h3>{course.title}</h3>
                            <p>Progress: {course.progress}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
