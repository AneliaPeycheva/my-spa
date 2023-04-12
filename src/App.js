import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { authServiceFactory} from './Services/authService';
import { recipeServiceFactory } from './Services/recipeService';
import { commentServiceFactory } from './Services/commentService';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Main } from './Components/Main/Main';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Logout }  from './Components/Logout/Logout';
import { Catalog } from './Components/Catalog/Catalog';
import { CreateRecipe } from './Components/CreateRecipe/CreateRecipe';
import { AuthContext } from './Contexts/AuthContext';
import { RecipeDetails } from './Components/RecipeDetails/RecipeDetails';
import { EditRecipe } from './Components/EditRecipe/EditRecipe';
import { RouteGuard } from './Components/Common/RouteGuard';

function App() {
  const initialCatalog = [
    {      
      title:"Tart",
      imageUrl:"https://images.unsplash.com/photo-1591441830800-5a6ae713899c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description:"Very delicious tart",
      ingredients:"100gr sugar, 2 eggs, 100gr flour",
      preparation:"Mix all ingredients",
      category:"Sweets",
      likes:0
  },
  {      
    title:"Cake",
    imageUrl:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fEclQzMlQTJ0ZWF1fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:"Very delicious cake",
    ingredients:"100gr sugar, 2 eggs, 100gr flour",
    preparation:"Mix all ingredients",
    category:"Sweets",
    likes:0
  }

  ]
  const [recipes, setRecipes] = useState([]);
  const [auth, setAuth] = useState({});
  const authService = authServiceFactory(auth.accessToken);
  const recipeService = recipeServiceFactory(auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    recipeService.getAll()
    .then(res => {
      setRecipes(res);   
    });       
  }, []);

  const onLoginSubmit = async (data) => {
    try {
        const result = await authService.login(data);

        setAuth(result);

        navigate('/catalog');
    } catch (error) {
        console.log('There is a problem');
    }
  };


  const onRegisterSubmit = async (values) => {
    const { confirmPassword, ...registerData } = values;
    if (confirmPassword !== registerData.password) {
        return;
    }

    try {
        const result = await authService.register(registerData);

        setAuth(result);
        
        navigate('/catalog');
    } catch (error) {
        console.log('There is a problem');
    }
  };

  const onLogout = async() => {
    await authService.logout();
    setAuth({});
  }

  const onCreateRecipeSubmit = async (data) => {
    const recipe = await recipeService.create(data);

    setRecipes(state => [...state, recipe]);

    navigate('/catalog');
  }

  const onEditRecipeSubmit = async (values) => {  
    const recipe = await recipeService.edit(values._id, values);

    setRecipes(state => state.map(x => x._id === values._id ? recipe : x));

    navigate(`/catalog/${values._id}`);
  }

  const deleteRecipe = (recipeId) => {
    setRecipes(state => state.filter(x => x._id !== recipeId));
  }
  
  // const likeRecipe = (id) => {
  //   setRecipes(state => state.map(x => x._id === id ? {...x, likes : x.likes + 1} : x));     
  // }

  const contextValues = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    deleteRecipe,
    userId:auth._id,
    token:auth.accessToken,
    userEmail:auth.email,
    isAuthenticated:!!auth.accessToken
  }  

  return (
    <AuthContext.Provider value={contextValues} >
      <div id="container">

        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/catalog' element={<Catalog recipes={recipes}/>} />    
          <Route path='/catalog/:id' element={<RecipeDetails />} />   
          <Route path='/create-recipe' element={
            <RouteGuard>
               <CreateRecipe onCreateRecipeSubmit={onCreateRecipeSubmit}/>
            </RouteGuard>
          } 
          />
          <Route path='/catalog/:id/edit' element={
            <RouteGuard>
              <EditRecipe onEditRecipeSubmit={onEditRecipeSubmit}  />
            </RouteGuard>
          }
          />
        </Routes>       

        {/* <Footer />   */}

      </div>
    </AuthContext.Provider>    
  );
}

export default App;
