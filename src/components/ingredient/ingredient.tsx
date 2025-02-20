import React, { useEffect, useRef } from "react"
import styles from "./ingredient.module.scss"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

type TIngredientProps = {
  id: number,
  counter: number,
  dataId: string,
  name: string,
  image: string,
  price: number,
  showModal: (dataId: string) => void
}

const Ingredient = ({ id, counter, dataId, name, image, price, showModal }: TIngredientProps): React.JSX.Element => {

  const [{}, dragRef] = useDrag({
      type: "ingredient",
      item: {dataId},
      collect: monitor => ({
          isDrag: monitor.isDragging()
      })
  });


  const dragTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dragTargetRef.current) {
      dragRef(dragTargetRef.current);
    }
  }, [dragRef])

  return (
    <div 
      className={styles.ingredient} 
      style={(id === 1 || id === 2) ? {marginTop: "24px"} : {}}
      onClick={() => showModal(dataId)}
      ref={dragTargetRef}
    >
      {counter > 0 ? <Counter count={counter} size="default" extraClass={styles.counter} /> : null}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.priceData}>
        <p className={styles.text}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={styles.subheader}>{name}</h2>
    </div>
  )
}

export default Ingredient;