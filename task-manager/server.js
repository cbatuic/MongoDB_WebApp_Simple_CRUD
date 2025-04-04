const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks"); // Import routes
const userRoutes = require("./routes/users");
const cors = require("cors");

const app = express(); // Initialize app (must come before `app.use`)
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from your frontend's origin


// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error(err));

mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


app.use("/tasks", taskRoutes); // Use routes AFTER `app` is initialized
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
