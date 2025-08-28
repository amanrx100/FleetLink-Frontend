import React from "react";
// import { TruckIcon } from "@heroicons/react/24/outline";

const Results = ({ results, setSelectedVehicle }) => {
  return (
    <div className="space-y-4">
      {results.map((vehicle) => (
        <div
          key={vehicle._id}
          className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <TruckIcon className="h-8 w-8 text-blue-600 mr-3" /> */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Capacity: {vehicle.capacityKg} kg
                </p>
                <p className="text-sm text-gray-600">Tyres: {vehicle.tyres}</p>
                <p className="text-sm text-gray-600">
                  Estimated Duration: {vehicle.estimatedRideDurationHours} hours
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedVehicle(vehicle._id)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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
