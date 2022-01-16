require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const router = express.Router();
module.exports = router;

const infoApi = async () => {
    let api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const apiInfo = await api.data.map(response => {
        return {
                    id: response.id,
                    name: response.name,
                    weight_min: parseInt(response.weight.metric.slice(0, 2).trim()),
                    weight_max: parseInt(response.weight.metric.slice(4).trim()),
                    height_min: parseInt(response.height.metric.slice(0, 2).trim()),
                    height_max: parseInt(response.height.metric.slice(4).trim()),
                    life_span: response.life_span,
                    image: response.image.url,
                    temperament: response.temperament
        }
    });
    return apiInfo;
};

const dataBaseInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
};

const allDogs = async () => {
    const apiInfo = await infoApi();
    const dbInfo = await dataBaseInfo();
    const info = [...apiInfo, ...dbInfo];
    return info;
};

router.get('/', (req, res) => {
    const { name } = req.query;
    allDogs()
    .then(dogs => {
        if(name) {
            let dog = dogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dog.length
            ? res.status(200).send(dog)
            : res.status(404).send('La raza buscada no fue encontrada');
        } else {
            res.status(200).send(dogs);
        };
    });
});

router.get('/:id', (req,res) => {
    const { id } = req.params;
    allDogs()
    .then(dogs => {
        if(id) {
            let raza = dogs.filter(d => d.id == id);
            raza.length
            ? res.status(200).json(raza)
            : res.status(404).send('raza no existente');
        };
    });
});

router.post('/', async (req, res) => {
    const {
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_span,
        image,
        createdInDB,
        temperament,
    } = req.body;
    let newDog = await Dog.create({
        name,
        life_span,
        image,
        weight_min,
        weight_max,
        height_min,
        height_max,
        createdInDB
    });
    const unique = [...new Set(temperament)];
    unique.map(async t => {
        const tDB = await Temperament.findAll({
            where: { name: t },
            include: [ Dog ],
        },);
        newDog.addTemperament(tDB);
    })
    res.send('dog created successfully');
});

router.delete('/', async(req, res) => {
    try {
        const { id } = req.body;
        await Dog.destroy({
            where: {
                id,
            }
        });
        res.status(200).send('breed eliminated');
    } catch(error) {
        console.log(error);
        res.status(400).send('can not find breed');
    }
})