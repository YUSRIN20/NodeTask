
# Image Upload API

This is a simple Express-based API that allows users to upload images from a provided URL and retrieve the uploaded images. The application uses Axios for fetching images and saves them locally in a designated uploads directory.

## Features

- Upload images by providing a URL.
- Retrieve uploaded images via a unique filename.
- Supports CORS for cross-origin requests.

## Technologies Used

- Node.js
- Express.js
- Axios
- dotenv
- File System (fs)
- UUID for unique filename generation

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set the following environment variable:
   ```plaintext
   PORT=5000
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The server will run on `http://localhost:5000`.

## API Endpoints

### 1. Upload an Image

- **Endpoint:** `POST /upload`
- **Description:** Upload an image from a given URL.
- **Request Body:**
  ```json
  {
      "imageUrl": "https://example.com/path/to/image.jpg"
  }
  ```
- **Response:**
  - **Success:** Returns a message and the file path of the saved image.
    ```json
    {
        "message": "Image Saved",
        "filepath": "path/to/uploads/image.jpeg"
    }
    ```
  - **Error:** If an error occurs, returns a 500 status with an error message.

### 2. Retrieve an Uploaded Image

- **Endpoint:** `GET /uploads/:filename`
- **Description:** Retrieve an uploaded image using its filename.
- **URL Parameters:**
  - `filename`: The name of the uploaded image file.
- **Response:**
  - **Success:** Returns the image file.
  - **Error:** If the image is not found, returns a 404 status with an error message.

## Example Requests

### Upload Image Example

Using **Postman** or any API client:

1. **POST** request to `http://localhost:5000/upload`
2. Body:
   - Select **raw** and choose **JSON** format.
   - Input:
   ```json
   {
       "imageUrl": "https://example.com/path/to/image.jpg"
   }
   ```

### Get Uploaded Image Example

1. **GET** request to `http://localhost:5000/uploads/<generated-filename>.jpeg`
   - Replace `<generated-filename>` with the actual filename returned in the upload response.

## Folder Structure

```
/uploads          # Directory where uploaded images are stored
/.env             # Environment variables
/package.json     # Project metadata and dependencies
/index.js         # Main server file
```