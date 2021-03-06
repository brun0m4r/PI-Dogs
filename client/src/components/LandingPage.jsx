import React from "react";
import s from './LandingPage.module.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return(
        <div className={s.landing}>
            <h1 className={s.welcome}>Welcome</h1>
            <div className={s.container}>
                <img src="https://i.pinimg.com/originals/1d/07/d3/1d07d3bf5c6e31cc81ea32d42e0ca896.gif" />
                <Link className={s.link} to='/home'>
                    <button className={s.button}>
                        Enter
                    </button>
                </Link>
            </div>
        </div>
    );
}