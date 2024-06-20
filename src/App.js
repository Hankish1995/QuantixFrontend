
import './App.css';
import { Outlet, useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/signup"];
  return(

        <>
        
            {!hideHeaderRoutes.includes(location.pathname) && <><Header /></>}
           
           <Outlet />
       
            
          
        </>
  )
    
      
    };
    
  


export default App;
