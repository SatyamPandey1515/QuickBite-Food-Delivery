# 🍔 QuickBite – Food Delivery Web Application

A full-stack food delivery web application built using **HTML, CSS, JavaScript, Python FastAPI, and AWS DynamoDB**. QuickBite allows users to explore food items, add items to their cart, and place food orders through a responsive web interface.

🌐 **Live Demo:** https://quickbite-food-delivery-ooij.netlify.app/

---

## 📌 Project Overview

QuickBite is a cloud-hosted food ordering application developed to demonstrate full-stack web development, REST API integration, and cloud database connectivity.

The frontend communicates with a Python FastAPI backend, while AWS DynamoDB stores customer order information.

## ✨ Features

- Browse available food items.
- View food prices.
- Add food items to the cart.
- Place food orders.
- Calculate order totals.
- Generate unique order IDs.
- Store orders in AWS DynamoDB.
- REST API integration.
- Cloud-based frontend and backend hosting.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and layout |
| JavaScript | Frontend functionality |
| Python | Backend programming |
| FastAPI | REST API development |
| AWS DynamoDB | NoSQL database |
| Boto3 | AWS integration |
| Netlify | Frontend hosting |
| Render | Backend hosting |
| Git & GitHub | Version control |

## 🏗️ System Architecture

```text
       USER
         |
         v
  QUICKBITE FRONTEND
   HTML / CSS / JS
         |
         v
     NETLIFY
         |
         v
    FASTAPI BACKEND
       RENDER
         |
         v
      BOTO3
         |
         v
   AWS DYNAMODB
   QuickBiteOrders
```

## 📂 Project Structure

```text
AWS Project/
│
├── Backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   └── .venv/
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── Database/
│
├── Image/
│
├── requirements.txt
└── .gitignore
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/foods` | Retrieve food items |
| POST | `/orders` | Create a new order |
| GET | `/orders` | Retrieve stored orders |

### Example Order Request

```json
{
  "customer_name": "Rahul",
  "address": "Lucknow",
  "items": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}
```

## ☁️ Cloud Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** AWS DynamoDB
- **AWS Region:** eu-north-1

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/SatyamPandey1515/QuickBite-Food-Delivery.git
```

### 2. Navigate to the project

```bash
cd QuickBite-Food-Delivery
```

### 3. Create and activate virtual environment

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r ..\requirements.txt
```

### 5. Configure AWS credentials

Configure AWS credentials securely through environment variables. Never upload access keys or secret keys to GitHub.

### 6. Start the backend

```bash
uvicorn app.main:app --reload
```

Backend API:
`http://127.0.0.1:8000`

API documentation:
`http://127.0.0.1:8000/docs`

For local frontend testing, serve the Frontend folder using a local HTTP server and configure its API URL to point to the local backend.

## 🔐 Security

- AWS credentials should be stored securely.
- Never commit `.env` files or secret keys.
- Use environment variables for sensitive configuration.
- Keep AWS IAM permissions limited to required resources.

## 🎯 Project Objectives

- Understand full-stack application development.
- Build and integrate REST APIs.
- Work with cloud-based NoSQL databases.
- Learn AWS service integration using Boto3.
- Deploy frontend and backend applications.

## 👨‍💻 Developer

**Satyam Pandey**

B.Tech – Computer Science and Engineering (Data Science & AI)

GitHub: [SatyamPandey1515](https://github.com/SatyamPandey1515)

Project Repository: [QuickBite-Food-Delivery](https://github.com/SatyamPandey1515/QuickBite-Food-Delivery)

---

⭐ If you find this project interesting, feel free to explore the repository!
