# Angular Video Upload Application
## Table of Contents
- Introduction
- Features
- Technologies Used
- Prerequisites
- Configuration
- Running the Application
- Usage
- Contributing

## Introduction
This is a web application built with Angular 17, leveraging NGRX for state management. The application allows users to login, view videos, and upload videos. The backend is powered by an Express server, with PostgreSQL as the persistent storage.

## Features
- User Authentication: Secure login system with authentication guards and interceptors.
- Video Management: Browse and view a collection of videos.
- Video Upload: Upload new videos to the application.
- State Management: Efficient state management using NGRX.
- Backend Integration: Communicates with an Express server and stores data in a PostgreSQL database.

## Technologies Used
- Frontend: Angular 17, Angular Material, NGRX
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Other: RxJS, TypeScript

## Prerequisites
- Node.js: v14.x or higher
- Angular CLI: v17.x or higher
- PostgreSQL: v12.x or higher

## Usage

### Authentication
- Login: Navigate to /login to access the login page.
- Protected Routes: Access /videos and /upload routes after authentication.

### Video Management
- View Videos: Go to /videos to browse and watch videos.
- Upload Videos: Use the /upload route to upload new videos.

## Contributing
Contributions are welcome!