import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { DndProvider } from "react-dnd";
import { getIngredients } from "../../services/ingredients-slice.js"
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import IngredientDetails from '../../components/ingredient-details/ingredient-details.jsx';
import styles from './main.module.scss'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Modal from '../../components/modal/modal.jsx';

function Main({ ingredientsList }) {

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    function showModal(dataId) {
        // const item = data.find(el => el._id === dataId)
        // dispatch(addIngredientInfo(item))
        setModalVisible(true)
        navigate(`/ingredients/${dataId}`, { state: { background: location }}) 
        console.log("show")
      }
    
      function closeModal() {
        setModalVisible(false)
        navigate(-1)
        console.log("hide")
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