import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

import Beauty from "./Beauty.js";
import Wishlist from "./models/wishlistModel.js";
import Product from "./models/productModel.js";
import Bag from "./models/bagModel.js";
import Electronic from "./models/electronicModel.js";
import Fashion from "./models/fashionModel.js";
import Footwear from "./models/footwearModel.js";
import Grocery from "./models/grocerieModel.js";
import Cart from "./models/cartModel.js";
import Recommendation from "./models/recommendationModel.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const _dirname = path.resolve();
const app = express();
/////////////////////////////////////////////////////////////////////////////////////////////////
// app.use(cors(
// {
// origin: ["https://my-ecom-six.vercel.app"],
// methods: ["POST", "GET"],
// credentials: true
// }
// ));


// app.use(cors({
//   origin: [
//     "https://my-ecom-six.vercel.app",
//     // "http://localhost:3000"   // add this for local dev
//     "https://my-ecom-3rr8skcaz-shrinath-takote07s-projects.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());

// app.options("*", cors());




// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGODBURI);
    await mongoose.connect(process.env.MONGODBURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
connectDB();

// //////////////////////////////////////////////////////////////

// app.get("/",(req,res)=>{
//   app.res("HI");})
// //////////////////////////////////////////////////////////////////////

// --- Wishlist Routes ---

app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (error) {
    console.error("❌ Error fetching wishlists:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/wishlist/:id", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (wishlist) {
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ error: "wishlist not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/wishlist", async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      category,
      image,
      originalPrice,
      discount,
      rating,
      reviewCount,
      isNew,
      tags,
      description,
    } = req.body;

    if (!id || !name || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: id, name, category" });
    }

    const existing = await Wishlist.findOne({ id });
    if (existing) {
      return res.status(409).json({ error: "Item already in wishlist" });
    }

    let priceValue = price;
    if (typeof priceValue === "string") {
      priceValue = parseFloat(priceValue.replace(/[^0-9.-]+/g, ""));
    }

    let originalPriceValue = originalPrice;
    if (typeof originalPriceValue === "string") {
      originalPriceValue = parseFloat(
        originalPriceValue.replace(/[^0-9.-]+/g, "")
      );
    }

    const newItem = new Wishlist({
      id,
      name,
      price: priceValue || 0,
      category,
      image: image || "",
      originalPrice: originalPriceValue || priceValue || 0,
      rating: rating || 0,
      reviewCount: reviewCount || 0,
      isNew: isNew || false,
      discount: discount || "",
      tags: tags || [],
      description: description || "",
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item successfully added to wishlist!", item: newItem });
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add to wishlist", details: error.message });
  }
});

app.delete("/api/wishlist/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const deleted = await Wishlist.findOneAndDelete({ id: itemId });

    if (deleted) {
      res.status(200).json({ message: "Removed from wishlist", data: deleted });
    } else {
      res.status(404).json({ error: "Item not found in wishlist" });
    }
  } catch (error) {
    console.error("❌ Error removing from wishlist:", error.message);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
});

// --- Product Routes ---

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id, 10) });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching product:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Category Routes ---

