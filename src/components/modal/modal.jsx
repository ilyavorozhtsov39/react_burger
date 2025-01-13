import styles from "./modal.module.scss"
import { useEffect } from "react"
import ReactDom from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const modalRoot = document.getElementById("modals")


function Modal({ closeModal, children }) {

    function handleCloseButton(e) {
        e.preventDefault()
        e.stopPropagation()
        closeModal()
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeModal()
          }
        })
        return () => {
          document.removeEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeModal()
            }
          })
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

export default Modal;