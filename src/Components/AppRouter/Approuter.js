import App from "../../App"
import Login from "../Auth/Login"
import { createBrowserRouter } from "react-router-dom";
import Signup from "../Auth/Signup";
import Dashboard from "../Dashboard/Dashboard";

import Report from "../Report/Report";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ForgotPassword from "../Auth/ForgotPassword";
import VerifyOtp from "../Auth/VerifyOtp";
import ResetPassword from "../Auth/ResetPassword";
import AddPlan from "../Dashboard/AddPlan";
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
                path : "/forgot-password",
                element : <ForgotPassword />
            },
            {
                path : "/verify-otp",
                element : <VerifyOtp />
            },
            {
                path : "/reset-password",
                element : <ResetPassword />
            },
            {
                path:"/",
                element:<ProtectedRoute/>,
                children:[
                    {
                        path : "/dashboard",
                        element : <Dashboard/>
                    },
                    {
                        path : "/addPlan",
                        element : <AddPlan/>
                    },
                    {
                        path : "/report",
                        element : <Report/>
                    },
                ]
            },
           
           
        
            
        ],
        
    },
])

export default AppRouter