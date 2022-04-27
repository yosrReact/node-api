const mongoose = require("mongoose")

const connectDB = async () => {
  // const url='mongodb+srv://yosr:yosr@cluster0.6kres.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  //  const url =
  //    "mongodb+srv://yosr:yosr@cluster0.hfl1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  // const url = "mongodb://softprecision.website:27017/test"
  const url = "mongodb://citizix:S3cret@mongodb:27017/test"
  const conn = await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB
