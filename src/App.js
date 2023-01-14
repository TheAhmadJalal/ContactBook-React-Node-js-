import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Routes  } from 'react-router-dom';

import Home from './MyComponents/Home';
import AddEdit from './MyComponents/AddEdit';
import View from './MyComponents/View';

function App() {
  return (
    <>
    <Router>
            <ToastContainer position="top-center"/>
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/addContact" element={<AddEdit/>}/>
            <Route path="/update/:id" element={<AddEdit/>}/>
            <Route path="/view/:id" element={<View/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
