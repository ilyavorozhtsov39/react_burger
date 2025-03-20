import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main.module.scss'
import { useNavigate, useLocation } from "react-router-dom";
import { IIngredientWithUUID } from '../../utils/types'
import React from 'react'

type TIngredientList = {
    ingredientsList: Array<IIngredientWithUUID> | []
}

const Main = ({ ingredientsList }: TIngredientList): React.JSX.Element => {

    const navigate = useNavigate()
    const location = useLocation()

    function showModal(dataId: string) {
        navigate(`/ingredients/${dataId}`, { state: { background: location }}) 
    }
    
    function closeModal() {
        navigate(-1)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <BurgerIngredients data={ingredientsList} showModal={showModal} closeModal={closeModal} />
                <BurgerConstructor data={ingredientsList} />
            </main>
        </DndProvider>
    )
}

export default Main;