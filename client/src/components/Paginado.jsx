/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from './Paginado.module.css'

export default function Paginado ({recipesPerPage ,  allRecipes , paginado}) {
const pageNumbers = []
    for (let i = 0 ; i < Math.ceil(allRecipes/recipesPerPage) ; i++){
    pageNumbers.push(i+1)
}
return (
          
    <nav className={styles.num}  >
        <ul className={styles.ul}>
            {
                pageNumbers && pageNumbers.map(n => (
                    <li className={styles.paginado}   key={n}  >
                        <a className={styles.container}   onClick= {() => paginado(n)} >{n}</a>
                    </li>
                ))
            }
        </ul>
    </nav>
            
)
}