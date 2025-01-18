import React, { useState, useEffect, useRef, useMemo } from "react"
import styles from "./burger-ingredients.module.scss"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx"
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types.js"
import { addIngredientInfo, removeIngredientInfo } from "../../services/ingredient-info-slice.js"
import { useSelector, useDispatch } from "react-redux";


function BurgerIngredients({ data }) {

  const [modalVisible, setModalVisible] = useState(false)
  const [dataCopy, setDataCopy] = useState(data)
  const [activeSection, setActiveSection] = useState(0)

  const { ingredientInfo, infoStored } = useSelector(state => state.ingredient)
  const { burgerList, bun } = useSelector(state => state.burger)
  const dispatch = useDispatch()

  function showModal(dataId) {
    const item = data.find(el => el._id === dataId)
    dispatch(addIngredientInfo(item))
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  const containerRef = useRef()

  function handleScroll() {
    const container = containerRef.current;
    const sections = container.querySelectorAll('.section');
    let index = 0;

    sections.forEach((section, i) => {
        const { top } = section.getBoundingClientRect();
        if (top <= 300) {
            index = i;
        }
    });
    setActiveSection(index);
  }

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const allIngredients = [ ...burgerList, bun ]

    const modded = dataCopy.map(item => {
      item.counter = 0;
      allIngredients.forEach(added => {
        if (added._id === item._id) {
          item.counter += 1
        }
      })
      return item;
    })
    setDataCopy(modded)
  }, [burgerList, bun])

  useEffect(() => {
    const copy = data.map(item => {
      return {
        ...item,
        counter: 0
      }
    })
    setDataCopy(copy)
  }, [data])

  function saveIngredients() {
    const sorted = {}
    sorted.buns = dataCopy.filter(item => item.type === "bun")
    sorted.sauce = dataCopy.filter(item => item.type === "sauce")
    sorted.main = dataCopy.filter(item => item.type === "main")
    return sorted;
  }

  let ingredients = {buns: [], sauce: [], main: []}
  ingredients = useMemo(saveIngredients, [dataCopy])

  return (
    <div className={styles.ingredients}>
      {modalVisible && 
      <Modal closeModal={closeModal}>
        {infoStored && <IngredientDetails {...ingredientInfo} />}
      </Modal>
      }
      <h1 className={styles.header}>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={activeSection === 0}>Булки</Tab>
        <Tab value="sauce" active={activeSection === 1}>Соусы</Tab>
        <Tab value="main" active={activeSection === 2}>Начинки</Tab>
      </div>
      <div className={styles.content} ref={containerRef}>
        <Section
          section={ingredients.buns}
          title="Булки"
          showModal={showModal}
        />
        <Section
          section={ingredients.sauce}
          title="Соусы"
          showModal={showModal}
        />
        <Section
          section={ingredients.main}
          title="Начинки"
          showModal={showModal}
        />
      </div>
    </div>
  )
}

function Section({ section, title, showModal }) {
  return ( 
    <section className="section">
      <h2 className={styles.subheader}>{title}</h2>
      <div className={styles.items}>
        {section.length > 0 && section.map((item, index) => 
          <Ingredient 
            id={index + 1}
            counter={item.counter}
            dataId={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            showModal={showModal}
            key={item._id}
        />)}
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientType)
}

export default BurgerIngredients;
