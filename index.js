const Express = require("express");
const app = Express();
const user = {
  id: 1,
  name: "Pratap",
  designation: "developer",
  add: "bhopal",
  contact: "1234567890",
  company: "XYZ",
  country: "India"
};
const about = {
  name: "abc",
  contact: "7894561230",
  add: "bhopal"
};
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/user", (req, res) => {
  res.send(user);
});
app.get("/aboutus", (req, res) => {
  res.send(about);
});
app.get("/user/:name/:add/:location", (req, res) => {
  res.send(req.params );
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}...`);
});
