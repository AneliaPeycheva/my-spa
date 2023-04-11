import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";

export const Catalog = ({recipes}) => {
    return (
        <>
            <section className="catalog-container">         
            {recipes?.length !== 0 && recipes.map(x=> <CatalogItem key={x._id} {...x}/>)}
            </section>    
            {recipes?.length == 0 && <p className="no-articles">No recipes yet</p>} 
        </>      
 
    )
}