import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.ORIGIN || 'http://localhost:5173' ,  // React app is assumed to run on this port
  methods: 'GET, POST, PUT, DELETE',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// Define the path to your client build folder
const _dirname = path.resolve();



// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(_dirname, 'client', 'dist')));

// Catch-all route to serve index.html for frontend React app (This should be last)
app.use((req, res, next) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})