import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { recipeServiceFactory } from "../../Services/recipeService";
import { commentServiceFactory } from "../../Services/commentService";
import { AuthContext } from '../../Contexts/AuthContext';

import heart  from '../../heart.png';
import { AddComment } from "./AddComment/AddComment";

export const RecipeDetails = () => {
    const { id }  = useParams(); 
    const { token, userId, deleteRecipe, likeRecipe, isAuthenticated, userEmail } = useContext(AuthContext)
    const [recipe, setRecipe] = useState({});
    const recipeService  = recipeServiceFactory(token);
    const commentService = commentServiceFactory(token);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            recipeService.getOne(id),
            commentService.getAll(id)
        ])        
        .then(([recipeData, commentsData]) => {
            setRecipe({...recipeData, comments: commentsData});           
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

    const onLikeClick = (id) => {
        setRecipe(x => x._id === id ? {...x, likes : x.likes + 1} : x);   
        likeRecipe(id);
    }

    const onCommentSubmit = async (values) => {
        const result = await commentService.create(id, values.comment);    
        setRecipe(state => ({
            ...state,
            comments:[
                ...state.comments, 
                {
                    ...result, 
                    author:{
                        email:userEmail
                    }                    
                }
            ]
        }))
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
            <div className="details-comments">
                {recipe.comments && (
                    recipe.comments.map(x => <p key={x._id}>{x.author.email} {x.comment}</p>)
                )}               
            </div>
            <div className="no-comments">
                {!recipe.comments && (
                   <p>No comments</p>)
                }               
            </div>
            {isOwner && (
            <div className="recipe-btn-container">
                <Link to={`/catalog/${id}/edit`} className="recipe-btn">Edit</Link>     
                <Link className="recipe-btn delete" onClick = {onDeleteClick}>Delete</Link> 
            </div>  
            )}   
            {!isOwner && (
            <div className="likes-container">      
                <div><span>{recipe?.likes} likes</span> </div>      
                <img className="like-img" src={heart} onClick={() =>onLikeClick(id)}/>
            </div>
            )}   

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
           
        </article>        
    )
}






