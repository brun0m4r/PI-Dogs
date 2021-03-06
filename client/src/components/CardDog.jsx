import React from "react";
import { Link } from "react-router-dom";
import s from './CardDog.module.css';
import { useDispatch } from 'react-redux';
import { deleteBreed } from "../actions";

export default function CardDog({ name, image, temperament, weight_min, weight_max, height_min, height_max, id, remove, removeFunction }) {
    const dispatch = useDispatch();
    return(
    <div className={s.container}>
        {
            remove && <button name='id' value={id} onClick={e => removeFunction(e)} className={s.remove}>X</button>
        }
        <Link to={`/home/${id}`} className={s.link}>
            <img className={s.img} src={image} alt="Breed without img" />
            <h4 className={s.text}>{name}</h4>
            <h4 className={s.text}>Weight min: {weight_min}</h4>
            <h4 className={s.text}>Weight max: {weight_max}</h4>
            <h5 className={s.text}>{!Array.isArray(temperament) ? temperament :  temperament.map(t => t.name).join(', ')}</h5>
        </Link>
    </div>
    )
}