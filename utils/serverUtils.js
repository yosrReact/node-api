const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
const errorHandler = require("../middleware/error")

// Route files

const auth = require("../routes/auth")
const users = require("../routes/users")
const contacts = require("../routes/contacts")
const tasks = require("../routes/tasks")
module.exports.createServer = () => {
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

  app.use(errorHandler)
  return app
}
