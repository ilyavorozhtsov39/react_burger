import PropTypes from "prop-types"
import styles from "./constructor-item.module.scss"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from "react-dnd";
import { sortIngredients, removeIngredient } from "../../services/burger-slice.js"
import { useDispatch } from 'react-redux';

function ConstructorItem({ index, text, price, thumbnail, length, handleClose }) {

    const conditionalPadding = 16
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

            if (dropResult && typeof dropResult.data === "string") {
              handleOverBun(dropResult.data, index)
            } else if (dropResult) {
              const position = handleDrop(source, dropResult.data, index)
              dispatch(sortIngredients({ position, index }))
            }
        }
    });

    function handleOverBun(type, index) {
      const position = type === "top" ? 0 : length ;
      dispatch(sortIngredients({ position, index }))
    }


    function handleDrop(source, target, index) {
      const element = document.querySelector(".constructor-list-item:nth-child(" + (index + 1) + ")");
      const elementHeight = element.offsetHeight + conditionalPadding;
      const result = { x: Math.round(target.x - source.x), y: Math.round(target.y - source.y) }
      const offsetY = result.y;
      const listHeight = (index + 1) * elementHeight;
      const newPosition = Math.trunc((listHeight + offsetY) / elementHeight)
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
        drop: item => ({ data: offsetData, index })
    })

    const isFinal = index === length - 1;
    return (
      <li className={styles.container + " constructor-list-item"} style={ !isFinal ? {paddingBottom: `${conditionalPadding}px`} : {}} ref={dropTarget}>
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
    thumbnail: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default ConstructorItem;