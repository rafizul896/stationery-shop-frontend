# Stationery Store

## Overview

The **Stationery Store** is a full-featured e-commerce platform that allows users to browse and purchase a variety of stationery products. The frontend is built using React.js and Tailwind CSS, offering a seamless and user-friendly shopping experience.

## Features

### **User Registration & Authentication (Role-Based)**
- Secure user registration with name, email, and password.
- Users are assigned a default "User" role upon registration.
- Login authentication using email and password.
- JWT-based authentication with tokens stored in local storage.
- Logout functionality clears the JWT token.

### **Public Routes**
#### Home Page:
- **Navbar**: Includes a logo, navigation items, and login/signup buttons.
- **Banner**: Displays promotional content or special offers.
- **Featured Products**: Showcases up to 6 products with a "View All" button leading to the All Products page.
- **Additional Sections**: Includes testimonials or blog content for better engagement.
- **Footer**: Contains essential links, social media icons, and contact details.

#### All Products Page:
- Search functionality by title, author, or category.
- Filtering options for price range, category, and availability.
- Dynamic result updates based on search terms or filters.
- Product cards displaying product name, price, and category.
- "View Details" button for each product.

#### Product Details Page:
- Displays a product image along with detailed information.
- Includes an "Add to Cart" button.

#### About Page:
- Provides information about the shop’s mission and values.

### **Private Routes**
#### Cart Page:
- Users can add products to the cart and place orders.
- Prevents ordering more than available stock.
- Displays product details, user details, and total price.
- "Order Now" button for confirming purchases.

#### **Dashboard (Role-Based Access)**
##### **Admin Dashboard:**
- Manage users (e.g., deactivate accounts).
- Perform CRUD operations on products.
- Handle order management (CRUD operations).
- Approve orders by changing order status from "Pending" to "Shipping."

##### **User Dashboard:**
- View order history.
- Manage profile settings (e.g., default shipping address).

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Redux-Toolkit
- **Authentication**: JSON Web Token (JWT)
- **Payment Integration**: Stripe
- **Hosting**: Vercel

## Setup Instructions

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rafizul896/stationery-shop-frontend.git
   cd stationery-shop-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

## Contributing

If you want to contribute to this project, follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and submit a pull request.

## License

This project is licensed under the MIT License.

](https://github.com/rafizul896/stationery-shop-frontend.git)
