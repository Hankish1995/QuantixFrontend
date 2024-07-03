
import './App.css';
import { Outlet, useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { Provider } from 'react-redux';
import store from './Components/Utils/Store/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/signup","/forgot-password","/reset-password","/verify-otp","/error"];

  return(

        <>
        <Provider store={store}>
        {!hideHeaderRoutes.includes(location.pathname) && <><Header /></>}
           <Outlet />
           <ToastContainer/>
        </Provider>
        </>
  )
    
      
    };
    
  


export default App;
