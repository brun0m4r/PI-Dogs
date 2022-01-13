import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameDog } from "../actions";
import s from './SearchBar.module.css';

export default function SearchBar({ setCurrentPage, paged }) {
    const dispatch = useDispatch();
    const [ search, setSearch ] = useState();

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        dispatch(getNameDog(search))
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
                    <img className={s.img} src="https://cdn-icons.flaticon.com/png/128/5007/premium/5007726.png?token=exp=1642011430~hmac=93c29cb28876c653bc3d2cc3c58c4ca0" />
                </button>
            </div>
        </div>
    );
}