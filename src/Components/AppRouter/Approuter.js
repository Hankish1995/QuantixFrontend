import App from "../../App"
import Login from "../Auth/Login"
import { createBrowserRouter } from "react-router-dom";
import Signup from "../Auth/Signup";
import Dashboard from "../Dashboard/Dashboard";
import DashboardMenu from "../Dashboard/DashboardMenu";
import Report from "../Report/Report";
const AppRouter = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "/",
                element : <Login />
            },
            {
                path : "/signup",
                element : <Signup />
            },
            {
                path : "/dashboard",
                element : <Dashboard/>
            },
            {
                path : "/menu",
                element : <DashboardMenu/>
            },
            {
                path : "/report",
                element : <Report/>
            },
           
        
            
        ],
        
    },
])

export default AppRouter