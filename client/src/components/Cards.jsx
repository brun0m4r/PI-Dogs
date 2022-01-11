import React from "react";
import CardDog from './CardDog';
import s from './Cards.module.css';

export default function Cards({ dogs }) {
    return(
        <div className={s.container}>
            {
                dogs.map(d => {
                    console.log(d);
                    return(
                        <CardDog
                            key={d.id}
                            image={d.image}
                            id={d.id}
                            name={d.name}
                            weight_max={d.weight_max}
                            weight_min={d.weight_min}
                            height_max={d.height_max}
                            height_min={d.height_min}
                            temperament={d.temperament || d.temperaments}
                        />
                    )
                })
            }
        </div>
    );
}