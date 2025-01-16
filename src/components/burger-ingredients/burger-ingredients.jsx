import React, { useState, useEffect } from "react"
import styles from "./burger-ingredients.module.scss"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx"
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types.js"
import { addIngredientInfo, removeIngredientInfo } from "../../services/ingredient-info.js"
import { useSelector, useDispatch } from "react-redux";


function BurgerIngredients({ data }) {

  const [current, setCurrent] = useState("buns");
  const [ingredients, setIngredients] = useState({buns: [], sauce: [], main: []})
  const [modalVisible, setModalVisible] = useState(false)
  const [clicked, setClicked] = useState(null)

  const { ingredientInfo, infoStored } = useSelector(state => state.ingredient)
  const dispatch = useDispatch()

  function showModal(dataId) {
    const item = data.find(el => el._id === dataId)
    // setClicked(item)
    dispatch(addIngredientInfo(item))
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
    setClicked(null)
  }

  useEffect(() => {
    function saveIngredients() {
      const sorted = {}
      sorted.buns = data.filter(item => item.type === "bun")
      sorted.sauce = data.filter(item => item.type === "sauce")
      sorted.main = data.filter(item => item.type === "main")
      setIngredients(sorted)
    }
    data.length > 0 && saveIngredients()
  }, [data])

  return (
    <div className={styles.ingredients}>
      {modalVisible && 
      <Modal closeModal={closeModal}>
        {infoStored && <IngredientDetails {...ingredientInfo} />}
      </Modal>
      }
      <h1 className={styles.header}>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={styles.content}>
          <h2 className={styles.subheader}>Булки</h2>
          <div className={styles.items}>
            {ingredients.buns.length > 0 && ingredients.buns.map((item, index) => 
              <Ingredient 
                id={index + 1}
                dataId={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                showModal={showModal}
                key={item._id}
            />)}
          </div>
          <h2 className={styles.subheader}>Соусы</h2>
          <div className={styles.items}>
            {ingredients.sauce.length > 0 && ingredients.sauce.map((item, index) => 
              <Ingredient 
                id={index + 1}
                dataId={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                showModal={showModal}
                key={item._id}
            />)}
          </div>
          <h2 className={styles.subheader}>Начинки</h2>
          <div className={styles.items}>
            {ingredients.main.length > 0 && ingredients.main.map((item, index) => 
              <Ingredient 
                id={index + 1}
                dataId={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                showModal={showModal}
                key={item._id}
            />)}
          </div>
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = IngredientType
export default BurgerIngredients;