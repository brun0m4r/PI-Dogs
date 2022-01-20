import React from "react";
import s from './Jake.module.css';
import { Link } from 'react-router-dom';

export default function Jake() {
    return(
        <div className={s.container}>
            <h1 className={s.title}>Hi, i'm Jake</h1>
            <div className={s.text}>
                <p>This small page was made by Bruno Marinich with the idea and purpose of putting into practice all the knowledge acquired during the course of the 4 modules of the SoyHenry academy.</p>
                <p>Enjoy it.</p>
            </div>
            <Link to='/home' className={s.link}>Go Home</Link>
        </div>
    );
}