import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/study/StudyPage";

import Join from "./components/users/Join";
import Login from "./components/users/Login";
import Board from "./components/board/Board";
import WriteResume from "./components/resume/WriteResume";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root />,

    },
    {
        path: "/user",
        element: <Root />,
        children: [
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
                element: <Join />,
            },
            {
                path: "/user/join",
                element: <Join />,
            },
        ]
    },
    {
        path: "/board",
        element: <Root />,
        children: [
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
    {
        path: "/study",
        element: <Root />,
        children: [
            {
                path: "/study/detail",
                element: <>
                    <StudyPage />
                </>

            }
        ]
    },
    {
        path: "/resume",
        element: <Root />,
        children:[
            {
                path:"/resume/write",
                element:<WriteResume />
            }
        ]
    },
], {
    basename: "/naeileun",
});

export default router;