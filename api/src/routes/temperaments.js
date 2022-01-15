require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) =>{
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const mapped = await url?.data.map(t => {
        if(t.temperament) return t.temperament.split(', ').map(t => {
        if(t[0] == " ") {
            return t.slice(1, -1);
        } else {
            return t;
        };
    })});
    const temperament = mapped.map(t => {
        for(let i = 0; i < t?.length; i++) return t[i];
    });
    const unique = [...new Set(temperament)];
    unique.forEach(t => {
        if(t){
        Temperament.findOrCreate({
            where: { name: t }
        });
        }
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
})