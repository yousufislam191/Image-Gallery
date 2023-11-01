import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center h-screen p-3">
      <h1 className="font-extrabold sm:text-9xl">OPPS!</h1>
      <h1 className="text-3xl sm:text-5xl">
        <strong>404 </strong>- PAGE NOT FOUND
      </h1>
      <h3 className="font-medium mt-3">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </h3>

      <button
        className="mt-5 bg-yellow-700 p-3 text-white rounded-lg"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to home page
      </button>
    </div>
  );
};

export default NotFound;
