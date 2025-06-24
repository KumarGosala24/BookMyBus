# 🚌 Bus Ticket Booking System

![Bus Image](https://github.com/KumarGosala24/BookMyBus/blob/ef52981cf72438a8886a2a33a1a7a18cfdb28627/Bus.jpg)

A full-stack **Bus Ticket Booking Application** built with **Django (Backend)**, **React.js (Frontend)**, and **MongoDB (Database)**. This system allows users to search buses, book tickets, and manage bookings with a responsive and user-friendly interface.

---

## 🔧 Tech Stack

- ⚙️ **Backend**: Django + Django REST Framework  
- 🎨 **Frontend**: React.js (with Axios, React Router, etc.)  
- 🗂️ **Database**: MongoDB (via Djongo or MongoEngine)  
- 🔐 **Authentication**: JWT-based login/signup for secure access  

---

## ✨ Features

### 👥 User Panel
- Register / Login (JWT Auth)
- Search buses by route/date
- Book available seats
- View booking history
- Cancel bookings

### 🧑‍💼 Admin Panel
- Add / Edit / Delete Buses
- Manage routes and schedules
- View all bookings
- Monitor seat availability

---

## 🚀 Getting Started

### Prerequisites

- Python ≥ 3.8  
- Node.js & npm  
- MongoDB  

### Backend Setup (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```
### Frontend Setup (React)

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Run the React app
npm start
```

### 🧠 Future Enhancements
- 🔄 Real-time seat availability with WebSockets

- 💳 Payment gateway integration (Razorpay, Stripe)

- 📧 Email/SMS ticket confirmation

- 📱 PWA support and mobile optimization

- 📊 Admin dashboard with analytics

### 🤝 Contributing
- Contributions, issues, and feature requests are welcome!
- Feel free to fork the repo and submit a pull request.

### 📄 License
- This project is licensed under the [MIT License](./LICENSE).


### 👨‍💻 Author
Gosala Sowjanya Kumar
[LinkedIn](https://www.linkedin.com/in/sowjanya-kumar-gosala/)


