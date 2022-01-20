require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const mapped = await api.data.map(r => {
        return {
            temperament: r.temperament
        };
    });

    const temp = mapped.map(t => {
        return t.temperament
    });
    const temperaments = temp.join(', ').split(', ');

    const unique = [...new Set(temperaments)];
    const ordered = [...unique].sort();

    ordered.forEach(t => {
        if(t){
        Temperament.findOrCreate({
            where: { name: t }
        });
        }
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
});

