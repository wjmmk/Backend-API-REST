
const express = require("express"); 
const bodyParser = require("body-parser");// Modulo que maneja las peticiones HTTP en formato JSON
const apicache = require("apicache");// Import cache module
// Import routes from v1 folder
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");

// Import la implementacion de la documentacion de Swagger
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger.js");

const app = express(); 
const cache = apicache.middleware;// Middleware para cachear las peticiones
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cache("1 hour"));// Cachear las peticiones

// Add routes from v1 folder to the app
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/records", v1RecordRouter);
app.use("/api/v1/members", v1MemberRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
    // Add Swagger Docs to the app
    V1SwaggerDocs(app, PORT);
});