import React, { useState } from "react";
import axios from "axios";

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
        <label className="block text-sm font-medium text-gray-700">
          Vehicle Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., Delivery Truck"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Capacity (kg)
        </label>
        <input
          type="number"
          value={capacityKg}
          onChange={(e) => setCapacityKg(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., 1000"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Tyres
        </label>
        <input
          type="number"
          value={tyres}
          onChange={(e) => setTyres(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="e.g., 6"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicle;
