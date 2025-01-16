import styles from "./modal.module.scss"
import { useEffect } from "react"
import ReactDom from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

const modalRoot = document.getElementById("modals")


function Modal({ closeModal, children }) {

    function handleCloseButton(e) {
        e.preventDefault()
        e.stopPropagation()
        closeModal()
    }

    useEffect(() => {
        function closeByEscape(e) {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        document.addEventListener("keydown", closeByEscape)
        return function() {
            document.removeEventListener("keydown", closeByEscape)
        }
    }, [])

    return ReactDom.createPortal(
        (
            <ModalOverlay closeModal={closeModal}>
                <section className={styles.modal}>
                    <button className={styles.close} onClick={handleCloseButton}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </section>
            </ModalOverlay>
        ),
        modalRoot
    )
}

function ModalOverlay({closeModal, children}) {

    function closeModalWindow(e) {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <div className={styles.overlay} onClick={closeModalWindow}>
            {children}
        </div>
    )
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;