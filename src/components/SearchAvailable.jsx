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
        <label className="block text-sm font-medium text-gray-300">
          Required Capacity (kg)
        </label>
        <input
          type="number"
          value={capacityRequired}
          onChange={(e) => setCapacityRequired(e.target.value)}
          className="block p-2 w-full mt-1 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., 500"
          required
        />
      </div>
      <div className="flex gap-3">
        <div className="w-100">
          <label className="block  text-sm font-medium text-gray-300">
            From Pincode
          </label>
          <input
            type="text"
            value={fromPincode}
            onChange={(e) => setFromPincode(e.target.value)}
            className="block p-2 w-full mt-1 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
            placeholder="e.g., 100001"
            required
          />
        </div>
        <div className="w-100">
          <label className="block text-sm font-medium text-gray-300">
            To Pincode
          </label>
          <input
            type="text"
            value={toPincode}
            onChange={(e) => setToPincode(e.target.value)}
            className="block p-2 w-full mt-1 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
            placeholder="e.g., 100010"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Start Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="block p-2 w-full mt-1 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <Loader />}
      <button
        type="submit"
        className="w-full bg-orange text-white py-2 px-4 rounded-md bg-orange-hover transition-colors shadow-md hover:shadow-lg"
        disabled={loading}
      >
        Search Vehicles
      </button>
    </form>
  );
};

export default SearchAvailable;
