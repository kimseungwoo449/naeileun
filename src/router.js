import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/StudyPage";

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
    },{
        path: "/study",
        element: <Root />,
        children:[
            {
                path: "",
                element: <>
                    <StudyPage />
                </>
            },
        ]
    },{
        path: "/study/detail",
        element: <Root />,
        children:[
            {
                path: "",
                element: <>
                    <StudyPage />
                </>
            },
        ]
    }
],{
    basename:"/naeileun",
});

export default router;