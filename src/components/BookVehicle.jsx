import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { FaBook } from "react-icons/fa";

const BookVehicle = ({ vehicleId, setSelectedVehicle, onSuccess }) => {
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/bookings", {
        vehicleId,
        fromPincode,
        toPincode,
        startTime,
        customerId,
      });
      setSuccess("Booking created successfully!");
      onSuccess();
      setTimeout(() => setSelectedVehicle(null), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          From Pincode
        </label>
        <input
          type="text"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
          className="mt-1 block w-full p-2 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., 100001"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          To Pincode
        </label>
        <input
          type="text"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
          className="mt-1 block w-full p-2 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., 100010"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Start Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full p-2 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Customer ID
        </label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="mt-1 block w-full p-2 rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., cust123"
        />
      </div>
      {error && <p className="text-red-500 text-sm animate-fadeIn">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm animate-fadeIn">{success}</p>
      )}
      {loading && <Loader />}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-orange text-white py-2 px-4 rounded-md bg-orange-hover transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          <FaBook className="mr-2" />
          Confirm Booking
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicle(null)}
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookVehicle;
