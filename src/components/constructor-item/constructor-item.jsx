
import PropTypes from "prop-types"
import styles from "./constructor-item.module.scss"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from "react-dnd";
import { sortIngredients } from "../../services/burger.js"
import { useDispatch } from 'react-redux';

function ConstructorItem({ index, dataId, text, price, thumbnail, length, handleClose }) {

    const dispatch = useDispatch()

    const [ , dragRef ] = useDrag({
          type: "inside",
          item: {index},
          collect: monitor => ({
              isDrag: monitor.isDragging()
          }),
          end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                const { position, dropIndex } =  dropResult;
                dispatch(sortIngredients({ position, dropIndex, index }))
            }
        }
    });

    const isFinal = index === length - 1
    return (
      <li className={styles.container} style={ !isFinal ? {paddingBottom: "16px"} : {}} ref={dragRef}>
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
        <div className={styles.background}>
          <BackgroundTop index={index} />
          <BackgroundBottom index={index} />
        </div>
      </li>
    )
}

function BackgroundTop({ index }) {
    const [ , dropTarget ] = useDrop({
        accept: "inside",
        drop: item => ({ position: "top", dropIndex: index })
    })
    return (
        <div className={styles.backgroundTop} ref={dropTarget} />
    )
}

function BackgroundBottom({ index }) {
    const [ , dropTarget ] = useDrop({
        accept: "inside",
        drop: item => ({ position: "bottom", dropIndex: index })
    })
    return (
        <div className={styles.backgroundBottom} ref={dropTarget} />
    )
}

ConstructorItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default ConstructorItem;