import React, {useEffect, useState} from 'react';
import Page from "../Page/Page";
import {Link} from "react-router-dom";
import {getCourses} from "../../api/springRestApi";
import {parseDuration} from "../../utils/Utils";

const GymClasses = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await getCourses();
                setCourses(response.data);
                console.log(response);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        fetchClasses();
    }, [])


    if (isLoading) return <div> loading... </div>
    return (
        <Page title="Gym Courses">
            <h2>
                Our Classes:
            </h2>
            <div className="list-group">
                {courses.map((course, idx) => {
                    const duration = parseDuration(course.duration);
                    return (
                        <Link key={idx} to={`/`} className="list-group-item list-group-item-action">
                            <strong>{course.className}</strong>{" "}
                            <span className="text-muted small">{duration} of </span>{" "}
                            <span className="text-muted small">{course.description}.</span>{" "}
                            <span className="text-muted small">Only for {course.price}</span>{" "}
                        </Link>
                    )
                })}
            </div>

        </Page>
    );
};

export default GymClasses;