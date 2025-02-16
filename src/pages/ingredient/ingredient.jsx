import styles from './ingredient.module.scss';


function IngredientPage({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default IngredientPage;