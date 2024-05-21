import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import WriteResume from "./components/resume/WriteResume";

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
                path: "/user/resume",
                element: <></>,
                children:[
                    {
                        path:"/user/resume/write",
                        element:<WriteResume />
                    }
                ]
            },
        ]
    },
],{
    basename:"/naeileun",
});

export default router;