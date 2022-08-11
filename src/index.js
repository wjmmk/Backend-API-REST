
const express = require("express"); 
// Modulo que maneja las peticiones HTTP en formato JSON
const bodyParser = require("body-parser");
// Import routes from v1 folder
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Add routes from v1 folder to the app
app.use(bodyParser.json()); // support json encoded bodies
app.use("/api/v1/workouts", v1WorkoutRouter);


app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});