import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { breedDetail } from "../actions";
import s from './Details.module.css';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        dispatch(breedDetail(id))
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[]);

    let breed = useSelector(state => state.details);

    return(
        <div className={s.container}>
        {
        loading || !breed.length
        ? (
            <div>
                <img className={s.loading} src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,q_auto,w_820/v1585925607/content-items/004/025/487/001._MAK_Alejandro_Mazuelas_Kamiruaga_Humo_PIXEL_ARTx04-original.gif?1585925607" />
            </div>
        )
        : (
            <div className={s.card}>
                <Link to='/home'><button>Go home</button></Link>
                <h1>breed: {breed[0].name}</h1>
                <img src={breed[0].image} alt="breed without img" className={s.img} />
                <p>Temperament: {Array.isArray(breed[0].temperament) ? breed[0].temperament.map(t => t.name).join(', ') : breed[0].temperament}</p>
                <p>Height Max: {breed[0].height_max}cm</p>
                <p>Height Min: {breed[0].height_min}cm</p>
                <p>Weight Max: {breed[0].weight_max}Kg</p>
                <p>Weight Min: {breed[0].weight_min}Kg</p>
                <p>Life Span: {breed[0].life_span}</p>
            </div>
        )
        }
        </div>
    )
}