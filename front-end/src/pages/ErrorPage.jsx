

import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
    return (
        <section className="flex items-center  justify-center min-h-screen px-6 py-10 mt-[100px]  ">
            <div className="w-full max-w-sm md:max-w-lg bg-gray-100  p-6 md:p-10 rounded-2xl text-center">
                <h2 className="text-7xl md:text-9xl font-extrabold text-gray-400">
                    404
                </h2>
                <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 ">
                    Oops! Page not found.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    The page you’re looking for doesn’t exist. Try going back to the homepage.
                </p>
                <Link to="/"  className="mt-6 inline-block px-5 py-3 text-sm md:text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition">
                    Back to Homepage
                </Link>
            </div>
        </section>
    );
}

export default ErrorPage;
