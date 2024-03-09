# Express Todo API

This is a simple Express.js API for managing a todo list. It uses Microsoft SQL Server as the database and provides CRUD (Create, Read, Update, Delete) operations for todo items.

## Getting Started

To get started, clone the repository and install the dependencies.
git clone https://github.com/kemboi590/Express-API.git
cd Express-API
npm install


## API Endpoints

The API provides the following endpoints:

- POST /todo: Create a new todo item. The request body should be a JSON object with title and description properties.
- GET /todo: Get a list of all todo items.
- PUT /todo/:id: Update a todo item. The :id URL parameter should be the ID of the todo item to update. The request body should be a JSON object with the new title and/or description.
- DELETE /todo/:id: Delete a todo item. The :id URL parameter should be the ID of the todo item to delete.
