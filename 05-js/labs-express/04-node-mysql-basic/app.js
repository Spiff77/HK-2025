const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Connect to database 'user' (id, username, nationality)

// Should return the current user object
app.get("/users", (req, res) => {
  // TODO: Return the user object
});

// Should return the current user object
app.get("/users/:id", (req, res) => {
  // TODO: Return the user object
});

// Should replace the user with data from req.body
app.post("/users", (req, res) => {
  // TODO: Replace the user object
});

// Should do the same as POST (full replace)
app.put("/users/:id", (req, res) => {
  // TODO: Replace the user object
});

// Should update only the fields provided in req.body
app.patch("/users/:id", (req, res) => {
  // TODO: Partially update the user object
});

// Should clear the user (set to null or empty object)
app.delete("/users/:id", (req, res) => {
  // TODO: Clear the user object
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
