import { Link } from 'react-router-dom';

export const CatalogItem = ({
    _id,
    title,
    imageUrl,
    description,
    ingredients,
    preparation,
    category
}) => {
    return (
        <article className="card">
            <h2>{title}</h2>
            <div className="card-image">
                <img src={imageUrl} alt="Recipe image"/>
            </div>           
            <div className="card-details">
                <span>{category}</span>                
                <p>{description}</p>                
            </div> 
            <Link className="card-btn" to={`/catalog/${_id}`}>Details</Link>           
        </article>        
    )
}