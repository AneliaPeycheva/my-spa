import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { recipeServiceFactory } from "../../Services/recipeService";
import { AuthContext } from '../../Contexts/AuthContext';

export const RecipeDetails = () => {
    const { id }  = useParams(); 
    const { token, userId, deleteRecipe } = useContext(AuthContext)
    const [recipe, setRecipe] = useState({});
    const recipeService  = recipeServiceFactory(token);
    const navigate = useNavigate();
    useEffect(() => {
      recipeService.getOne(id)
          .then(result => {
              setRecipe(result);              
          })
    }, [id]);

   
    const isOwner = recipe._ownerId === userId;

    const onDeleteClick = async () => {
        //eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete this recipe?`)
      
        if (result) {
            await recipeService.delete(recipe._id);

            deleteRecipe(recipe._id);

            navigate('/catalog');
        }
    }
    return (
        <article className="recipe-container">    
            <div className="recipe-name">{recipe?.title}</div>
            <div className="recipe-image">
                <img src={recipe?.imageUrl} alt="Recipe image"/>
            </div> 
            <div className="recipe-details">
                <p className="recipe-title">Ingredients:</p>
                <p>{recipe?.ingredients}</p>          
                <p className="recipe-title">Preparation:</p>      
                <p>{recipe?.preparation}</p>   
                <p className="recipe-title">Author:</p>     
                <p>{recipe?._ownerId}</p>             
            </div> 
            {isOwner && (
            <div className="recipe-btn-container">
                <Link to={`/catalog/${id}/edit`} className="recipe-btn">Edit</Link>     
                <Link className="recipe-btn delete" onClick = {onDeleteClick}>Delete</Link> 
            </div>  
        )}    
        </article>        
    )
}






