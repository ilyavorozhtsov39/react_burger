import React from "react"
import styles from "./order-details.module.scss"
import PropTypes from "prop-types";
import orderDoneImage from "../../images/order-done.png"

function OrderDetails({ orderId }) {
    return (
        <div className={styles.container}>
            <p className={styles.orderId}>{orderId}</p>
            <p className={styles.idText}>идентификатор заказа</p>
            <img className={styles.image} src={orderDoneImage} alt="Иконка завершения заказа" />
            <p className={styles.textCooking}>Ваш заказ начали готовить</p>
            <p className={styles.textWait}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired
}

export default OrderDetails;