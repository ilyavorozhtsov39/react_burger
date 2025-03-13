import React, { useEffect, useState } from 'react';
import styles from './ingredient-details.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../app/app"
import type { IIngredient, IIngredientWithUUID } from '../../utils/types'
import { ingredientTemplate } from '../../utils/constants'


type TIngredient = IIngredient | IIngredientWithUUID

type State = {
    ingredients: {
        ingredientsList: Array<TIngredient>
    }
}

type TInfoBlock = {
    text: string,
    number: number
}

const IngredientDetails = (): React.JSX.Element => {

    const [ ingredient, setIngredient ] = useState<TIngredient>(ingredientTemplate)

    const { ingredientsList } = useAppSelector((state: State) => state.ingredients)
    const params = useParams()

    useEffect(() => {
        function handleState() {
            const ingredient = ingredientsList.find(item => item._id === params.id)
            ingredient && setIngredient(ingredient)
        }
        handleState()
    }, [ingredientsList])

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

const InfoBlock = ({ text, number }: TInfoBlock): React.JSX.Element => {
    return (
        <div className={styles.block}>
            <p className={styles.text}>{text}</p>
            <p className={styles.digits}>{number}</p>
        </div>
    )
}

export default IngredientDetails;

    // function sortIngredients(originalArray: Array<IIngredientWithUUID>): Array<ICountedIngredient> {
    //     const grouped = originalArray.reduce((acc: { [key: string]: number }, obj: IIngredientWithUUID) => {
    //       acc[obj._id] = (acc[obj._id] || 0) + 1;
    //       return acc;
    //     }, {});
      
    //     return Object.keys(grouped).map(_id => {
    //       const originalElement = originalArray.find(obj => obj._id === _id);
    //       if (originalElement) {
    //         return { ...originalElement, count: grouped[_id] };
    //       }
    //       return null;
    //     }).filter((element): element is ICountedIngredient => element !== null);
    //   }