# EventSpot - An Event Reservation System

The EventSpot is a web application that allows users to create custom event pages and manage reservations. It provides a platform for event organizers to create events, manage reservations, and allows users to make reservations for their desired events.

## Features

- User Registration and Authentication: Users can register an account and log in to access the system.
- Event Creation and Management: Event organizers can create events with details such as title, description, date, and available seats.
- Reservation Creation and Management: Users can make reservations for specific events, and organizers can manage the reservations.
- Guest Reservations: Users can make reservations without requiring registration.
- Email Verification: Users receive verification emails to confirm their reservations.
- Role-Based Access Control: Differentiates between regular users and event organizers with specific privileges.
- Data Protection: Implements security measures to protect user data and prevent unauthorized access.
- MongoDB Atlas Integration: Uses MongoDB Atlas as the database for storing event and reservation data.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Passport.js
- JSON Web Tokens (JWT)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Install the dependencies:

   ```bash
   cd EventSpot
   npm install
   ```

3. Set up environment variables:
  Create a .env file in the root directory.
  Define the necessary environment variables in the .env file, such as database connection details, secret keys, and email configurations.
  
4. Start the application:

   ```bash
   npm start
   ```

5. Access the application in your browser at <http://localhost:8080>.

## Folder Structure

The project's folder structure is organized as follows:

controllers/: Contains route handler functions or controllers.
models/: Defines the Mongoose models for events, reservations, and users.
routes/: Defines the application's routes and maps them to the corresponding controllers.
config/: Contains configuration files, such as database connection and Passport.js configuration.
middleware/: Contains custom middleware functions, such as authentication and authorization.
views/: Contains the views or templates for rendering HTML pages.
public/: Stores static files, such as CSS stylesheets and client-side JavaScript files.
Contributing
Contributions to the Event Reservation System are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Author

- [Timi Adenuga](https://theumbrelladev.me)

## License

This project is licensed under the MIT License.
