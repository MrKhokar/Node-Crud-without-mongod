const express = require("express");
const router = express.Router();
const moment = require("moment");
const Joi = require("joi");

const posts = [
  {
    id: 1,
    date: "2017-08-02",
    author: "Pratap",
    title: "Doctor",
    discription: "Cardiologist",
    imageurl: ""
  },
  {
    id: 2,
    date: "2017-09-06",
    author: "Santosh",
    title: "Teacher",
    discription: "High School teacher",
    imageurl: ""
  },
  {
    id: 3,
    date: "2014-05-07",
    author: "Raju",
    title: "Engineer",
    discription: "Civil Engineer",
    imageurl: ""
  },
  {
    id: 4,
    date: "2015-10-22",
    author: "Deepak",
    title: "Doctor",
    discription: "Audiologist",
    imageurl: ""
  },
  {
    id: 5,
    date: "2020-01-15",
    author: "Shubham",
    title: "Teacher",
    discription: "Primary School",
    imageurl: ""
  },
  {
    id: 6,
    date: "2012-04-02",
    author: "Monish",
    title: "Engineer",
    discription: "Computer Engineer",
    imageurl: ""
  }
];
const schema = Joi.object({
  author: Joi.string().min(3).required(),
  title: Joi.string().min(3).required(),
  discription: Joi.string().min(3).required()
});
// let value = "author" || "title" || "date";

let dateString = moment(new Date()).format("YYYY-MM-DD");

router.get("/search/:author", (req, res) => {
  const post = posts.find((c) => c.author === req.params.author);
  if (!post) return res.status(404).send("Id not found");
  res.send(post);
});
router.get("/search/:date", (req, res) => {
  const post = posts.find((c) => c.date === req.params.date);
  if (!post) return res.status(404).send("Id not found");
  res.send(post);
});
router.get("/search/:title", (req, res) => {
  const post = posts.find((c) => c.title === req.params.title);
  if (!post) return res.status(404).send("Id not found");
  res.send(post);
});

router.get("/", (req, res) => {
  res.send(posts);
});

router.post("/", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const post = {
    id: posts.length + 1,
    date: dateString,
    author: req.body.author,
    title: req.body.title,
    discription: req.body.discription,
    imageurl: req.body.imageurl || ""
  };
  posts.push(post);
  res.send(post);
});

router.get("/:id", (req, res) => {
  const post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Id not found");
  res.send(post);
});
router.put("/:id", (req, res) => {
  //Lokking for the id
  let post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Id not Found");
  res.send(post);

  //Validating the values
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  post.author = req.body.author;
  post.title = req.body.title;
  post.discription = req.body.discription;
  res.send(post);
});
router.delete("/:id", (req, res) => {
  let post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Id not Found");
  const index = posts.indexOf(post);
  posts.splice(index, 1);
  res.send(post);
});
module.exports = router;
