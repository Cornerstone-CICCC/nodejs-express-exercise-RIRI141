import express from "express"
import productRouter from "./routes/product.routes";
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.json())
app.use("/products", productRouter)

app.use((req, res, next) => {
    res.status(404).send("Cannot find")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})