const express = require("express")
const app = express()
const userRouter = require("./routers/users")
const productRouter = require("./routers/products")

app.use(express.json())

app.use("/users", userRouter)
app.use("/products", productRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000");
})