const express = require("express");
const cors = require("cors");

const Model = require("./Model");
const app = express();

app.use(express.json());
app.use(cors());

// setInterval(() => {
//   console.log("==========================\n", Model.repositories, "\n==========================")
// }, 5000)

app.get("/repositories", (req, res) => {
  return res.json({ data: [...Model.repositories] })
});

app.get("/repositories/:id", (req, res) => {
  let { id } = req.params

  let data = Model.getDataById(id)
  if(!data) {
    return res.status(400).json({ message: 'data-not-found' })
  }

  return res.json({ message: 'success', data })
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  let data = Model.add({ title, url, techs, likes: 0 })
  return res.json({ message: 'success', data })
});

app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body
  const { id } = req.params

  let data = Model.update(id, { title, url, techs })
  if(!data) {
    return res.status(400).json({ message: 'data-not-found' })
  }

  return res.json({ message: 'success', data })
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  let status = Model.delete(id)
  if(!status) {
    return res.status(400).json({ message: 'data-not-found' })
  }

  return res.status(204).json()
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params

  let data = Model.getDataById(id)
  if (!data) {
    return res.status(400).json({ message: 'data-not-found' })
  }
  data = { ...data, likes: data.likes+1 }

  let a = Model.update(data.id, data)
  return res.json({ message: 'like-success' })
});

app.post("/repositories/:id/dislike", (req, res) => {
  const { id } = req.params

  let data = Model.getDataById(id)
  if(!data) {
    return res.status(400).json({ message: 'data-not-found' })
  }

  let likes = data.likes-1
  if(likes < 0) {
    likes = 0
  }

  data = { ...data, likes }

  Model.update(data.id, data)
  return res.json({ message: 'dislike-success' })
});

module.exports = app;
