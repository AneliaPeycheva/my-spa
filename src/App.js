import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { authServiceFactory} from './Services/authService';
import { recipeServiceFactory } from './Services/recipeService';

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

function App() {
  const [recipes, setRecipes] = useState([]);
  const [auth, setAuth] = useState({});
  const authService = authServiceFactory(auth.accessToken);
  const recipeService = recipeServiceFactory(auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    recipeService.getAll()
    .then(res => setRecipes(res)); 
  },[])

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
    // await authService.logout();
    setAuth({});
  }

  const onCreateRecipeSubmit = async (data) => {
    const recipe = await recipeService.create(data);

    setRecipes(state => [...state, recipe]);
      
    navigate('/catalog');
  }

  const onEditRecipeSubmit = async (values) => {
    const recipe = await recipeService.edit(values._id, values);

    setRecipes(state => state.map(x => x._id === values._id ? recipe : x))
      
    navigate(`/catalog/${values._id}`);
  }

  const contextValues = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
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
          <Route path='/create-recipe' element={<CreateRecipe onCreateRecipeSubmit={onCreateRecipeSubmit}/>} />
          <Route path='/catalog/:id/edit' element={<EditRecipe onEditRecipeSubmit={onEditRecipeSubmit} />} />
        </Routes>       

        <Footer />  

      </div>
    </AuthContext.Provider>    
  );
}

export default App;
