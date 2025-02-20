import styles from "./constructor-item.module.scss"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { sortIngredients, removeIngredient } from "../../services/burger-slice"
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react'

type TConstructorItemProps = {
  index: number,
  text: string,
  price: number,
  thumbnail: string,
  length: number,
  handleClose: (index: number) => void
}

type XYCoord = {
  x: number,
  y: number
}

type DropResult = {
  data: "top" | "bottom" | XYCoord,
  dropEffect: "move"
}

type DragItem = {
  index: number;
  type?: string;
};

function ConstructorItem({ index, text, price, thumbnail, length, handleClose }: TConstructorItemProps) {

    const conditionalPadding = 16
    const dispatch = useDispatch()

    const [ { source}, dragRef ] = useDrag<DragItem, DropResult, { source: XYCoord }>({
          type: "inside",
          item: {index},
          collect: monitor => ({
              isDrag: monitor.isDragging(),
              source: monitor.getInitialSourceClientOffset() as XYCoord
          }),
          end: (item: DragItem, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;

            if (dropResult && typeof dropResult.data === "string") {
              handleOverBun(dropResult.data, index)
            } else if (dropResult) {
              const target = dropResult.data as XYCoord;
              const position = handleDrop(source, target, index)
              dispatch(sortIngredients({ position, index }))
            }
        }
    });

    function handleOverBun(type: "top" | "bottom", index: number) {
      const position = type === "top" ? 0 : length ;
      dispatch(sortIngredients({ position, index }))
    }


    function handleDrop(source: XYCoord, target: XYCoord, index: number) {
      const element = document.querySelector(".constructor-list-item:nth-child(" + (index + 1) + ")") as HTMLElement;
      const elementHeight = element.offsetHeight + conditionalPadding;
      const result = { x: Math.round(target.x - source.x), y: Math.round(target.y - source.y) }
      const offsetY = result.y;
      const listHeight = (index + 1) * elementHeight;
      const newPosition = Math.trunc((listHeight + offsetY) / elementHeight)
      return newPosition;
    }

    const [ {offsetData}, dropTarget ] = useDrop<DragItem, DropResult, { offsetData: XYCoord }>({
        accept: "inside",
        collect: monitor => ({ offsetData: { x: 0, y: 0 } }),
        hover: (item, monitor: DropTargetMonitor) => {
          const currentOffset = monitor.getSourceClientOffset()
          if (currentOffset) {
            offsetData.x = currentOffset.x
            offsetData.y = currentOffset.y
          }
        },
        drop: (item: DragItem): DropResult => ({ data: offsetData, dropEffect: "move" })
    })

    const dragTargetRef = useRef<HTMLDivElement>(null);
    const dropTargetRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
      if (dragTargetRef.current) {
        dragRef(dragTargetRef.current);
      }
      if (dropTargetRef.current) {
        dropTarget(dropTargetRef.current)
      }
    }, [dragRef, dropTarget])

    const isFinal = index === length - 1;
    return (
      <li className={styles.container + " constructor-list-item"} style={ !isFinal ? {paddingBottom: `${conditionalPadding}px`} : {}} ref={dropTargetRef}>
        <div className={styles.content} ref={dragTargetRef}>
          <div className={styles.icon}>
            <DragIcon type="primary" />
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


export default ConstructorItem;