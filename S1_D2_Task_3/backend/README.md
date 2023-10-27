# Express Product Management API Documentation

This README provides documentation for an Express project that implements a Product Management API. This API allows you to manage products and their associated reviews. The API endpoints and their descriptions are listed below:

## Endpoints

### Add a Product

- **Endpoint**: `POST /api/products/`
- **Description**: Add a new product to the database.
- **Request**:
  - Body:
    - `name` (string): Name of the product (required)
    - `price` (number): Price of the product (required)
- **Response**:
  - `200 OK`: Product added successfully.
  - `500 Internal Server Error`: Error occurred while creating a product.
- **Example**:
  ```json
  POST /api/products/
  {
    "name": "Product Name",
    "price": 19.99
  }
### Get All Products

- **Endpoint**: `GET /api/products/`
- **Description**: Retrieve a list of all products.
- **Response**:
  - `200 OK`: List of products retrieved successfully.
  - `500 Internal Server Error`: Error while fetching all products.
- **Example**:
  ```json
  GET /api/products/
### Get a Single Product

- **Endpoint**: `GET /api/products/:id`
- **Description**: Retrieve a specific product by its ID.
- **Parameters**:
  - `id` (string): The ID of the product to retrieve (required).
- **Response**:
  - `200 OK`: Product retrieved successfully.
  - `404 Not Found`: Product not found.
  - `500 Internal Server Error`: Error in finding the product.
- **Example**:
  ```json
  GET /api/products/12345
### Update a Product

- **Endpoint**: `PATCH /api/products/:id`
- **Description**: Update an existing product by its ID.
- **Parameters**:
  - `id` (string): The ID of the product to update (required).
- **Request**:
  - Body (JSON): Object with fields to update (e.g., `name` or `price`).
- **Response**:
  - `200 OK`: Product updated successfully.
  - `404 Not Found`: Product not found.
  - `500 Internal Server Error`: Error while updating the product.
- **Example**:
  ```json
  PATCH /api/products/12345
  {
    "name": "Updated Product Name"
  }
### Delete a Product

- **Endpoint**: `DELETE /api/products/:id`
- **Description**: Delete a product by its ID.
- **Parameters**:
  - `id` (string): The ID of the product to delete (required).
- **Response**:
  - `200 OK`: Product deleted successfully.
  - `404 Not Found`: Product not found.
  - `500 Internal Server Error`: Error while deleting the product.
- **Example**:
  ```json
  DELETE /api/products/12345
### Create a Review

- **Endpoint**: `POST /api/products/:id/reviews`
- **Description**: Add a review to a product.
- **Parameters**:
  - `id` (string): The ID of the product to add a review to (required).
- **Request**:
  - Body:
    - `userId` (string): ID of the user submitting the review (required).
    - `description` (string): Review description (required).
- **Response**:
  - `201 Created`: Review added to the product.
  - `404 Not Found`: Product not found.
  - `500 Internal Server Error`: Error while adding a review to the product.
- **Example**:
  ```json
  POST /api/products/12345/reviews
  {
    "userId": "user123",
    "description": "Great product!"
  }
### Delete a Review

- **Endpoint**: `DELETE /api/products/:productId/reviews/:reviewId`
- **Description**: Delete a review from a product.
- **Parameters**:
  - `productId` (string): The ID of the product to remove a review from (required).
  - `reviewId` (string): The ID of the review to delete (required).
- **Response**:
  - `200 OK`: Review deleted from the product.
  - `404 Not Found`: Product or review not found.
  - `500 Internal Server Error`: Error while deleting the review from the product.
- **Example**:
  ```json
  DELETE /api/products/12345/reviews/54321

## Running Tests

To run tests, run the following command

```bash
  npm run test
```