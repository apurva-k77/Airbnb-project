## WanderBnB – A Full-Stack Property Rental & Review Platform

This is a full-stack web application inspired by Airbnb, where users can browse, add, and review listings. It is built using **Node.js**, **Express.js**, **MongoDB Atlas**, and follows the **MVC design pattern** to ensure a modular and maintainable codebase. The application is styled using **Bootstrap** and integrates **Mapbox** for location visualization.

##  Features

-  **View Airbnb Listings**  
  Listings include title, image, description, price, location (country + coordinates), and user reviews.

-  **Add a New Listing**  
  Authenticated users can post their property as an Airbnb listing with an image and location.

-  **Review System**  
  Logged-in users can add reviews on listings they've visited, including their comments and feedback.

-  **User Authentication**  
  Users can **Sign Up** and **Login** to access features like creating listings or adding reviews.

-  **Map Integration**  
  Uses **Mapbox** to show geolocation data for listings.

-  **RESTful API Structure**  
  Follows RESTful principles for all major CRUD operations.

-  **MVC Architecture (Model-View-Controller)**  
  Ensures clear separation between routes, logic, and views.

---

##  Tech Stack

- **Frontend:** HTML, CSS, EJS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Passport.js
- **Map Services:** Mapbox SDK
- **File Uploads:** Multer, Cloudinary
- **Templating Engine:** EJS
- **Deployment:** Render

---

###  Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/airbnb-project.git
   cd airbnb-project

2. Install all dependencies
   ```bash
   npm install

3. Create a .env file with the following variables:
   ```bash
   DB_URL=your_mongodb_atlas_connection
   MAP_TOKEN=your_mapbox_token
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   SECRET=session_secret_key

4. Start the server
   ```bash
   node app.js
