import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/study/StudyPage";
import StudyBoard from "./components/study/StudyBoard";
import Join from "./components/users/Join";
import Login from "./components/users/Login";


import Delete from "./components/users/Delete";

import Board from "./components/board/Board";
import WriteResume from "./components/resume/WriteResume";
import BoardAll from "./components/board/BoardAll";

import MyInfo from "./components/users/mypage/MyInfo";
import MyHome from "./components/users/mypage/MyHome";
import BoardDetail from "./components/board/BoardDetail";
import StudyCreate from "./components/study/StudyCreate";

import ResumeDetail from "./components/resume/ResumeDetail";

import Logout from "./components/users/Logout";
import MyResume from "./components/users/mypage/MyResume";

import MyPage from "./components/MyPage";

import UpdateResume from "./components/resume/UpdateResume";

import StudySetting from "./components/study/StudySetting";
import DeleteUser from "./components/study/setting/DeleteUser";
import UserAcess from "./components/study/setting/UserAcess";
import Study from "./components/study/setting/Study";
import CreatePost from "./components/board/post/CreatePost";
import MyIntroduction from "./components/users/mypage/MyIntroduction";
import DeletePost from "./components/board/post/DeletePost";
import UpdatePost from "./components/board/post/UpdatePost";
import IntroductionDetail from "./components/introduction/IntroductionDetail";
import WriteIntroduction from "./components/introduction/WriteIntroduction";
import UpdateIntroduction from "./components/introduction/UpdateIntroduction";
import MyMessageBox from "./components/message/MyMessageBox";
import MessageDetail from "./components/message/MessageDetail";
import FirstMessage from "./components/message/FirstMessage";
import JoinStudy from "./components/study/JoinStudy";
import SearchPost from "./components/job-posting/SearchPost";
import Main from "./components/Main";


import CreateGroupPost from "./components/study/post/CreateGroupPost";
import GroupPostDetail from "./components/study/post/GroupPostDetail";
import UpdateGroupPost from "./components/study/post/UpdateGroupPost";
import DeleteGroupPost from "./components/study/post/DeleteGroupPost";


const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Root />,
        children : [
            {
                path : "/",
                element : <Main />
                
            }
        ]

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
                path: "/user/delete",
                element: <Delete />,

            },
            {
                path: "/user/logout",
                element: <Logout />,

            }
        ]
    },
    {
        path: "/user",
        element: <MyPage />,
        children: [
            {
                path: "/user/home",
                element: <MyHome />,

            },
            {
                path: "/user/info",
                element: <MyInfo />,

            }, 
            {
                path: "/user/resume",
                element: <MyResume />,

            },
            {
                path:"/user/introduction",
                element:<MyIntroduction />
            }
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
            {
                path: "/board/write",
                element: (
                    <>
                        <CreatePost />
                    </>
                ),
            },
            {
                path: "/board/delete",
                element: (
                    <>
                        <DeletePost />
                    </>
                ),
            },
            {
                path: "/board/update",
                element: (
                    <>
                        <UpdatePost />
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

            },{
                path: "/study/join",
                element: <>
                    <JoinStudy />
                </>

            },{
                path: "/study/writePost",
                element: <>
                    <CreateGroupPost />
                </>

            },{
                path: "/study/post",
                element: <>
                    <GroupPostDetail />
                </>

            },{
                path: "/study/postUpdate",
                element: <>
                    <UpdateGroupPost />
                </>

            },{
                path: "/study/postDelete",
                element: <>
                    <DeleteGroupPost />
                </>

            },{
                path: "/study/setting",
                element: <>
                    <StudySetting />
                </>,
                children : [
                    {
                        path : "/study/setting/access",
                        element : <>
                            <UserAcess />
                        </>
                    },{
                        path : "/study/setting/delete",
                        element : <>
                            <DeleteUser />
                        </>
                    },{
                        path : "/study/setting/study",
                        element : <>
                            <Study />
                        </>
                    }
                ]

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
            },{
                path:"/resume/update/:resumeCode",
                element:<UpdateResume />
            }
        ]
    },
    {
        path:"/introduction",
        element : <Root />,
        children:[
            {
                path:"/introduction/viewDetail/:documentCode",
                element:<IntroductionDetail />
            },
            {
                path:"/introduction/write",
                element:<WriteIntroduction />
            },
            {
                path:"/introduction/update/:documentCode",
                element:<UpdateIntroduction />
            }
        ]

    },
    {
        path:"/message",
        element : <Root />,
        children:[
            {
                path:"/message/myMessageBox",
                element:<MyMessageBox />
            },
            {
                path:"/message/:target",
                element:<MessageDetail />
            },{
                path:"/message/newTarget",
                element : <FirstMessage />
            }
        ]

    }, {
        path: "/job",
        element: <Root />,
        children:[
            {
                path:"/job/search",
                element:<SearchPost />
            }
        ]
    }
], {
    basename: "/naeileun",
});

export default router;