import './index.css';
import React,{useState,useEffect} from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [logged,setLogged] = useState(false);

  const onSubmitForm = (data) => {
    //////////console.log(data);
    if (data !== null || data !== undefined) 
    {
      setLogged(true);
    }
  }

  return (
    <div className="App">
      {
        logged ? 
        <Home feedback={()=>{setLogged(false);
        }}/> : 
        <Login feedback={(data)=>onSubmitForm(data)}/>
      }
    </div>
  );
}

export default App;
