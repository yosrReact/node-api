const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Route files

const auth = require("./routes/auth")
const users = require("./routes/users")
const contacts = require("./routes/contacts")
const tasks = require("./routes/tasks")

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Sanitize data
app.use(mongoSanitize())

// Enable CORS
app.use(cors())

// Mount routers
app.use("/api/v1/auth", auth)
app.use("/api/v1/users", users)
app.use("/api/v1/contacts", contacts)
app.use("/api/v1/tasks", tasks)
app.get("/", (req, res) => {
  res.send("Hi There")
})
app.use(errorHandler)

const PORT = 5000
// Connect to database
await connectDB()
const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1));
})
