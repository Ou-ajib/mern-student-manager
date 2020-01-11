const router = require('express').Router();
let Mark = require('../models/mark.model');

router.route('/').get((req, res) => {
  Mark.find().then(marks => res.json(marks)).catch(err => res.json("Error finding Marks: "+ err));
});

router.route('/add').post((req, res) => {
  const student = req.body.student;
  const subject = req.body.subject;
  const mark = Number(req.body.mark);

  const newMark = new Mark({student, subject, mark});

  newMark.save().then(() => res.json('Mark added!')).catch(err => res.status(400).json('Error adding the Mark: ' + err));
});

router.route('/edit/:studentID/:subjectID').post((req, res) => {
  const studentID = req.params.studentID;
  const subjectID = req.params.subjectID;

  Mark.findOne({student: studentID, subject: subjectID})
    .then(mark => {
      if(mark != null){
        mark.student = studentID;
        mark.subject = subjectID;
        mark.mark = Number(req.body.mark);
  
        mark.save()
          .then(() => res.json('Mark updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        const student = studentID;
        const subject = subjectID;
        const mark = Number(req.body.mark);

        const newMark = new Mark({student, subject, mark});

        newMark.save().then(() => res.json('Mark added!')).catch(err => res.status(400).json('Error adding the Mark: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;