Superhero Database CRUD Application
A full-stack web application that allows users to manage a database of superheroes. It supports all CRUD operations (Create, Read, Update, Delete) with images and paginated listing.

# Features

📜 Create, edit, and delete superheroes.

🖼 Add and remove images during creation/editing.

📄 Paginated list of superheroes (5 per page) with nickname and one image.

🔍 View full details of a superhero, including all images and attributes.

# Tech Stack

## Frontend

React

Redux Toolkit

React Router

FormData API

CSS Modules

## Backend

Node.js

Multer (for image upload)

MongoDB (via Mongoose)

Testing
Jest

@reduxjs/toolkit mock store for thunk tests

# Tests

Unit tests written for async Redux operations using redux-mock-store and jest.

Run with:
npm test
