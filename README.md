# Guest Room Booking Application

## Overview
This application allows house owners to manage bookings for paying guests. House owners can register their properties, upload room details, and manage bookings. Customers can browse available rooms, view details, check availability, and make bookings for a short stay.


## Installation

### Prerequisites
- Node.js
- npm (Node package manager)

### Steps for deployment:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/arun14k08/guest-room-booking-application.git
   cd guest-room-booking-application

2. **Install backend dependencies and start the server:**
    ```sh
    cd api
    npm install
    npm start

3. **Install frontend dependencies and start the vite development server**
    ```sh
    cd ../client
    npm install
    npm run dev

## Features

### For House Owners
- **Account Management:**
  - Register and login with email and mobile number verification.

- **Property Management:**
  - Add, edit, and delete properties.
  - Add detailed room descriptions including name, no. of rooms, no. of beds, price.
  - Set daily rent amount, minimum, and maximum booking periods.

- **Booking Management:**
  - View all bookings for their rooms.

### For Customers
- **Account Management:**
  - Register and login with email and mobile number verification.

- **Room Browsing:**
  - View detailed room descriptions and photos.
  - Check room availability using an interactive calendar.

- **Booking Process:**
  - Select available dates and complete booking.

## Technology Stack
- **Frontend:**
  - React.js

- **Backend:**
  - Node.js with Express.js

- **Database:**
  - Atlas MongoDB (cloud DB)

- **Authentication:**
  - JWT for secure user sessions

