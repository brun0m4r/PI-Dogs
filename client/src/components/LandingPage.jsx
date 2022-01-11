import React from "react";
import s from './LandingPage.module.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return(
        <div className={s.landing}>
            <div className={s.container}>
                <img src="https://i.pinimg.com/originals/1d/07/d3/1d07d3bf5c6e31cc81ea32d42e0ca896.gif" />
                <h1>Welcome</h1>
                <Link to='/home'>
                    <button className={s.button}>
                        Start
                    </button>
                </Link>
            </div>
        </div>
    );
}