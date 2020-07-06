const Joi = require('joi');
const express = require('express');
const { query } = require('express');
const router = express.Router();
const mdb = require('../../models/db_used').db;
const getDateNow = require('../../models/db_used').GetDateNow;

// Validate
const validate = function(content) {
  const schema = {
    code: Joi.string().min(8).max(8).required(),
    name: Joi.string().required(),
    desc: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Read All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM placecollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Read One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM placecollection WHERE codePC='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Insert
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.name, req.body.desc ]
  ];
  const queryString = 'INSERT INTO placecollection (codePC, namePC, descPC) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Update
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.name, req.body.desc
  ];
  const queryString = `UPDATE placecollection SET 
                      namePC='${values[1]}', 
                      descPC='${values[2]}', 
                      WHERE codePC='${values[0]}'`;
  mdb.update(queryString, function(content) {
    if (content.error == null) {
      res.send(content.data);
    }
    else {
      res.send(content.error);
    }
  });
});

// Router : Delete
router.delete('/:id', (req, res) => {
  const queryString = `DELETE FROM placecollection WHERE codePC='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;