const router = require('express').Router();
let Mark = require('../models/mark.model');

router.route('/').get((req, res) => {
    Mark.find().then(marks => res.json(marks)).catch(err => res.json("Error finding Majors: "+ err));
});

router.route('/add').post((req, res) => {
  const student = req.body.student;
  const subject = req.body.subject;
  const mark = Number(req.body.mark);

  const newMark = new Mark({student, subject, mark});

  newMark.save().then(() => res.json('Mark added!')).catch(err => res.status(400).json('Error adding the Mark: ' + err));
});

module.exports = router;