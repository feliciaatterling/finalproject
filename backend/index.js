const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const fs = require("fs");

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

const port = 8082;
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://localhost:27017";
const dbName = "traveldata";
const client = new MongoClient(url);
const db = client.db(dbName);

// For travel locations

app.get("/listFavorites", async (req, res) => {
  await client.connect();

  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db
    .collection("favorite-locations") // Different locations for all categories?
    .find(query)
    .limit(100)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/listPopular", async (req, res) => {
  await client.connect();

  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db
    .collection("popular-locations")
    .find(query)
    .limit(100)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/listDeals", async (req, res) => {
  await client.connect();

  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db.collection("deals").find(query).limit(100).toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const locationId = Number(req.params.id);
  console.log("Location to find :", locationId);

  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: locationId };

  const results = await db.collection("locations").findOne(query); // Do we need to make a collection with all?

  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

// For guides

app.get("/listGuides", async (req, res) => {
  await client.connect();

  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db
    .collection("guides")
    .find(query)
    .limit(100)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

app.post("/addGuide", async (req, res) => {
  try {
    await client.connect();
    console.log("Add guide");
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const newGuide = {
      id: values[0],
      title: values[1],
      description: values[2],
      category: values[3], // Maybe country or type of vacation
      image: values[4],
    };

    console.log(newGuide);

    const results = await db.collection("guides").insertOne(newGuide);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred: ", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteGuide/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Guide to delete:", id);
    const query = { id: id };

    const guideDeleted = await db.collection("guides").findOne(query);
    if (!guideDeleted) {
      return res.status(404).send({ message: "Guide not found" });
    }
    console.log(guideDeleted);

    const results = await db.collection("guides").deleteOne(query);
    res.status(200).send(guideDeleted);
  } catch (error) {
    console.error("Error deleting guide:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/updateGuide/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Guide to Update :", id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category: req.bady.category,
      image: req.body.imageUrl,
    },
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist

  const guideUpdated = await db.collection("guides").findOne(query);

  const options = {};
  const results = await db
    .collection("guides")
    .updateOne(query, updateData, options);
  if (results.matchedCount === 0) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(200);
  res.send(guideUpdated);
});
