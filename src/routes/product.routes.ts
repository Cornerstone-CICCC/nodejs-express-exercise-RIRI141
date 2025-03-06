import { Request, Response, Router } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";
const productRouter = Router();

const products: Product[] = [
  {
    id: uuidv4(),
    product_name: "PS5",
    product_description: "You can play a lot of games",
    product_price: 10000,
  },
  {
    id: uuidv4(),
    product_name: "The moon",
    product_description: "It always above us",
    product_price: 100000000000000,
  },
];

productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});
productRouter.post("/", (req: Request, res: Response) => {
  const newProduct: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  res.status(200).json(product);
});
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
    const { id } = req.params;
    const foundIndex = products.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
      res.status(404).send("Product not found");
      return;
    }
    const updatedProduct: Product = {
      ...products[foundIndex],
      product_name: req.body.product_name ?? products[foundIndex].product_name,
      product_description:
        req.body.product_description ??
        products[foundIndex].product_description,
      product_price:
        req.body.product_price ?? products[foundIndex].product_price,
    }
    products[foundIndex] = updatedProduct
    res.status(200).json(updatedProduct)
  }
);
productRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundIndex = products.findIndex(product => product.id === id)
    if (foundIndex === -1) {
      res.status(404).send("Product not found")
      return
    }
    products.splice(foundIndex, 1)
    res.status(200).send("Product was deleted!")
  })

export default productRouter;
