import { useForm } from '../../Hooks/useForm';

export const CreateRecipe = ({
    onCreateRecipeSubmit
}) => {
    const [values, changeHandler, onSubmit] = useForm({
        title:"",
        imageUrl:"",
        description:"",
        ingredients:"",
        preparation:"",
        category:""
    }, onCreateRecipeSubmit)
    return (
        <div className="create-recipe">
            <form onSubmit={onSubmit}>
                <div className="container">
                    <h1>Share Recipe</h1>
                    <p>Please fill in this form.</p>                  
              
                    <p>Title</p>                                      
                    <input type="text" placeholder="Enter Title" name="title" value={values.title} onChange={changeHandler}/>                                  

                    <p>Recipe Image</p>
                    <input type="text" placeholder="Enter Recipe Image" name="imageUrl" value={values.imageUrl} onChange={changeHandler}/>                

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value={values.description} onChange={changeHandler}/> 

                    <p>Ingredients</p>
                    <input type="text" placeholder="Enter ingredients separated with comma" name="ingredients" value={values.ingredients} onChange={changeHandler}/> 

                    <p>Preparation</p>
                    <input type="text" placeholder="Enter Description" name="preparation" value={values.preparation} onChange={changeHandler}/> 

                    <p>Category</p>
                    <input type="text" placeholder="Enter Category" name="category" value={values.category} onChange={changeHandler}/>
                
                    <button type="submit" className="registerbtn">Create</button>
                </div>
            </form>
        </div>
    )
}