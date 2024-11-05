# Accommodation and Reservation Management System

This project is an accommodation and reservation management application developed with **React**. It allows users to log in, manage accommodations, and make reservations easily. The application is designed to be deployed in a production environment and uses several React libraries to facilitate form handling, route navigation, and API integration.

> [!NOTE]
> Grupo número 6<br/>
> Steven Josué Trujillo Cuéllar <br/>
> Rafael Edgardo Arévalo Vanegas<br/>
> Mario José Pinto Amaya<br/>
> Noe Jonathan Landaverde Mira<br/>
> Ronee Rodriguez<br/>
> Carlos Alexander Rosales Ascencio --- No participó en la actividad

## Main Features

### 1. User Login

- Authentication system that allows users to log in to the application.

### 2. Accommodation Management

- **Accommodation List**: Displays all available accommodations in the system.
- **Save Accommodation**: Allows users to add new accommodations.
- **Update Accommodation**: Functionality to edit the details of an existing accommodation.

### 3. Reservation Management

- **Reservation List**: Shows all reservations made in the system.
- **Save Reservation**: Allows users to create new reservations.
- **Cancel Reservation**: Users can cancel their reservations.
- **Reservation Calendar by Accommodation**: Visual representation of each accommodation's reservations on a calendar.

## Technologies and Libraries Used

- **React**: Main framework for building the user interface.
- **React Router**: For navigation between different sections of the application.
- **React Hooks**: To manage component state and lifecycle.
- **Axios or Fetch API**: For API interactions and data management.
- **React-Calendar** (optional): To display reservations in a visual calendar format.
- **Formik / React Hook Form**: For efficient form handling and validation.

## Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/your_username/your_repository.git
   ```

2. Install dependencies:
   - cd your_repository
   - npm install
3. Set up environment variables for API connections and any required services (e.g., authentication).

4. Start the development server:
   - npm run dev
5. Open the application in your browser at http://localhost:3000.

Application Usage

Login: Go to the login form, enter your credentials, and access the application.
Accommodation List and Management: Navigate to the Accommodations section to view the current list and use the options to add or update accommodations.
Reservations: Go to the Reservations section to view, create, or cancel a reservation.
Reservation Calendar: Select an accommodation to view its reservation calendar.
Technical Considerations

React Hooks: Hooks such as useState, useEffect, and useContext are implemented for managing the application’s state.
Routing: The application includes protected routes to ensure that only authenticated users can access specific sections.

Forms: Forms are validated using Formik or React Hook Form to provide a robust and user-friendly experience.
Contribution

To contribute to this project:

1. Fork the repository.
2. Create a new branch (feature/new-feature).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push your branch (git push origin feature/new-feature).
5. Create a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
