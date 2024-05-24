import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/study/StudyPage";
import StudyBoard from "./components/study/StudyBoard";
import Join from "./components/users/Join";
import Login from "./components/users/Login";

import Update from "./components/users/Update";
import Delete from "./components/users/Delete";

import Board from "./components/board/Board";
import WriteResume from "./components/resume/WriteResume";
import BoardAll from "./components/board/BoardAll";

import MyInfo from "./components/users/mypage/MyInfo";
import MyHome from "./components/users/mypage/MyHome";
import BoardDetail from "./components/board/BoardDetail";

import StudyCreate from "./components/study/StudyCreate";
import ResumeDetail from "./components/resume/ResumeDetail";


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
            {
                path: "/user/home",
                element: <MyHome />,

            },
            {
                path: "/user/info",
                element: <MyInfo />,

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
            {
                path: "/board/detail",
                element: (
                    <>
                        <BoardDetail />
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
                path: "/study/board",
                element: <>
                    <StudyBoard />
                </>

            },{
                path: "/study/create",
                element: <>
                    <StudyCreate />
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
            },
            {
                path:"/resume/viewDetail/:resumeCode",
                element:<ResumeDetail />
            }
        ]
    },
], {
    basename: "/naeileun",
});

export default router;