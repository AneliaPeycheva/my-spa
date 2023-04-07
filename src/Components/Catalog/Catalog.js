import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";

export const Catalog = ({recipes}) => {
    return (
        <>
            <section className="catalog-container">  
            {recipes.map(x=> <CatalogItem key={x._id} {...x}/>)}
            </section>     
        </>      
 
    )
}