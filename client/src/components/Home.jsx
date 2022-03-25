import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes , filterRecipesByTypeDiet , orderByName , orderByPuntuation,getRecipesByName} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'


export default function Home () {
const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes )  // es lo mismo que hacer  mapStateToProps
// console.log(allRecipes);
// PAGINADO SOLO PARA HOME 
                                                      
const[search,setSearch] = useState('')                  // este es para el searchBar                                    
const[orden,setOrden] =useState('')                                             // |             
const[order,setOrder] =useState('')                                             //_             
const[currentPage,setCurrentPage] = useState(1)                                  // |             
const[recipesPerPage]=useState(9)                             // |
const indexLastRecipe = currentPage * recipesPerPage                            // | --> esto es para el paginado
const indexFirstRecipe = indexLastRecipe - recipesPerPage                       // |
const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)       // |
                                                                              

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getRecipes())   // hook del matchDispatchToProps()
},[dispatch]);

function handleOnClick(e){
e.preventDefault();
dispatch(getRecipes())   // con este handle, hago que me traiga devuelta todas las recetas,sin ningun filtro
}

function handleFilterTypeDiet (e) {
    dispatch(filterRecipesByTypeDiet(e.target.value))
}
function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`)

}
function handlePuntuation (e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value))
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`)
}

function handleSubmit (e){
        e.preventDefault(e)
        dispatch(getRecipesByName(search))
         setSearch('')
            
         } 
function handleInputName (e){
    e.preventDefault()
         setSearch(e.target.value)
         }


return (
    <div className={styles.bkg}>
        
  
     <div className={styles.filterC}>
        <Link to = '/recipe'> <button className={styles.create}>Create Recipe </button></Link>

        <button onClick = {e => handleOnClick(e)} className={styles.refresh}> Refresh Recipes</button>

                
                <div className={styles.filt}>
               
                <select onChange={e => handleSort(e)} className={styles.select}>
                    <option value="asc">Ascendent(A-Z)</option>
                    <option value="des">Descendent(Z-A)</option>
                </select>
                </div>
                <div>
                <select  onChange={e => handlePuntuation(e)} className={styles.select}>
                    <option value="mayormenor">Mayor a menor por puntuacion</option>
                    <option value="menormayor">Menor a mayor por puntuacion</option>
                </select>
                </div>
                <div>
                <select onChange={e => handleFilterTypeDiet(e)} className={styles.select}>
                    <option value="All">All recipes</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                </div>
     </div>
        <div className={styles.search}>
            <form onSubmit={(e) => { handleSubmit(e) }}> {/* este es para hacer enter y que funcione */}
                <input type='text' placeholder='search...' value={search} onChange={(e) => { handleInputName(e) }} className={styles.input}></input>
                <button type='submit' className={styles.btnsearch}>search</button>
            </form>
        </div>
  
 <Link to={'/'}> <button type='button' className={styles.refresh}>LoandingPage</button> </Link>
     <div className={styles.paginado}> 
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado= {paginado}
            />
         
            </div>     

        <div className={styles.cards}>
            { 
            currentRecipes?.map( e =>{
                return (
                 
                    <Link   key={e.id}  to={'/recipes/' + e.id}>
                    <Card title={e.title} 
                    img={e.img} 
                    typeDiets={e.typeDiets} 
                    key={e.id}    
                    spoonacularScore={e.spoonacularScore}
                    />
               
                    </Link>
                    
                    )  
                })      
            }    
            </div>
     
          
    </div>
)
}