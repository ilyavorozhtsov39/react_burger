import styles from './ingredient.module.scss';
import React, { ReactNode } from 'react'

type TIngredientPageProps = {
    children: ReactNode
}

const IngredientPage = ({ children }: TIngredientPageProps): React.JSX.Element => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default IngredientPage;