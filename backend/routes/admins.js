  
const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/auth').post((req, res) => {
    const email = req.body.email;
    Admin.find({email: email}).then(admin => res.json(admin)).catch(err => res.json("Error finding !"+ email+ " :" +err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({username, email, password});

  newAdmin.save()
    .then(() => res.json('Admin added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Admin.findById(req.params.id).then(admin => {
    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.password = req.body.password;

    admin.save().then(() => res.json('Admin updated!')).catch(err => res.status(400).json('Error updating Admin: ' + err));
  }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;