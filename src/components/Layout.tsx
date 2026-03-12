import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Link to="/" className="block">
            <h1 className="text-3xl font-bold text-white">📚 Book Finder</h1>
            <p className="mt-1 text-blue-200">
              Recherchez parmi des millions de livres via Open Library
              {window.location.pathname}
            </p>
          </Link>
        </div>
      </header>

      {/* Contenu de la page active */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-4 mt-8">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Book Finder. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
