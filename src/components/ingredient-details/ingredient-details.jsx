import React from 'react';
import styles from './ingredient-details.module.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/ingredients-slice';
import {  useSelector } from 'react-redux';

// { image, name, fat, calories, carbohydrates, proteins }
function IngredientDetails() {

    const { ingredients } = useSelector(state => state.ingredients)
    console.log(ingredients)
    const params = useParams()
    console.log(params)
    return (
        <div className={styles.ingredient}>
            <h2 className={styles.header}>Детали ингредиента</h2>
            {/* <img className={styles.image} src={image} alt={name} />
            <h3 className={styles.subheader}>{name}</h3>
            <div className={styles.consist}>
                <InfoBlock text="Калории,ккал" number={calories} />
                <InfoBlock text="Белки, г" number={proteins} />
                <InfoBlock text="Жиры, г" number={fat} />
                <InfoBlock text="Углеводы, г" number={carbohydrates} />
            </div> */}
        </div>
    )
}

function InfoBlock({ text, number }) {
    return (
        <div className={styles.block}>
            <p className={styles.text}>{text}</p>
            <p className={styles.digits}>{number}</p>
        </div>
    )
}

// IngredientDetails.propTypes = {
//     image: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     fat: PropTypes.number.isRequired,
//     calories: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
// }

// InfoBlock.propTypes = {
//     text: PropTypes.string.isRequired,
//     number: PropTypes.number.isRequired,
// }

export default IngredientDetails;