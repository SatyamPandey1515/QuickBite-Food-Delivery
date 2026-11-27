
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4
import boto3

app = FastAPI(title="QuickBite Food Delivery API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS DynamoDB connection
dynamodb = boto3.resource(
    "dynamodb",
    region_name="eu-north-1"
)

table = dynamodb.Table("QuickBiteOrders")

foods = [
    {"id": 1, "name": "Veg Burger", "price": 99, "emoji": "🍔"},
    {"id": 2, "name": "Pizza", "price": 199, "emoji": "🍕"},
    {"id": 3, "name": "Paneer Roll", "price": 129, "emoji": "🌯"},
    {"id": 4, "name": "French Fries", "price": 79, "emoji": "🍟"},
    {"id": 5, "name": "Cold Coffee", "price": 89, "emoji": "☕"}
]

class OrderItem(BaseModel):
    id: int
    quantity: int

class OrderRequest(BaseModel):
    customer_name: str
    address: str
    items: List[OrderItem]

@app.get("/")
def home():
    return {"message": "QuickBite API is running!"}

@app.get("/foods")
def get_foods():
    return foods

@app.post("/orders")
def create_order(order: OrderRequest):
    total = 0

    for item in order.items:
        food = next(
            (f for f in foods if f["id"] == item.id),
            None
        )

        if food is None or item.quantity < 1:
            raise HTTPException(
                status_code=400,
                detail="Invalid food item or quantity"
            )

        total += food["price"] * item.quantity

    new_order = {
        "order_id": str(uuid4())[:8],
        "customer_name": order.customer_name,
        "address": order.address,
        "items": [item.model_dump() for item in order.items],
        "total": total,
        "status": "Order Placed"
    }

    # Save order in AWS DynamoDB
    table.put_item(Item=new_order)

    return new_order

@app.get("/orders")
def get_orders():
    response = table.scan()
    return response.get("Items", [])
