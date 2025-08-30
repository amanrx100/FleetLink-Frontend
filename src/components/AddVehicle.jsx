import React, { useState } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa";

const AddVehicle = () => {
  const [name, setName] = useState("");
  const [capacityKg, setCapacityKg] = useState("");
  const [tyres, setTyres] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:4000/api/vehicles", {
        name,
        capacityKg: parseFloat(capacityKg),
        tyres: parseInt(tyres),
      });
      setSuccess("Vehicle added successfully!");
      setName("");
      setCapacityKg("");
      setTyres("");
    } catch (err) {
      setError("Failed to add vehicle. Please check your input.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Vehicle Name
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block p-2 w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
            placeholder="e.g., Delivery Truck"
            required
          />
          <FaTruck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Capacity (kg)
        </label>
        <input
          type="number"
          value={capacityKg}
          onChange={(e) => setCapacityKg(e.target.value)}
          className="mt-1 block p-2 w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., 1000"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Number of Tyres
        </label>
        <input
          type="number"
          value={tyres}
          onChange={(e) => setTyres(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border-gray-600 text-white shadow-sm focus-ring-orange transition-colors"
          placeholder="e.g., 6"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm animate-fadeIn">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm animate-fadeIn">{success}</p>
      )}
      <button
        type="submit"
        className="w-full bg-orange text-white py-2 px-4 rounded-md bg-orange-hover transition-colors shadow-md hover:shadow-lg"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicle;
