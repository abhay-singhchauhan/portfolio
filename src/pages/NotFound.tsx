
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-portfolio-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
