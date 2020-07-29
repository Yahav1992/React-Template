import React from 'react';
import Page from "../Page/Page";
import ProfileCourses from "./ProfileCourses";
import {useStateContext} from "../../libs/stateContextLib";

const ProfilePage = () => {
    const appState = useStateContext();

    return (
        <Page title="Profile Screen">
            <h2>
                {appState.user.userName}
            </h2>

            <div className="profile-nav nav nav-tabs pt-2 mb-4">
                <a href="#" className="active nav-item nav-link">
                    Posts: 1
                </a>
                <a href="#" className="nav-item nav-link">
                    Followers: 2
                </a>
                <a href="#" className="nav-item nav-link">
                    Following: 3
                </a>
            </div>

            <ProfileCourses/>
        </Page>
    );
};

export default ProfilePage;