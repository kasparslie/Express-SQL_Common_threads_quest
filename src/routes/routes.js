const express = require('express')
const Router = express.Router()
const connection = require('../config')
const bodyParser = require('body-parser')
Router.use(bodyParser.urlencoded({ extended: true }))
const cors = require('cors');
Router.use(cors())

Router.get("/", (req, res) => {
    connection.query(
      "SELECT * from Characters", 
      (err, results) => {
        if (err) {  
          console.log(err);
          res.status(500).send("Error retrieving data");
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  
  Router.get("/filter/contains", (req, res) => {
    connection.query(
      'SELECT * from Characters where CharacterName like "%man%"',
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requested data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });

  Router.get("/filter/startswith", (req, res) => {
    connection.query(
      'select * from Characters where CharacterName like "P%"',
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requested data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });

  Router.get("/filter/greater", (req, res) => {
    connection.query(
      'SELECT * from Characters where ProductBornDate > "2010-10-18"',
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requested data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });

  Router.get("/sort/asc", (req, res) => {
    connection.query(
      "SELECT * from Characters order by CharacterName asc",
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requested data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });
  Router.get("/sort/desc", (req, res) => {
    connection.query(
      "SELECT * from Characters order by CharacterName desc",
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requested data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });
  Router.post("/add", (req, res) => {
    const { CharacterName, ProductBornDate, Age, IsVillan} = req.body;
    connection.query(
      "INSERT INTO Characters(CharacterName, ProductBornDate, Age, IsVillan) VALUES(?, ?, ?, ?)",
        [CharacterName, ProductBornDate, Age, IsVillan],
      (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error saving a character");
            } else {
              res.status(200).send("Successfully saved");
            }
          }
       );
  });
  Router.put("/modify/:id", (req, res) => {
    const idChar= req.params.id;
    const newChar = req.body;
    connection.query(
      "UPDATE Characters SET ? WHERE id = ?",
      [newChar, idChar],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating a Characters");
        } else {
          res.status(200).send("Update has been successful");
        }
      }
    );
  });

  Router.put("/modify/toogle/:id", (req, res) => {
    const idChar= req.params.id;
    connection.query(
      "UPDATE Characters SET IsVillan = !IsVillan WHERE id = ?",
      [idChar],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating a Characters");
        } else {
          res.status(200).send("Update has been successful");
        }
      }
    );
  });
  
  Router.delete("/delete/IsVillan", (req, res) => {
    connection.query("delete from Characters where IsVillan=false", (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting an Character");
      } else {
        res.status(200).send("Data from Character deleted!");
      }
    })
  });

  Router.delete("/delete/washallcharactersdownthesewigedrainintothecesspitanddeleteallthedatainsametime", (req, res) => {
    connection.query("delete from Characters", (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting an Character");
      } else {
        res.status(200).send("Data from Character washed down the drain!");
      }
    })
  });

  
  module.exports=Router;