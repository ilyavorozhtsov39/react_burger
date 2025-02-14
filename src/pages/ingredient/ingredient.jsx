import styles from './ingredient.module.scss';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const testData = {
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    name: "Краторная булка N-200i",
    fat: 5,
    calories: 645,
    carbohydrates: 85,
    proteins: 10
}


function Ingredient() {
    return (
        <div className={styles.wrapper}>
            <IngredientDetails {...testData} />
        </div>
    )
}

export default Ingredient;