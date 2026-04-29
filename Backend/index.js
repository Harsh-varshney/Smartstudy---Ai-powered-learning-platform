require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const bodyParser = require("body-parser");
const contactRoute = require("./routes/contact");
const cors = require("cors");

app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
app.use(express.json());

app.use(bodyParser.json());


const userRoutes = require("./routes/userRoute");
const noteRoutes = require("./routes/noteRoute");
const taskRoutes = require("./routes/taskRoutes");
const paperRoute = require("./routes/paperRoute");
const aiRoutes = require("./routes/aiRoutes");
const quizRoutes = require("./routes/quizRoutes");

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
main()
.then(() => console.log("db connect successfully"))
.catch((err) => console.log(err));


app.get("/",(req,res) => {
    console.log("Smart study request");
    res.send("working");
})

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/papers", paperRoute);
app.use("/api/ai", aiRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/contact", contactRoute);



// async function createUser(){
//     const user = await User.create({
//         name : "harsh",
//         email : "harsh.varshney@gmail.com",
//         password : "123"
//     }) 

//     console.log("User Created Successfully");
//     console.log(user);
// }

// createUser();//one time

// // User Routes
// app.get("/users", userRoutes.getUsers);
// app.post("/users", userRoutes.createUser);
// app.post("/login", userRoutes.loginUser);


// // Note Routes
// app.post("/notes", noteRoutes.createNote);
// app.get("/notes", noteRoutes.getNotes);
// app.get("/notes/:id", noteRoutes.getSingleNote);
// app.put("/notes/:id", noteRoutes.updateNote);
// app.delete("/notes/:id",noteRoutes.deleteNote);
// app.patch("/notes/:id/pin", noteRoutes.togglePinNote);

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`server listen at port : ${port}`);
})