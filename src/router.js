import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/study/StudyPage";

import Join from "./components/users/Join";
import Login from "./components/users/Login";

import Update from "./components/users/Update";
import Delete from "./components/users/Delete";

import Board from "./components/board/Board";
import WriteResume from "./components/resume/WriteResume";
import BoardAll from "./components/board/BoardAll";
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

                element: <Update />,
            },
            {
                path: "/user/delete",
                element: <Delete />,

            },
        ]
    },
    {
        path: "/board",
        element: <Root />,
        children: [
            {
                path: "/board",
                element: (
                    <>
                        <BoardAll />
                    </>
                ),
            },
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
                path: "/study",
                element: <>
                    <StudyPage />
                </>

            },{
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