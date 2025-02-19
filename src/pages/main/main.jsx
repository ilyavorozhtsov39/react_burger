import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main.module.scss'
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// import { IngredientType } from "../../utils/types.js"

function Main({ ingredientsList }) {

    const navigate = useNavigate()
    const location = useLocation()

    function showModal(dataId) {
        navigate(`/ingredients/${dataId}`, { state: { background: location }}) 
    }
    
    function closeModal() {
        navigate(-1)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <BurgerIngredients data={ingredientsList} showModal={showModal} closeModal={closeModal} />
                <BurgerConstructor data={ingredientsList} />
            </main>
        </DndProvider>
    )
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(IngredientType)
// }

export default Main;