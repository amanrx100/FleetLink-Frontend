## Frontend Documentation

### Setup Instructions

1. **Create Project**:

   ```bash
   npx create-react-app fleetlink-frontend
   cd fleetlink-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install axios tailwindcss postcss autoprefixer @headlessui/react @heroicons/react
   ```

3. **Project Structure**:

   ```
   fleetlink-frontend/
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── components/
   │   │   ├── AddVehicle.jsx
   │   │   ├── SearchAvailable.jsx
   │   │   ├── Results.jsx
   │   │   ├── BookVehicle.jsx
   │   │   ├── Bookings.jsx
   │   │   └── Loader.jsx
   │   ├── App.jsx
   │   ├── index.js
   │   └── index.css
   ├── tailwind.config.js
   ├── package.json
   ```

4. **Run the Frontend**:
   ```bash
   npm start
   ```
   Access at `http://localhost:4000`.

### Components

#### 1. **AddVehicle.jsx**

- **Purpose**: Form to add a new vehicle to the fleet.
- **Features**:
  - Inputs for name, capacity (kg), and tyres.
  - Client-side validation and feedback (success/error messages).
  - Calls `POST /api/vehicles`.
- **UI**: Tailwind-styled form with blue buttons, rounded inputs, and loading state.

#### 2. **SearchAvailable.jsx**

- **Purpose**: Form to search for available vehicles.
- **Features**:
  - Inputs for capacity, from/to pincodes, and start time.
  - Calls `GET /api/vehicles/available` and updates results.
  - Displays loading state and errors.
- **UI**: Tailwind-styled form with responsive layout and focus states.

#### 3. **Results.jsx**

- **Purpose**: Displays search results with vehicle details.
- **Features**:
  - Shows vehicle name, capacity, tyres, and estimated ride duration.
  - "Book Now" button opens a modal for booking.
  - Uses Heroicons for truck icons.
- **UI**: Card-based layout with hover effects and blue accents.

#### 4. **BookVehicle.jsx**

- **Purpose**: Modal form to book a vehicle.
- **Features**:
  - Inputs for route, start time, and customer ID.
  - Calls `POST /api/bookings` and triggers booking list refresh.
  - Success/error feedback and loading state.
- **UI**: Modal with semi-transparent overlay, blue confirm button, and gray cancel button.

#### 5. **Bookings.jsx**

- **Purpose**: Displays and manages current bookings.
- **Features**:
  - Fetches bookings via `GET /api/bookings`.
  - Displays booking details (vehicle ID, route, times, customer ID).
  - "Cancel" button calls `DELETE /api/bookings/:id`.
  - Auto-refreshes on booking creation/cancellation.
- **UI**: Card-based list with red cancel buttons and truck icons.

#### 6. **Loader.jsx**

- **Purpose**: Displays a loading spinner during API calls.
- **UI**: Tailwind-styled spinning circle with "Loading..." text.

### API Integration Example

1. **Add Vehicle**:

   ```bash
   curl -X POST http://localhost:4000/api/vehicles \
   -H "Content-Type: application/json" \
   -d '{"name":"Delivery Truck","capacityKg":1000,"tyres":6}'
   ```

   Response:

   ```json
   {
     "_id": "507f1f77bcf86cd799439011",
     "name": "Delivery Truck",
     "capacityKg": 1000,
     "tyres": 6,
     "__v": 0
   }
   ```

2. **Search Available Vehicles**:

   ```bash
   curl "http://localhost:4000/api/vehicles/available?capacityRequired=500&fromPincode=100001&toPincode=100010&startTime=2025-08-29T10:00:00Z"
   ```

   Response:

   ```json
   [
     {
       "_id": "507f1f77bcf86cd799439011",
       "name": "Delivery Truck",
       "capacityKg": 1000,
       "tyres": 6,
       "estimatedRideDurationHours": 9
     }
   ]
   ```

3. **Create Booking**:

   ```bash
   curl -X POST http://localhost:4000/api/bookings \
   -H "Content-Type: application/json" \
   -d '{"vehicleId":"507f1f77bcf86cd799439011","fromPincode":"100001","toPincode":"100010","startTime":"2025-08-29T10:00:00Z","customerId":"cust123"}'
   ```

   Response:

   ```json
   {
     "_id": "507f1f77bcf86cd799439012",
     "vehicleId": "507f1f77bcf86cd799439011",
     "fromPincode": "100001",
     "toPincode": "100010",
     "startTime": "2025-08-29T10:00:00Z",
     "endTime": "2025-08-29T19:00:00Z",
     "customerId": "cust123",
     "__v": 0
   }
   ```

4. **Cancel Booking**:

   ```bash
   curl -X DELETE http://localhost:4000/api/bookings/507f1f77bcf86cd799439012
   ```

   Response:

   ```json
   { "message": "Booking cancelled successfully" }
   ```

5. **List Bookings**:
   ```bash
   curl http://localhost:4000/api/getBookings
   ```
   Response:
   ```json
   [
     {
       "_id": "507f1f77bcf86cd799439012",
       "vehicleId": {
         "_id": "507f1f77bcf86cd799439011",
         "name": "Delivery Truck",
         "capacityKg": 1000,
         "tyres": 6
       },
       "fromPincode": "100001",
       "toPincode": "100010",
       "startTime": "2025-08-29T10:00:00Z",
       "endTime": "2025-08-29T19:00:00Z",
       "customerId": "cust123"
     }
   ]
   ```

### Usage Guidelines

1. **Backend**:

   - Ensure MongoDB is running locally (`mongod`).
   - Start the server: `nodemon start`.
   - Run tests: `npm test` to verify API functionality.
   - Monitor logs for errors and ensure valid input data.

2. **Frontend**:
   - Start the React app: `npm start`.
   - Access at `http://localhost:4000`.
   - Add vehicles, search for availability, create bookings, and view/cancel bookings via the UI.
   - Check browser console for API errors.
