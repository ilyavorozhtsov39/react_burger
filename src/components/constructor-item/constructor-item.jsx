import PropTypes from "prop-types"
import styles from "./constructor-item.module.scss"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from "react-dnd";
import { sortIngredients, removeIngredient } from "../../services/burger.js"
import { useDispatch } from 'react-redux';
import { useState } from "react"

function ConstructorItem({ index, dataId, text, price, thumbnail, length, handleClose }) {

    const dispatch = useDispatch()

    const [ {isDrag, source}, dragRef ] = useDrag({
          type: "inside",
          item: {index},
          collect: monitor => ({
              isDrag: monitor.isDragging(),
              source: monitor.getInitialSourceClientOffset()
          }),
          end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            
            if (dropResult) {
                const position = handleDrop(source, dropResult.offsetData, index)
                dispatch(sortIngredients({ position, index }))
            } else {
              dispatch(removeIngredient(index))
            }
        }
    });


    function handleDrop(source, target, index) {
      const result = { x: Math.round(target.x - source.x), y: Math.round(target.y - source.y) }
      const offsetY = result.y;
      const listHeight = (index + 1) * 96;
      const newPosition = Math.trunc((listHeight + offsetY) / 96)
      return newPosition;
    }

    const [ {offsetData}, dropTarget ] = useDrop({
        accept: "inside",
        collect: monitor => ({ offsetData: { x: 0, y: 0 } }),
        hover: (item, monitor) => {
          const currentOffset = monitor.getSourceClientOffset()
          offsetData.x = currentOffset.x
          offsetData.y = currentOffset.y
        },
        drop: item => ({ offsetData })
    })

    const isFinal = index === length - 1
    return (
      <li className={styles.container} style={ !isFinal ? {paddingBottom: "16px"} : {}} ref={dropTarget}>
        <div className={styles.content} ref={dragRef}>
          <div className={styles.icon}>
            <DragIcon />
          </div>
          <ConstructorElement
            text={text}
            price={price}
            thumbnail={thumbnail}
            key={index}
            handleClose={() => handleClose(index)}
            extraClass="constructorElement"
          />
        </div>
      </li>
    )
}


ConstructorItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default ConstructorItem;