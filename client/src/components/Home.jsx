import React, { useEffect, useState } from "react";
import s from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs, getTemperaments } from "../actions";
import Cards from "./Cards";
import Filter from "./Filter";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

export default function Home () {
    const dispatch = useDispatch();

    let dogs = useSelector(state => state.dogs);
    let temperaments = useSelector(state => state.temperaments);

    const [orderName, setOrderName] = useState('');
    const [orderWeight, setOrderWeight] = useState('');
    const [ loading, setLoading ] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    let indexOfLastDog = currentPage * dogsPerPage;
    let indexOfFirstDog = indexOfLastDog - dogsPerPage;
    let currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    const paged = numPage => {
        setCurrentPage(numPage);
    }

    const newLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
        newLoading();
    },[]);

    const handleClick = e => {
        dispatch(getDogs());
        newLoading();
    }

    return(
        <div>
                {
                    dogs.length || !loading ? (
                        <div>
                            <img className={s.jake} src="https://i.gifer.com/1fJm.gif"/>
                            <div className={s.container}>
                                <Filter setOrderWeight={setOrderWeight} setOrderName={setOrderName} temperaments={temperaments} paged={paged} setCurrentPage={setCurrentPage} />
                                <button className={s.button}><Link className={s.link} to='/breed'>Create a new breed</Link></button>
                                <button className={s.button} onClick={e => handleClick(e)}>Refresh Dogs</button>
                                <h1>YOU ARE IN HOME</h1>
                                <Paged dogs={dogs.length} dogsPerPage={dogsPerPage} paged={paged} />
                            </div>
                            <SearchBar newLoading={newLoading} setCurrentPage={setCurrentPage} paged={paged} />
                            <div>
                            {
                                loading || !currentDogs.length
                                ?(
                                    <div>
                                        <img className={s.loading} src="https://64.media.tumblr.com/0e0d397cf35e73323650fedebc4797df/tumblr_nacvecAASJ1tgzy56o1_250.gifv" />
                                    </div>
                                )
                                :(
                                    <Cards dogs = {currentDogs} />
                                )
                            }
                            </div>
                            {
                                !dogs.length &&
                                <h1>Dogs not found</h1>
                            }
                        </div>
                    ) :
                    <div>
                        <img className={s.loading} src="https://i.pinimg.com/originals/a6/75/34/a6753495f11bc5e5e5bcee8d089f0eb3.gif" />
                    </div>
                }
        </div>

    )

}