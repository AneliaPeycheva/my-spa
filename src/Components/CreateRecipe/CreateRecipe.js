export const CreateRecipe = () => {
    return (
        <div className="create-recipe">
            <form>
                <div className="container">
                    <h1>Share Recipe</h1>
                    <p>Please fill in this form.</p>                  
              
                    <p>Title</p>                                      
                    <input type="text" placeholder="Enter Title" name="title" />                                  

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" />

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" /> 
                
                    <button type="submit" class="registerbtn">Create</button>
                </div>
            </form>
        </div>
    )
}