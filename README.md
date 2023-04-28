# Getting Started with MERN App
This is a basic application that performs CRUD (Create, Update and Delete) operations. It is implemnted in MERN stack, using React for frontend, express.js for api and Node.js with mongoDB for backend.

## Steps to install the setup and run the application.
- Download or clonet this github repository.
- Make sure to turn on the connection in MongoDB Compass.
- Do the following to install all the dependencies.
    - Run a command 'npm install'.
    - Move to the backend folder.
    - Run the same command again.
- Split the terminal.
- Move to the backend folder and run 'npx nodemon' on one terminal.
- Run 'npm run start' on other terminal {it should open the browser directly or type 'localhost:5000' on browser.

## Features and Disclaimer
- This application create a new student.
- You can update any student details.
- You can check the list of all the students.
- You can delete any student.
- This is a basic application and you can get tutorials related to such applications.

## REST API
Following will be your APIs routes created with Express.js, MongoDB and Node.js.
- GET	http://localhost:4000/students
- POST	/students/create-student
- GET	/students/edit-student/id
- PUT	/students/update-student/id
- DELETE	/students/delete-student/id
