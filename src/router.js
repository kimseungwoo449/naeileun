import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import Board from "./components/Board";

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
    {
        path: "/board",
        element: <Root />,
        children:[
            {
                path: "/board/view",
                element: (
                    <>
                        <Board />
                    </>
                ),
            },
        ]
    },
],{
    basename:"/naeileun",
});

export default router;