// Bags
app.get("/api/Bags", async (req, res) => {
  try {
    const bags = await Bag.find();
    res.status(200).json(bags);
  } catch (error) {
    console.error("❌ Error fetching Bag:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/Bags/:id", async (req, res) => {
  try {
    const bag = await Bag.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (bag) {
      res.status(200).json(bag);
    } else {
      res.status(404).json({ error: "bag not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching electronic:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Electronics
app.get("/api/electronics", async (req, res) => {
  try {
    const electronics = await Electronic.find();
    res.status(200).json(electronics);
  } catch (error) {
    console.error("❌ Error fetching electronic:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/electronics/:id", async (req, res) => {
  try {
    const electronic = await Electronic.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (electronic) {
      res.status(200).json(electronic);
    } else {
      res.status(404).json({ error: "electronic not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching electronic:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Fashion
app.get("/api/Fashions", async (req, res) => {
  try {
    const fashions = await Fashion.find();
    res.status(200).json(fashions);
  } catch (error) {
    console.error("❌ Error fetching Bag:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/Fashions/:id", async (req, res) => {
  try {
    const fashion = await Fashion.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (fashion) {
      res.status(200).json(fashion);
    } else {
      res.status(404).json({ error: "fashion not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching fashion:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Footwear
app.get("/api/footwears", async (req, res) => {
  try {
    const footwears = await Footwear.find();
    res.status(200).json(footwears);
  } catch (error) {
    console.error("❌ Error fetching footwear:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/footwears/:id", async (req, res) => {
  try {
    const footwear = await Footwear.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (footwear) {
      res.status(200).json(footwear);
    } else {
      res.status(404).json({ error: "Footwear not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching Footwear:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Groceries
app.get("/api/Groceries", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json(groceries);
  } catch (error) {
    console.error("❌ Error fetching Bag:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/Groceries/:id", async (req, res) => {
  try {
    const grocerie = await Grocery.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (grocerie) {
      res.status(200).json(grocerie);
    } else {
      res.status(404).json({ error: "grocerie not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching grocerie:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Beauty
app.get("/api/Beauty", (req, res) => {
  res.status(200).json(Beauty);
});

app.get("/api/Beauty/:id", (req, res) => {
  const BeautyId = parseInt(req.params.id, 10);
  const beautyItem = Beauty.find((item) => item.id === BeautyId);

  if (beautyItem) {
    res.status(200).json(beautyItem);
  } else {
    res.status(404).json({ error: "Beauty not found" });
  }
});

// --- Cart Routes ---

app.use("/api/carts", cartRoutes);

app.get("/api/carts", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    console.error("❌ Error fetching carts:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/carts/:id", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching cart item:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("❌ Error fetching cart items:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/cart/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ id: parseInt(req.params.id, 10) });
    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching cart item:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    const { id, name, price, category, image, description } = req.body;

    if (!id || !name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await Cart.findOne({ id: parseInt(id, 10) });
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (req.body.quantity || 1);
      const updated = await existing.save();
      return res
        .status(200)
        .json({ message: "Quantity updated", item: updated });
    }

    const newItem = new Cart({
      id: parseInt(id, 10),
      name,
      price: parseFloat(price),
      quantity: req.body.quantity || 1,
      category,
      image: image || "",
      description: description || "",
    });

    await newItem.save();
    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add to cart", details: error.message });
  }
});

app.put("/api/cart/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    if (quantity === 0) {
      const deleted = await Cart.findOneAndDelete({ id: itemId });
      if (deleted) {
        return res.status(200).json({ message: "Item removed", data: deleted });
      } else {
        return res.status(404).json({ error: "Item not found" });
      }
    }

    const updated = await Cart.findOneAndUpdate(
      { id: itemId },
      { quantity: quantity },
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: "Quantity updated", data: updated });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("❌ Error updating cart:", error.message);
    res
      .status(500)
      .json({ error: "Failed to update cart", details: error.message });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    const deleted = await Cart.findOneAndDelete({ id: itemId });

    if (deleted) {
      res
        .status(200)
        .json({ message: "Item removed from cart", data: deleted });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("❌ Error deleting from cart:", error.message);
    res
      .status(500)
      .json({ error: "Failed to delete from cart", details: error.message });
  }
});

app.post("/api/cart/seed/data", async (req, res) => {
  try {
    await Cart.deleteMany({});

    const testItems = [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        quantity: 1,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        description: "High-quality wireless headphones with noise cancellation",
      },
      {
        id: 2,
        name: "USB-C Cable",
        price: 12.99,
        quantity: 2,
        category: "electronics",
        image: "https://via.placeholder.com/200?text=USB+Cable",
        description: "Durable USB-C charging cable",
      },
      {
        id: 3,
        name: "Phone Case",
        price: 19.99,
        quantity: 1,
        category: "accessories",
        image: "https://via.placeholder.com/200?text=Phone+Case",
        description: "Protective phone case with shock absorption",
      },
    ];

    const saved = await Cart.insertMany(testItems);
    res.status(201).json({ message: "Cart seeded successfully", items: saved });
  } catch (error) {
    console.error("❌ Error seeding cart:", error.message);
    res
      .status(500)
      .json({ error: "Failed to seed cart", details: error.message });
  }
});

// --- Recommendation Routes ---

app.get("/api/recommendations", async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    console.error("❌ Error fetching Recommendation:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/recommendations/:id", async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({
      id: parseInt(req.params.id, 10),
    });

    if (recommendation) {
      res.status(200).json(recommendation);
    } else {
      res.status(404).json({ error: "recommendation not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching recommendation:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Serve Frontend ---

// app.use(express.static(path.join(_dirname, "/my-project/dist")));

// app.get(/(.*)/, (_, res) => {
//   res.sendFile(path.resolve(_dirname, "my-project", "dist", "index.html"));
// });


app.use(express.static(path.join(_dirname, "/my-project/dist")));

// Catch-all route to serve index.html (SPA support)
// Use regex to avoid "Missing parameter name" error with newer path-to-regexp versions
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "my-project", "dist", "index.html"))
});

// Start server
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
