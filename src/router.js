import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Root";
import StudyPage from "./components/StudyPage";

import Join from "./components/users/Join";
import Main from "./components/Main";
import Login from "./components/users/Login";
import Board from "./components/Board";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root />,

    },
    {
        path: "/users",
        element: <Root />,
        children: [
            {
                path: "/users/join",
                element: <Join />,
            },
            {
                path: "/users/login",
                element: <Login />,
            },
            {
                path: "/users/Update",
                element: <Join />,
            },
            {
                path: "/users/join",
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
    }, {
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
    }
], {
    basename: "/naeileun",
});

export default router;