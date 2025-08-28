import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const SearchAvailable = ({ setResults }) => {
  const [capacityRequired, setCapacityRequired] = useState("");
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4000/api/vehicles/available",
        {
          params: { capacityRequired, fromPincode, toPincode, startTime },
        }
      );
      setResults(res.data);
    } catch (err) {
      setError("Failed to search vehicles. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Capacity (kg)
        </label>
        <input
          type="number"
          value={capacityRequired}
          onChange={(e) => setCapacityRequired(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., 500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          From Pincode
        </label>
        <input
          type="text"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., 100001"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          To Pincode
        </label>
        <input
          type="text"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., 100010"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <Loader />}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        Search Vehicles
      </button>
    </form>
  );
};

export default SearchAvailable;
