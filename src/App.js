import { RouterProvider } from "react-router-dom";
import router from './router';
import { LoginProvider } from "./components/LoginContext";
function App() {
  return (
    <>
    <LoginProvider>
      <RouterProvider router={router} />
      </LoginProvider>
    </>
  );
}

export default App;
