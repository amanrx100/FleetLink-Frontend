import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck, FaTimesCircle, FaPlusCircle } from "react-icons/fa";
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
    <div className="bg-gray-dark rounded-2xl shadow-2xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-orange mb-6 text-center tracking-tight">
        Your Bookings
      </h2>
      {loading && <Loader />}
      {error && (
        <p className="text-red-500 text-base font-medium bg-gray-800 rounded-lg p-4 mb-4 animate-fadeIn text-center">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 text-base font-medium bg-gray-800 rounded-lg p-4 mb-4 animate-fadeIn text-center">
          {success}
        </p>
      )}
      {bookings.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-800 rounded-lg">
          <FaPlusCircle className="text-orange text-4xl mb-4 animate-pulse" />
          <p className="text-gray-300 text-lg font-medium">
            No bookings yet. Start by searching for a vehicle!
          </p>
        </div>
      )}
      {bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-dark hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-orange to-transparent opacity-20 pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <FaTruck className="text-orange text-3xl mr-4 animate-pulse" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {booking.vehicleId.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300">
                      <p>
                        <strong className="text-orange">Route:</strong>{" "}
                        {booking.fromPincode} → {booking.toPincode}
                      </p>
                      <p>
                        <strong className="text-orange">Customer ID:</strong>{" "}
                        {booking.customerId}
                      </p>
                      <p>
                        <strong className="text-orange">Start:</strong>{" "}
                        {new Date(booking.startTime).toLocaleString()}
                      </p>
                      <p>
                        <strong className="text-orange">End:</strong>{" "}
                        {new Date(booking.endTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors font-medium bg-gray-700 rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTimesCircle className="h-5 w-5 mr-2" />
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
