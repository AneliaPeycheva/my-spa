import { CatalogItem } from "../CatalogItem/CatalogItem";

export const Catalog = ({recipes}) => {
    return (
        <>
            <h1>Catalog</h1>
            <section className="catalog-container">  
            {recipes.map(x=> <CatalogItem key={x._id} {...x}/>)}
            </section>     
        </>      
 
    )
}