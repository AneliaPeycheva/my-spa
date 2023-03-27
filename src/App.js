import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Main } from './Components/Main/Main';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Catalog } from './Components/Catalog/Catalog';
import { CreateRecipe } from './Components/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div id="container">

        <Header />

        <Routes>
          <Route path='/' element={<Main />} ></Route>
          <Route path='Login' element={<Login />} ></Route>
          <Route path='Register' element={<Register />} ></Route>
          <Route path='Catalog' element={<Catalog />} ></Route>
          <Route path='Create-Recipe' element={<CreateRecipe />} ></Route>
        </Routes>       

        <Footer />  
      
    </div>
  );
}

export default App;
