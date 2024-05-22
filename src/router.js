import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import Join from "./components/users/Join";
import Login from "./components/users/Login";
import Update from "./components/users/Update";
import Delete from "./components/users/Delete";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Root />,
        
    },
    {
        path: "/user",
        element: <Root />,
        children:[
            {
                path: "/user/join",
                element: <Join />,
            },
            {
                path: "/user/login",
                element: <Login />,
            },
            {
                path: "/user/Update",
                element: <Update />,
            },
            {
                path: "/user/delete",
                element: <Delete />,
            },
        ]
    },
],{
    basename:"/naeileun",
});

export default router;