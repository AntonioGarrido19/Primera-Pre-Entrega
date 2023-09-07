import { Router } from "express";
import { productsMongo } from "../dao/managers/products/ProductsMongo.js";
import { cartsMongo } from "../dao/managers/carts/CartsMongo.js"
import { cartsModel } from "../db/models/carts-model.js";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productsMongo.findAll(req.query);
    const payloadArray = products.info.payload;
    const payloadArrayMap = payloadArray.map((e) => ({
      _id: e._id,
      title: e.title,
      description: e.description,
      price: e.price,
      thumbnail: e.thumbnail,
      code: e.code,
      stock: e.stock,
    }));
    res.render("home", { payloadArrayMap });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/product-view/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsMongo.findById(id);
        console.log(product);
        if (!product) {
            return res.status(400).json({ message: 'Invalid ID' });
        } else {
            res.render("productView", product)
            };
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

// router.get("/carts", async (req, res) => {
//   try {
//     const carts = await cartsMongo.findAll();
//     console.log(carts);
//     if (carts.length) {
//       res.render(200).json("cart", {carts});
//     } else {
//       res.status(200).json({ message: "No carts found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    
    const cart = await cartsModel.findById(cid).populate("products.id").lean()
    console.log(cart);
    res.render("cart", { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el carrito" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});


export default router;
