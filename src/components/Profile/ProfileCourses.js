import React from 'react';
import {Link} from "react-router-dom"

const ProfileCourses = () => {
    const posts = [1,2,3]
    return (
        <div className="list-group">
            {posts.map((post,idx) => {
                return (
                    <Link key={idx} to={`/`} className="list-group-item list-group-item-action">
                       <strong>{post}</strong> <span className="text-muted small">on {post} </span>
                    </Link>
                )
            })}
        </div>
    );
};

export default ProfileCourses;