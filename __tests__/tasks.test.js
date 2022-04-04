const supertest = require("supertest")
const { createServer } = require("../utils/serverUtils")
const app = createServer()

describe("tasks", () => {
  test("should get all tasks", async () => {
    await supertest(app).get("/api/v1/tasks")
  })
})
