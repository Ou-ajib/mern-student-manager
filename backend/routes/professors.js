const router = require('express').Router();
let Professor = require('../models/professor.model');

router.route('/').get((req, res) => {
    Professor.find().then(profs => res.json(profs)).catch(err => res.json("Error finding Professors: "+ err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const birthday = Date.parse(req.body.birthday);
  const email = req.body.email;
  const phone = req.body.phone;

  const newProf = new Professor({name, birthday, email, phone});

  newProf.save().then(() => res.json('Professor added!')).catch(err => res.status(400).json('Error adding the Professor: ' + err));
});

router.route('/:id').get((req, res) => {
  Professor.findById(req.params.id)
    .then(prof => res.json(prof))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Professor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Professor deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Professor.findById(req.params.id)
    .then(porf => {
      porf.email = req.body.email;
      porf.name = req.body.name;
      porf.phone = req.body.phone;
      porf.birthday = Date.parse(req.body.birthday);

      porf.save()
        .then(() => res.json('Professor updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;