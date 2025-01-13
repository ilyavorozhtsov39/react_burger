import React from 'react';
import styles from './ingredient-details.module.scss';

function IngredientDetails({ image, name, fat, calories, carbohydrates, proteins }) {
    return (
        <div className={styles.ingredient}>
            <h2 className={styles.header}>Детали ингредиента</h2>
            <img className={styles.image} src={image} alt="" />
            <h3 className={styles.subheader}>{name}</h3>
            <div className={styles.consist}>
                <InfoBlock text="Калории,ккал" number={calories} />
                <InfoBlock text="Белки, г" number={proteins} />
                <InfoBlock text="Жиры, г" number={fat} />
                <InfoBlock text="Углеводы, г" number={carbohydrates} />
            </div>
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

export default IngredientDetails;