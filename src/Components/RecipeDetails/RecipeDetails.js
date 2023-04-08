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
                <Link className="card-btn delete" onClick = {onDeleteClick}>Delete</Link> 
                </div>  
            )}       
        </article>           
    )
}






