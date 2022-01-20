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
            <div>
                <div className={s.card}>
                    <button className={s.button}><Link className={s.link} to='/home'>Go home</Link></button>
                    <h1 className={s.title}>Breed: {breed[0].name}</h1>
                    <div className={s.row}>
                        <img className={s.img} src={breed[0].image} alt="breed without img" className={s.img} />
                        <div className={s.column}>
                            <label>{breed[0].temperament ? `Temperament: ${Array.isArray(breed[0].temperament) ? breed[0].temperament.map(t => t.name).join(', ') : breed[0].temperament}` : ``}</label>
                            <label>Height Max: {breed[0].height_max}cm</label>
                            <label>Height Min: {breed[0].height_min}cm</label>
                            <label>Weight Max: {breed[0].weight_max}Kg</label>
                            <label>Weight Min: {breed[0].weight_min}Kg</label>
                            <label>{breed[0].life_span ? `Life Span: ${breed[0].life_span}` : ``}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
        </div>
    )
}