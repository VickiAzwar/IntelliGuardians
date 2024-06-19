
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from '../Views/404';
import Home from '../Views/Home/Home';
import Auth from '../Views/Auth/Auth';
import Login from '../Views/Auth/Login';

function Routes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/home",
      element: <Home />,
    }
  ]);

  return (
    
    <RouterProvider router={router} />
    
  );
}

export default Routes;
