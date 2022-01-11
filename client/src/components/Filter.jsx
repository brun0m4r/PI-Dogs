import React from "react";
import { useDispatch } from "react-redux";
import { createdOrNot, orderByName, orderByWeight, orderByWeightMax, temperamentsDogs } from "../actions";

export default function Filter({ temperaments, paged, setCurrentPage, setOrderName, setOrderWeight }) {

    const dispatch = useDispatch();

    const handleCreatedOrNot = e => {
        dispatch(createdOrNot(e.target.value))
    }

    const handleTemperament = e => {
        dispatch(temperamentsDogs(e.target.value));
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
            <h3>Filter Per:</h3>
            <select onChange={e => handleCreatedOrNot(e)}>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Real'>Real</option>
            </select>
            <select onChange={e => handleTemperament(e)}>
                <option value='All'>All</option>
                {
                    temperaments.map((t, index) => <option key={index} value={t.name}>{t.name}</option>)
                }
            </select>
            <select onChange={e => handleOrderByName(e)}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
            <select onChange={e => handleOrderWeight(e)}>
                <option>...</option>
                <option value='asc'>Greater min weight</option>
                <option value='desc'>Less min weight</option>
            </select>
            <select onChange={e => handleOrderWeightMax(e)}>
                <option>...</option>
                <option value='asc'>Greater max weight</option>
                <option value='desc'>Less max weight</option>
            </select>
        </div>
    );
}