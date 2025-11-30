# Pasovit Clothing — Backend (Node.js + Express + MongoDB Atlas)

This is the backend API for the Pasovit Clothing eCommerce website.  
It handles authentication, products, cart, and orders using Express.js and MongoDB Atlas.
The backend is deployed on Render.

---

## 🚀 Features
- User Registration & Login (JWT + HttpOnly Cookies)
- Fetch Products & Product Details
- Shopping Cart (Add, Remove, Update)
- Order Placement
- Protected Auth Routes
- MongoDB Atlas Cloud Database
- CORS enabled for frontend deployment (Vercel)

---

## 📁 Folder Structure
backend/
│── config/
│   └── db.js  
│── controllers/
│── middleware/
│── models/
│── routes/
│── .env  
│── server.js  
│── package.json  

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/umaGannamani/backend-pasovit.git
cd backend
2️⃣ Install dependencies
npm install
🔧 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.vercel.app

▶️ Run Locally
node server.js


Backend will run at:

http://localhost:5000

4️⃣ Deploy

Your API URL will look like:

https://backend-pasovit.onrender.com

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged in user
Products
Method	Endpoint	Description
GET	/api/products	All products
GET	/api/products/:id	Product details
Cart
Method	Endpoint	Description
GET	/api/cart	User cart
POST	/api/cart/add	Add item
PUT	/api/cart/update/:id	Update item
DELETE	/api/cart/remove/:id	Remove item
Orders
Method	Endpoint	Description
POST	/api/orders	Create order
