import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameDog } from "../actions";
import s from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [ search, setSearch ] = useState();

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        dispatch(getNameDog(search))
        setSearch('');
    }

    return(
        <div className={s.container}>
            <input
            className={s.input}
            type='text'
            placeholder="search a breed..."
            onChange={e => handleChange(e)}
            value={search}
            />
            <button className={s.search} type="submit" onClick={e => handleClick(e)}>Search</button>
        </div>
    );
}