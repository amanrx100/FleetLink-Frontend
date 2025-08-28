import React, { useState, useEffect } from "react";
import axios from "axios";
// import { TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

const Bookings = ({ refreshBookings }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/getBookings");
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [refreshBookings]);

  const handleCancel = async (bookingId) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/bookings/${bookingId}`);
      setSuccess("Booking cancelled successfully!");
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError("Failed to cancel booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Current Bookings
      </h2>
      {loading && <Loader />}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      {bookings.length === 0 && !loading && (
        <p className="text-gray-600">No bookings found.</p>
      )}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <TruckIcon className="h-8 w-8 text-blue-600 mr-3" /> */}
                <div>
                  <p className="text-sm text-gray-600">
                    {/* <strong>Vehicle ID:</strong> {booking.vehicleId} */}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Route:</strong> {booking.fromPincode} to{" "}
                    {booking.toPincode}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Start Time:</strong>{" "}
                    {new Date(booking.startTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>End Time:</strong>{" "}
                    {new Date(booking.endTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Customer ID:</strong> {booking.customerId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCancel(booking._id)}
                className="text-red-600 hover:text-red-700 transition-colors flex items-center"
              >
                {/* <XCircleIcon className="h-6 w-6 mr-1" /> */}
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
