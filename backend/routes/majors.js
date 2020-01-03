const router = require('express').Router();
let Major = require('../models/major.model');

router.route('/').get((req, res) => {
    Major.find().then(majors => res.json(majors)).catch(err => res.json("Error finding Majors: "+ err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const subjects = req.body.subjects;

  const newMajor = new Major({name, subjects});

  newMajor.save().then(() => res.json('Major added!')).catch(err => res.status(400).json('Error adding the Major: ' + err));
});


router.route('/:id').get((req, res) => {
  Major.findById(req.params.id)
    .then(major => res.json(major))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;