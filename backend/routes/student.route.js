let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
  

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student API',
      version: '1.0.0',
      description: 'API for managing students',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/student.route.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

// Student Model
let studentSchema = require('../Models/Student');
// CREATE Student
/**
 * @swagger
 * /students/create-student:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Created student object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/create-student', (req, res, next) => {
  const data = studentSchema.create(req.body)
    .then(data => {
      res.json(data)
    }
    ).catch(next);
});
// router.route('/create-student').post((req, res, next) => {
//   const data = studentSchema.create(req.body)
//     .then(data => {
//       res.json(data)
//     }
//     ).catch(next);
    
// })
// READ Students
/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  const data = await studentSchema.find();
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
});
// router.route('/').get(async (req, res) => {
//   const data = await studentSchema.find();
//   if (!data) return res.status(404).send('No data found.');
//   res.json(data);
// })
/// READ student using email
/**
 * @swagger
 * /students/get-student-byemail:
 *   get:
 *     summary: Get student by email
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the student
 *     responses:
 *       200:
 *         description: Found student object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-student-byemail', async (req, res) => {
  console.log(req.query.email);
  const data = await studentSchema.find({"email": req.query.email});
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
});

// router.route('/get-student-byemail').get(async (req, res) => {
//   console.log(req.query.email);
//   const data = await studentSchema.find({"email": req.query.email});
//   if (!data) return res.status(404).send('No data found.');
//   res.json(data);
// })

// READ student using name

/**
 * @swagger
 * /students/get-student-byname:
 *   get:
 *     summary: Get student by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name of the student
 *     responses:
 *       200:
 *         description: Found student object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-student-byname', async (req, res) => {
  const data = await studentSchema.find({"name": req.query.name});
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
});
// router.route('/get-student-byname').get(async (req, res) => {
//   const data = await studentSchema.find({"name": req.query.name});
//   if (!data) return res.status(404).send('No data found.');
//   res.json(data);
// })

// Get Single Student
/**
 * @swagger
 * /edit-student/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieve a student by providing their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to retrieve
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Student not found
 */
router.get('/edit-student/:id', async (req, res) => {
  const data = await studentSchema.findById(req.params.id);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})

// Update Student
/**
 * @swagger
 * /update-student/{id}:
 *   put:
 *     summary: Update a student by ID
 *     description: Update a student's information by providing their ID and new data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to update
 *       - in: body
 *         name: body
 *         description: The updated information of the student
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *           required:
 *             - name
 *             - email
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Student not found
 */
router.put('/update-student/:id', async (req, res, next) => {
  const data = await studentSchema.findByIdAndUpdate(req.params.id, req.body);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})
// Delete Student
/**
 * @swagger
 * /delete-student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Delete a student by providing their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Student not found
 */
router.delete('/delete-student/:id', async (req, res, next) => {
  const data = await studentSchema.findByIdAndRemove(req.params.id);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})
module.exports = router;
// Serve Swagger API documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));
