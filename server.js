const path = require("path")
const dotenv = require("dotenv")
const colors = require("colors")
const xss = require("xss-clean")

const connectDB = require("./config/db")
const { createServer } = require("./utils/serverUtils")

// Load env vars
dotenv.config({ path: "./config/config.env" })
const app = createServer()

const PORT = 5000

const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
  // Connect to database
  await connectDB()
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1));
})
