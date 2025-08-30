import React, { useState } from "react";
import AddVehicle from "./components/AddVehicle";
import SearchAvailable from "./components/SearchAvailable";
import Results from "./components/Results";
import BookVehicle from "./components/BookVehicle";
import Bookings from "./components/Bookings";
import { FaTruck } from "react-icons/fa";

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refreshBookings, setRefreshBookings] = useState(0);

  const handleBookingSuccess = () => {
    setRefreshBookings((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-dark to-black text-white py-8 shadow-xl">
        <div className="container mx-auto px-4 flex items-center">
          <FaTruck className="text-orange text-4xl mr-3 animate-pulse" />
          <div>
            <h1 className="text-4xl font-bold text-orange animate-fadeIn">
              FleetLink
            </h1>
            <p className="text-lg text-gray-300 animate-fadeIn">
              Streamlined Logistics Management
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Vehicle Section */}
          <div className="bg-gray-dark rounded-xl shadow-2xl p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-orange mb-4">
              Add New Vehicle
            </h2>
            <AddVehicle />
          </div>

          {/* Search Available Vehicles Section */}
          <div className="bg-gray-dark rounded-xl shadow-2xl p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-orange mb-4">
              Search Available Vehicles
            </h2>
            <SearchAvailable setResults={setResults} />
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-8 bg-gray-dark rounded-xl shadow-2xl p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-orange mb-4">
              Available Vehicles
            </h2>
            <Results
              results={results}
              setSelectedVehicle={setSelectedVehicle}
            />
          </div>
        )}

        {/* Bookings Section */}
        <div className="mt-8 bg-gray-dark rounded-xl shadow-2xl p-6 animate-fadeIn">
          <Bookings refreshBookings={refreshBookings} />
        </div>

        {/* Book Vehicle Modal */}
        {selectedVehicle && (
          <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
            <div className="bg-gray-dark rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn">
              <h2 className="text-2xl font-semibold text-orange mb-4">
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
