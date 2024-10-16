# angular_evitalrx




Angular Medicine Ordering System

This is an Angular-based web application that allows users to search for medicines, add them to the cart, provide patient details, and place an order. The project implements a multi-step flow, starting from medicine search to order placement.

Flow of the project:- 

- Search for medicines by name, content, or GTIN number.
- Add selected medicines to the cart.
- Provide patient information for order processing.
- Place orders for delivery or pickup, with address and location details.
- Integration with a backend API for fetching medicine data and placing orders.


Before running the project, ensure you have the following installed:

-    Node.js(version 14 or higher)
-    Angular CLI (version 12 or higher)
-    npm  

  
Running the Application

Once the dependencies are installed and the API key is configured, you can start the application:
Development server
    ng serve
    Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.

Key Components

- DashboardComponent: Implements the medicine search feature.
- checkoutComponent**: Manages the cart functionality.
- PatientFormComponent**: Collects patient details for the order.
- place-orderComponent**: Handles the final step of placing the order.

API Integration

The app communicates with a backend API for medicine data, cart operations, patient management, and order placement. Ensure that your backend API is up and running for the app to function correctly.

![Screenshot (130)](https://github.com/user-attachments/assets/d197ebec-defc-4e95-b677-0bac2dd78146)
![Screenshot (131)](https://github.com/user-attachments/assets/e69a34f0-4d78-4b5c-b1d3-c0ae2a688b14)
![Screenshot (132)](https://github.com/user-attachments/assets/419bfb8b-b54e-486e-bfae-7a9bd9ac0fc3)
![Screenshot (133)](https://github.com/user-attachments/assets/6f8953ad-a57f-43cd-84cb-634e5fdb5318)
![Screenshot (134)](https://github.com/user-attachments/assets/3da26f66-d421-4464-9e2b-200e1602269d)










     
