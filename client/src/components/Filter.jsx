import React from "react";
import { useDispatch } from "react-redux";
import { createdOrNot, orderByName, orderByWeight, orderByWeightMax, temperamentsDogs } from "../actions";
import s from './Filter.module.css';

export default function Filter({ temperaments, paged, setCurrentPage, setOrderName, setOrderWeight }) {

    const dispatch = useDispatch();

    const handleCreatedOrNot = e => {
        dispatch(createdOrNot(e.target.value));
        setCurrentPage(1);
    }

    const handleTemperament = e => {
        dispatch(temperamentsDogs(e.target.value));
        setCurrentPage(1);
    }

    const handleOrderByName = e => {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrderName(`Ordered: ${e.target.value}`)
    }

    const handleOrderWeight = e => {
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrderWeight(`Ordered: ${e.target.value}`)
    }

    const handleOrderWeightMax = e => {
        dispatch(orderByWeightMax(e.target.value));
        setCurrentPage(1);
        setOrderWeight(`Order: ${e.target.value}`);
    }


    return(
        <div>
            <h3>Filter By:</h3>
            <div className={s.containerFilter}>
                <select onChange={e => handleCreatedOrNot(e)} className={s.filter}>
                    <option value="" disabled selected>Filter by created or not</option>
                    <option value='All'>All</option>
                    <option value='Created'>Created</option>
                    <option value='Real'>Real</option>
                </select>
                <select className={s.filter} onChange={e => handleTemperament(e)}>
                    <option value='' disabled selected>Filter by temperaments</option>
                    <option value='All'>All</option>
                    {
                        temperaments.map((t, index) => <option key={index} value={t.name}>{t.name}</option>)
                    }
                </select>
            </div>
            <h3>Order By:</h3>
            <div className={s.containerOrder}>
                <select className={s.filter} onChange={e => handleOrderByName(e)}>
                    <option value='' disabled selected>Order by name</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select className={s.filter} onChange={e => handleOrderWeight(e)}>
                    <option value='' disabled selected>Order by weight min</option>
                    <option value='asc'>Greater min weight</option>
                    <option value='desc'>Less min weight</option>
                </select>
                <select className={s.filter} onChange={e => handleOrderWeightMax(e)}>
                    <option value='' disabled selected>Order by weight max</option>
                    <option value='asc'>Greater max weight</option>
                    <option value='desc'>Less max weight</option>
                </select>
            </div>
        </div>
    );
}