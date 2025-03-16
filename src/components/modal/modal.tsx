import styles from "./modal.module.scss"
import { useEffect } from "react"
import ReactDom from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { ReactNode } from "react"

type TModalProps = {
    closeModal: () => void,
    children: ReactNode
}

const modalRoot = document.getElementById("modals") as HTMLElement

const Modal = ({ closeModal, children }: TModalProps): React.JSX.Element => {

    function handleCloseButton(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        closeModal()
    }

    useEffect(() => {
        function closeByEscape(e: KeyboardEvent) {
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

const ModalOverlay = ({closeModal, children}: TModalProps): React.JSX.Element => {

    function closeModalWindow(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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