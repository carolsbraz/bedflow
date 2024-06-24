import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { getCurrentUser } from "./services/users.service";
import { Index } from "./pages";

interface AdminRouteProps {
  element: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.is_admin) {
          console.log("Não pode");
          return navigate("/");
        }

        console.log("Usuário é um administrador. Permitindo acesso.");
      } catch (error) {
        console.log("Erro na tentativa de autenticar:", error);
      }
    };

    isAdmin();
  }, []);

  return <>{element}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/admin",
    element: <AdminRoute element={<Admin />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
