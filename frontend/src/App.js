import logo from './logo.svg';
import './App.css';
import Contact from './pages/Contact';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Create from './CRUD/Create'
import NotFound from './pages/NotFound';
import AddProduct from './pages/AddProduct';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ReadAll from './CRUD/ReadAll';
import ReadOne from './CRUD/ReadOne';
import Update from './CRUD/Update';

function App() {
  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/readAll' element={<ReadAll/>}/>
        <Route path='/readOne/:id' element={<ReadOne/>}/>
        <Route path='/readOne/:id' element={<ReadOne/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
        <Route path='/update' element={<Update />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
