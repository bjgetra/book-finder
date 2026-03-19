import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-gray-300">404</p>
      <p className="mt-4 text-lg text-gray-600">Cette page n'existe pas.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
