import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout";
import SearchPage from "../pages/SearchPage";
import BookDetailPage from "../pages/BookDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "book/:id",
        element: <BookDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
