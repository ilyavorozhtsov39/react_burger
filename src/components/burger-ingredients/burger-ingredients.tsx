import React, { useState, useEffect, useRef, useMemo } from "react"
import styles from "./burger-ingredients.module.scss"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details"
import { useSelector } from "react-redux";
import type { IIngredientWithUUID } from '../../utils/types';

type TBurgerIngredientsProps = {
  data: Array<IIngredientWithUUID> | [],
  showModal: () => void,
  closeModal: () => void
}

type TIngredientState = {
  ingredient: {
    ingredientInfo: IIngredientWithUUID | {},
    infoStored: boolean
  }
}

type TBurgerState = {
  burger: {
    burgerList: Array<IIngredientWithUUID> | [],
    bun: IIngredientWithUUID | {}
  }
}

type Sorted = {
  buns: TDataCopy | [],
  sauce: TDataCopy | [],
  main: TDataCopy | []
}

type TDataCopy = Array<IIngredientWithUUID & {counter: number}>

const BurgerIngredients = ({ data, showModal, closeModal }: TBurgerIngredientsProps): React.JSX.Element => {

  const [modalVisible, setModalVisible] = useState(false)
  const [dataCopy, setDataCopy] = useState<TDataCopy>([])
  const [activeSection, setActiveSection] = useState(0)

  const { ingredientInfo, infoStored } = useSelector((state: TIngredientState) => state.ingredient)
  const { burgerList, bun } = useSelector((state: TBurgerState) => state.burger)

  const containerRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    const container = containerRef.current as HTMLDivElement;
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
    const container = containerRef.current as HTMLDivElement;;
    container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const allIngredients = [ ...burgerList, bun ] as Array<IIngredientWithUUID>

    const modded = dataCopy.map(item => {
      let copy = { ...item, counter: 0 }
      allIngredients.forEach(added => {
        if (added._id === copy._id) {
          copy.counter += 1
        }
      })
      return copy;
    })
    setDataCopy(modded)
  }, [burgerList, bun])


  useEffect(() => {
    if (data.length > 0) {
      const copy = data.map(item => {
        return {
          ...item,
          counter: 0
        }
      })
      setDataCopy(copy)

    }
  }, [data])

  function saveIngredients() {
    const sorted: Sorted = { buns: [], sauce: [], main: [] }
    sorted.buns = dataCopy.filter(item => item.type === "bun")
    sorted.sauce = dataCopy.filter(item => item.type === "sauce")
    sorted.main = dataCopy.filter(item => item.type === "main")
    return sorted;
  }

  let ingredients: Sorted = {buns: [], sauce: [], main: []}
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
        <Tab value="buns" active={activeSection === 0} onClick={() => {}}>Булки</Tab>
        <Tab value="sauce" active={activeSection === 1} onClick={() => {}}>Соусы</Tab>
        <Tab value="main" active={activeSection === 2} onClick={() => {}}>Начинки</Tab>
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

type Section = {
  section: TDataCopy | [],
  title: string,
  showModal: () => void
}

function Section({ section, title, showModal }: Section): React.JSX.Element {
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
            key={item.uniqueId}
        />)}
      </div>
    </section>
  )
}

export default BurgerIngredients;
