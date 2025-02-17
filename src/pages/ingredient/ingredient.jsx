import styles from './ingredient.module.scss';
import PropTypes from 'prop-types';


function IngredientPage({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

IngredientPage.propTypes = {
    children: PropTypes.node
}

export default IngredientPage;