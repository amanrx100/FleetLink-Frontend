import React from "react";
import { FaTruck } from "react-icons/fa";

const Results = ({ results, setSelectedVehicle }) => {
  return (
    <div className="space-y-4">
      {results.map((vehicle) => (
        <div
          key={vehicle._id}
          className="bg-gray-800 rounded-lg p-4 shadow-lg border-gray-dark hover:shadow-xl transition-all transform hover:scale-102"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTruck className="text-orange text-2xl mr-3 animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-gray-300">
                  Capacity: {vehicle.capacityKg} kg
                </p>
                <p className="text-sm text-gray-300">Tyres: {vehicle.tyres}</p>
                <p className="text-sm text-gray-300">
                  Estimated Duration: {vehicle.estimatedRideDurationHours} hours
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedVehicle(vehicle._id)}
              className="bg-orange text-white py-2 px-4 rounded-md bg-orange-hover transition-colors shadow-md hover:shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
