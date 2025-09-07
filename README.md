# 🏨 Destination-Hotel Management App – General Assessment by Sonu Sahani

This is a full-stack MERN application developed as part of a technical assessment. It demonstrates the use of **nested MongoDB schemas**, **dependent collections**, **full CRUD operations**, and **frontend-backend API integration** using React.js and Express.js.

---

## 🚀 Features

- Full CRUD functionality for both Destinations and Hotels
- MongoDB with nested structures (coordinates, roomTypes, photos, etc.)
- Dependent relationships (Hotels linked to Destinations)
- Dynamic schema handling: supports additional fields dynamically
- Dropdown-based filtering of hotels by selected destination
- Simple and clean React UI
- RESTful API integration using Axios

---

## 🧱 Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React.js, Axios, Bootstrap |
| Backend      | Node.js, Express.js        |
| Database     | MongoDB + Mongoose         |
| Versioning   | Git & GitHub               |

---

## 📁 Folder Structure

general-assessment-sonu-sahani/
├── client/ # React frontend
│ ├── components/ # Dropdown, HotelList
│ └── pages/ # Home page to select destination and view hotels
├── server/ # Express backend
│ ├── models/ # Destination.js, Hotel.js
│ ├── routes/ # destinationRoutes.js, hotelRoutes.js
│ └── app.js # Main server file

yaml
Copy code

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js v16+ and npm
- MongoDB running locally or Atlas URI
- Git installed

---

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/sonusahani/general-assessment-sonu-sahani.git
cd general-assessment-sonu-sahani
🚀 2. Setup the Backend (Express.js)
bash
Copy code
cd server
npm install
Create a .env file in the server/ directory:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
Run the backend:

bash
Copy code
npm run dev
Server will be live at: http://localhost:5000

🌐 3. Setup the Frontend (React.js)
bash
Copy code
cd ../client
npm install
npm start
Frontend will be live at: http://localhost:3000

📌 API Endpoints Summary
📍 Destination
Method	Endpoint	Description
GET	/api/destinations	Get all destinations
POST	/api/destinations	Create a new destination
PUT	/api/destinations/:id	Update a destination
DELETE	/api/destinations/:id	Delete a destination

🏨 Hotel
Method	Endpoint	Description
GET	/api/hotels	Get all hotels
GET	/api/hotels/destination/:destinationId	Get hotels by destination
POST	/api/hotels	Create a new hotel
PUT	/api/hotels/:id	Update a hotel
DELETE	/api/hotels/:id	Delete a hotel


📸 Sample JSON Structures
Destination
json
Copy code
{
  "name": "Paris",
  "country": "France",
  "description": "Known for art, fashion, and the Eiffel Tower.",
  "coordinates": {
    "lat": 48.8566,
    "lon": 2.3522
  }
}

Hotel
json
Copy code
{
  "name": "Hotel de Lumière",
  "address": "123 Champs-Élysées, Paris, France",
  "stars": 5,
  "rating": 4.7,
  "priceFrom": 200,
  "roomTypes": [
    {
      "name": "Deluxe Room",
      "price": 250,
      "facilities": ["Free Wi-Fi", "King Bed", "AC", "Balcony"]
    },
    {
      "name": "Suite",
      "price": 400,
      "facilities": ["Free Wi-Fi", "Living Area", "Mini Bar", "Jacuzzi"]
    }
  ],
  "nearbyAttractions": [
    {
      "name": "Eiffel Tower",
      "distance": "2.1 km"
    },
    {
      "name": "Louvre Museum",
      "distance": "1.5 km"
    }
  ],
  "photos": [
    {
      "url": "https://example.com/photos/hotel1.jpg"
    }
  ]
}


🏁 Bonus Feature (Optional)
Support for content based on language (e.g., English / Arabic) using dynamic fields like:

json
Copy code
{
  "name": {
    "en": "Hotel Name in English",
    "ar": "اسم الفندق بالعربية"
  }
}


👨‍💻 Author
Sonu Sahani
📧 sonusahani.dev@gmail.com
🌐 Portfolio
🔗 www.linkedin.com/in/sonu--sahani
📱 +91 7080085907
📍 Lucknow, Uttar Pradesh, India

📃 License
This project is developed for assessment and learning purposes only.
