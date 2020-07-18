import React from "react";
import "./Home.css";
import LoaderButton from "../LoaderButton/LoaderButton";

export default function Home() {
    return (
        <div className="Home">
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={false}
                    disabled={false}
                >
                    Get Users
                </LoaderButton>
            </div>
        </div>
    );
}