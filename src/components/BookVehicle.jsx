import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Customer ID
        </label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., cust123"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      {loading && <Loader />}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          Confirm Booking
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicle(null)}
          className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookVehicle;
