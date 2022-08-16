import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Callback from './Callback';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/callback' element={<Callback/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
