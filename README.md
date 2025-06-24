# 🚌 Bus Ticket Booking System

![Bus Image](https://github.com/KumarGosala24/BookMyBus/blob/ef52981cf72438a8886a2a33a1a7a18cfdb28627/Bus.jpg)

A full-stack **Bus Ticket Booking Application** built with **Django (Backend)**, **React.js (Frontend)**, and **MongoDB (Database)**. This system allows users to search buses, book tickets, and manage bookings with a responsive and user-friendly interface.

---

## 🔧 Tech Stack

- ⚙️ **Backend**: Django + Django REST Framework  
- 🎨 **Frontend**: React.js (with Axios, React Router, etc.)  
- 🗂️ **Database**: MongoDB (via Djongo or MongoEngine)  
- 🔐 **Authentication**: JWT-based login/signup for secure access  
- ☁️ **Deployment Ready**: Configured for deployment on platforms like Heroku, Render, or Vercel

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


