import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <FaSpinner className="animate-spin text-orange text-2xl mr-2" />
      <span className="text-gray-300">Loading...</span>
    </div>
  );
};

export default Loader;
