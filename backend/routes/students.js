  const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find().then(students => res.json(students)).catch(err => res.json("Error finding Students: "+ err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const birthday = Date.parse(req.body.birthday);
  const email = req.body.email;
  const phone = req.body.phone;
  const major = req.body.major;

  const newStudent = new Student({name, birthday, email, phone, major});

  newStudent.save().then(() => res.json('Student added!')).catch(err => res.status(400).json('Error adding the Student: ' + err));
});

router.route('/:id').get((req, res) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.email = req.body.email;
      student.name = req.body.name;
      student.phone = req.body.phone;
      student.major = req.body.major;
      student.birthday = Date.parse(req.body.birthday);

      student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;