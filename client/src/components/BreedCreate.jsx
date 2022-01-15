import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postNewbreed } from "../actions";
import { Link, useHistory } from 'react-router-dom';
import s from './BreedCreate.module.css'


export default function BreedCreate() {
    const [ buttonSubmit, setButton ] = useState(false);
    const [ state, setState ] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        life_span: '',
        image: '',
        temperament: []
    });

    const dispatch =  useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);
    const unique = [...new Set(temperaments)];

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    const validate = () => {
        if(state.name && state.weight_max && state.weight_min && state.image) {
            setButton(true);
        }
    }

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSelect = e => {
        setState({
            ...state,
            temperament: [...state.temperament, e.target.value]
        });
    };

    const handleDelete = e => {
        e.preventDefault();
        const filtered = state.temperament.filter(t => t !== e.target.name);
        setState({
            ...state,
            temperament: filtered
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(postNewbreed(state));
        alert('breed created successfully');
        setState({
            name: '',
            weight_min: '',
            weight_max: '',
            height_min: '',
            height_max: '',
            life_span: '',
            image: '',
            temperament: []
        });
        history.push('/home');
    };

    return(
        <div className={s.container}>
            <h2>Create a new breed</h2>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={s.contName}>
                    <label>*Name</label>
                    <input
                        type='text'
                        value={state.name}
                        name="name"
                        onChange={e => handleChange(e)}
                        required={true}
                        className={s.input}
                    />
                    <label>*Image</label>
                    <input
                        type='text'
                        value={state.image}
                        name="image"
                        onChange={e => handleChange(e)}
                        required={true}
                        className={s.input}
                    />
                </div>
                <div className={s.contWH}>
                    <label>*Weight Min</label>
                    <input
                        type='number'
                        value={state.weight_min}
                        name="weight_min"
                        min="0"
                        onChange={e => handleChange(e)}
                        required={true}
                        className={s.input}
                    />
                    <label>*Weight Max</label>
                    <input
                        type='number'
                        value={state.weight_max}
                        name="weight_max"
                        max="100"
                        onChange={e => handleChange(e)}
                        required={true}
                        className={s.input}
                    />
                    <label>Height Min</label>
                    <input
                        type='number'
                        value={state.height_min}
                        name="height_min"
                        min="1"
                        onChange={e => handleChange(e)}
                        className={s.input}
                    />
                    <label>Height Max</label>
                    <input
                        type='number'
                        value={state.height_max}
                        name="height_max"
                        max="200"
                        onChange={e => handleChange(e)}
                        className={s.input}
                    />
                </div>

                <div>
                    <label>Life Span</label>
                    <input
                        type='text'
                        value={state.life_span}
                        name="life_span"
                        onChange={e => handleChange(e)}
                        className={s.input}
                    />
                </div>
                <div>
                    <label>Temperaments</label>
                    <select onChange={e => handleSelect(e)}>
                        <option value="" disabled selected >select your option</option>
                        {
                            temperaments?.map(t =>
                                temperaments.indexOf(t.name) >= 0
                                ? (<option key={t.name} disabled value={t.name}>{t.name}</option>)
                                : (<option key={t.name} value={t.name}>{t.name}</option>)
                                )
                        }
                    </select>
                </div>
                <button type='submit'>Create</button>
            </form>
            <div>
                    <ul>
                        {
                            [...new Set(state.temperament)].map(t =>
                            <div>
                                <li>{t}</li>
                                <button onClick={e => handleDelete(e)} name={t}>X</button>
                            </div>
                            )
                        }
                    </ul>
                </div>
            <label>*required</label>
        </div>
    );

};