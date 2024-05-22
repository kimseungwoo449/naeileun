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
            {
                path: "/user/resume",
                element: <Outlet />,
                children:[
                    {
                        path:"/user/resume/write",
                        element:<WriteResume />
                    }
                ]
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
    }, {
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
    }
], {
    basename: "/naeileun",
});

export default router;