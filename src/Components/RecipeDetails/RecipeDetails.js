import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { recipeServiceFactory } from "../../Services/recipeService";
import { AuthContext } from '../../Contexts/AuthContext';


export const RecipeDetails = () => {
    const { id }  = useParams(); 
    const { token, userId } = useContext(AuthContext)
    const [recipe, setRecipe] = useState({});
    const recipeService  = recipeServiceFactory(token);
   
    useEffect(() => {
      recipeService.getOne(id)
          .then(result => {
              setRecipe(result);
          })
    }, [id]);

    const isOwner = recipe._ownerId === userId;

    return (
        <article className="card">
            <h2>{recipe?.title}</h2>
            <div className="card-image">
                <img src={recipe?.imageUrl} alt="Recipe image"/>
            </div>                      
            <div className="card-details">
                <p className="label">Ingredients:</p>
                <p>{recipe?.ingredients}</p>          
                <p className="label">Preparation:</p>      
                <p>{recipe?.preparation}</p>   
                <p className="label">Author:</p>     
                <p>{recipe?._ownerId}</p>             
            </div> 
            {isOwner && (
                <div className="card-btn-container">
                <Link to={`/catalog/${id}/edit`} className="card-btn">Edit</Link>     
                <Link className="card-btn delete">Delete</Link> 
                </div>  
            )}       
        </article>           
    )
}






