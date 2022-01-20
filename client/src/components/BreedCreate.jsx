import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBreed, getDogs, getTemperaments, postNewbreed } from "../actions";
import { Link, useHistory } from 'react-router-dom';
import s from './BreedCreate.module.css'
import Cards from "./Cards";


export default function BreedCreate() {
    const [ loading, setLoading ] = useState(false);
    const [ disabled, setDisabled ] = useState(true);

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
    let createdDogs = useSelector(state => state.allDogs.filter(d => d.createdInDB));
    const unique = [...new Set(temperaments)];

    const newLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

    const validate = () => {
        if(state.weight_max > state.weight_min) {
            setDisabled(false);
        }
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
        newLoading();
    },[]);

    useEffect(() => {
        validate()
    },[state.weight_max, state.weight_min]);

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
        newLoading();
        dispatch(getDogs());
    };


    return(
        <div>
            <h2 className={s.title}>Create a new breed</h2>
            <div className={s.container}>
                <button className={s.button}>
                    <Link className={s.link} to='/home'>Home</Link>
                </button>
                <form className={s.form} onSubmit={e => handleSubmit(e)}>
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
                            max="150"
                            onChange={e => handleChange(e)}
                            required={true}
                            className={s.input}
                        />
                        <label>*Weight Max</label>
                        <input
                            type='number'
                            value={state.weight_max}
                            name="weight_max"
                            min="0"
                            max="150"
                            onChange={e => handleChange(e)}
                            required={true}
                            className={s.input}
                        />
                        <label>*Height Min</label>
                        <input
                            type='number'
                            value={state.height_min}
                            name="height_min"
                            min="1"
                            max="250"
                            onChange={e => handleChange(e)}
                            required={true}
                            className={s.input}
                        />
                        <label>*Height Max</label>
                        <input
                            type='number'
                            value={state.height_max}
                            name="height_max"
                            min="1"
                            max="250"
                            onChange={e => handleChange(e)}
                            required={true}
                            className={s.input}
                        />
                    </div>
                    <div className={s.contOther}>
                            <label>Life Span</label>
                            <input
                                type='text'
                                value={state.life_span}
                                name="life_span"
                                onChange={e => handleChange(e)}
                                className={s.input}
                            />
                            <label>Temperaments</label>
                            <select className={s.input} onChange={e => handleSelect(e)}>
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
                    <button className={s.button} disabled={disabled} type='submit'>Create</button>
                </form>
                <div>
                        <div className={s.contTemperament}>
                            {
                                [...new Set(state.temperament)].map(t =>
                                <div>
                                    <button key={t} className={s.remove} onClick={e => handleDelete(e)} name={t}>{t}</button>
                                </div>
                                )
                            }
                        </div>
                    </div>
                <label className={s.required}>*required</label>
            </div>
            <div>
                {
                    loading
                    ? <img className={s.loading} src="https://64.media.tumblr.com/0e0d397cf35e73323650fedebc4797df/tumblr_nacvecAASJ1tgzy56o1_250.gifv" />
                    : (createdDogs.length ? <Cards newLoading={newLoading} dogs={createdDogs} remove={true}  /> : <div className={s.noDogs}><p>no dog breeds created</p></div>)
                }
            </div>

        </div>
    );

};