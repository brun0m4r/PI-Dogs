import React from "react";
import s from './Paged.module.css';

export default function Paged({ dogsPerPage, dogs, paged }) {
    let numPage = [];
    for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
        numPage.push(i);
    };
    return (
        <nav>
            <ul className={s.paged}>
                {
                    numPage.map(i =>
                        <button key={i} className={s.numbers} onClick={() => paged(i)}>{i}</button>
                    )
                }
            </ul>
        </nav>
    );
}