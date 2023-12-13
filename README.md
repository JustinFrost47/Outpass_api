Outpass Backend API Documentation
Overview

This project is a simple API/backend for storing and tracking outpasses. It is released under the GNU General Public License (GPL), allowing others to freely develop upon and contribute to the project.
Setting Up
Requirements

    Node.js
    MongoDB

Installation

    Install Node.js and MongoDB on your system.
    Run the command npm install to install Node dependencies.
    Execute node index.js from the project's root location to start the server.

Project Structure
1. Views

The frontend portion of the API is located in the views folder. Any changes to the frontend should be made here. Certain routes render files from EJS, so refer to index.js code for informed decisions. In the future, this part should be modularized using EJS mate to split the navbar and other partials.
2. Models

This folder contains schemas for MongoDB collections. The main collection, 'student', stores related outpasses in a list of object IDs. The 'outpass' schema is simple, containing reason and roll number, which can be expanded upon if needed.
3. Utilities

This folder includes helper codes that streamline the application:

    appError: Helps create middleware for handling errors.
    asyncWrapper: Handles asynchronous requests properly.

4. index.js

This file contains the main logic of the API.