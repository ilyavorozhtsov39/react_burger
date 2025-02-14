import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { DndProvider } from "react-dnd";
import { getIngredients } from "../../services/ingredients-slice.js"
import { getUser } from "../../services/user-slice.js"
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import styles from './main.module.scss'

function Main() {

    const { ingredientsList } = useSelector(state => state.ingredients)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(getUser())
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
            <BurgerIngredients data={ingredientsList} />
            <BurgerConstructor data={ingredientsList} />
            </main>
        </DndProvider>
    )
}

export default Main;