import React, { useEffect, useState } from 'react';
import styles from './ingredient-details.module.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';

// { image, name, fat, calories, carbohydrates, proteins }
function IngredientDetails() {

    const [ ingredient, setIngredient ] = useState({})

    const { ingredientsList } = useSelector(state => state.ingredients)
    const params = useParams()

    useEffect(() => {
        function handleState() {
            const ingredient = ingredientsList.find(item => item._id === params.id)
            setIngredient(ingredient)
        }
        handleState()
    }, [ingredientsList])

    if (ingredient) {
        return (
            <div className={styles.ingredient}>
                <h2 className={styles.header}>Детали ингредиента</h2>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
                <h3 className={styles.subheader}>{ingredient.name}</h3>
                <div className={styles.consist}>
                    <InfoBlock text="Калории,ккал" number={ingredient.calories} />
                    <InfoBlock text="Белки, г" number={ingredient.proteins} />
                    <InfoBlock text="Жиры, г" number={ingredient.fat} />
                    <InfoBlock text="Углеводы, г" number={ingredient.carbohydrates} />
                </div>
            </div>
        )
    }
}

function InfoBlock({ text, number }) {
    return (
        <div className={styles.block}>
            <p className={styles.text}>{text}</p>
            <p className={styles.digits}>{number}</p>
        </div>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
}

InfoBlock.propTypes = {
    text: PropTypes.string,
    number: PropTypes.number,
}

export default IngredientDetails;