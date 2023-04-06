export const CatalogItem = ({
    title,
    imageUrl,
    description,
    category
}) => {
    return (
        <article className="card">
            <h2>{title}</h2>
            <figure className="image-container">
                <img src={imageUrl} alt="Recipe image"/>
            </figure>           
            <div className="card-details">
                <span>{category}</span>                
                <p>{description}</p>                
            </div> 
            <button>Read more</button>           
        </article>   
    )
}