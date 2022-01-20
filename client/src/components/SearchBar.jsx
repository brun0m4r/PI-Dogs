import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameDog } from "../actions";
import s from './SearchBar.module.css';

export default function SearchBar({ newLoading, setCurrentPage, paged }) {
    const dispatch = useDispatch();
    const [ search, setSearch ] = useState();

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        dispatch(getNameDog(search))
        newLoading();
        setSearch('');
        setCurrentPage(1);
    }

    return(
        <div className={s.container}>
            <div className={s.search}>
                <input
                className={s.input}
                type='text'
                placeholder="search a breed..."
                onChange={e => handleChange(e)}
                value={search}
                />
                <button className={s.button} type="submit" onClick={e => handleClick(e)}>
                    <img className={s.img} src="https://cdn-icons.flaticon.com/png/512/4924/premium/4924593.png?token=exp=1642612260~hmac=cb4673c5f068d58466e62c69afab0200" />
                </button>
            </div>
        </div>
    );
}