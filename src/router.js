import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";

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
                path: "",
                element: <h4>Hello</h4>,
            },
        ]
    },
],{
    basename:"/naeileun",
});

export default router;