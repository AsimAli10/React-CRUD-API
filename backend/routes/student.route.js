let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Student Model
let studentSchema = require('../Models/Student');
// CREATE Student
router.route('/create-student').post((req, res, next) => {
  const data = studentSchema.create(req.body)
    .then(data => {
      res.json(data)
    }
    ).catch(next);
    
})
// READ Students
router.route('/').get(async (req, res) => {
  const data = await studentSchema.find();
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})
/// READ student using email
router.route('/get-student-byemail').get(async (req, res) => {
  console.log(req.query.email);
  const data = await studentSchema.find({"email": req.query.email});
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})

// READ student using name
router.route('/get-student-byname').get(async (req, res) => {
  const data = await studentSchema.find({"name": req.query.name});
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})

// Get Single Student
router.route('/edit-student/:id').get(async (req, res) => {
  const data = await studentSchema.findById(req.params.id);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})

// Update Student
router.route('/update-student/:id').put(async (req, res, next) => {
  const data = await studentSchema.findByIdAndUpdate(req.params.id, req.body);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})
// Delete Student
router.route('/delete-student/:id').delete(async (req, res, next) => {
  const data = await studentSchema.findByIdAndRemove(req.params.id);
  if (!data) return res.status(404).send('No data found.');
  res.json(data);
})
module.exports = router;