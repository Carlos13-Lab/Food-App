import React from "react";
import styles from './Card.module.css'
export default function Card({ title, img, typeDiets, id, spoonacularScore  }) {
   
return (
    <div key={id} className={styles.card}>  
     <div className={styles.spoonacularScore} >{spoonacularScore}</div>
                <div  className={styles.cd}>
        <h3 className={styles.title} >{title}</h3>
        <img  className={styles.cardimg} src = { img
             ? img 
             :'https://image.freepik.com/foto-gratis/tabla-picar-rodeada-verduras-huevos-granos-arroz-escritorio_23-2148062361.jpg' } alt ='img not found' width='200px'  height='250px'/>
            
            <div className={styles.tipes}>
                {typeDiets?.map((t) => {
                    return (
                        <h5 key={t.name}> 
                            {t.name}   
                        </h5>
                
                    );
                })}
            </div>
     
        </div>
    </div>
)
}