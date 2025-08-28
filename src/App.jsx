import React, { useState } from "react";
import AddVehicle from "./components/AddVehicle";
import SearchAvailable from "./components/SearchAvailable";
import Results from "./components/Results";
import BookVehicle from "./components/BookVehicle";
import Bookings from "./components/Bookings";

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refreshBookings, setRefreshBookings] = useState(0);

  const handleBookingSuccess = () => {
    setRefreshBookings((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">FleetLink</h1>
          <p className="text-lg">Manage and Book Logistics Vehicles</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Vehicle Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add New Vehicle
            </h2>
            <AddVehicle />
          </div>

          {/* Search Available Vehicles Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Search Available Vehicles
            </h2>
            <SearchAvailable setResults={setResults} />
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Available Vehicles
            </h2>
            <Results
              results={results}
              setSelectedVehicle={setSelectedVehicle}
            />
          </div>
        )}

        {/* Bookings Section */}
        <div className="mt-8">
          <Bookings refreshBookings={refreshBookings} />
        </div>

        {/* Book Vehicle Modal */}
        {selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Book Vehicle
              </h2>
              <BookVehicle
                vehicleId={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                onSuccess={handleBookingSuccess}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
