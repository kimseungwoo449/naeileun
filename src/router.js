import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import Join from "./components/users/Join";
import Main from "./components/Main";
import Login from "./components/users/Login";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Main />,
        
    },
    {
        path: "/users",
        element: <Root />,
        children:[
            {
                path: "/users/join",
                element: <Join />,
            },
            {
                path: "/users/login",
                element: <Login />,
            },
            {
                path: "/users/Update",
                element: <Join />,
            },
            {
                path: "/users/join",
                element: <Join />,
            },
        ]
    },
],{
    basename:"/naeileun",
});

export default router;