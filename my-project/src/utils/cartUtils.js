/**
 * Cart Utilities - Functions for cart operations
 */

export const addToCart = async (product) => {
  try {
    const response = await fetch("https://my-ecommm.vercel.app/api/Cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        quantity: product.quantity || 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Item added to cart:", data);
      return {
        success: true,
        message: "Item added to cart! ✅",
        item: data.item || product,
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Failed to add item to cart",
      };
    }
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    return {
      success: false,
      message: "Failed to add item to cart",
    };
  }
};

export const getCartItems = async () => {
  try {
    const response = await fetch("https://my-ecommm.vercel.app/api/Cart");
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Cart items fetched:", data);
      return data;
    } else {
      console.error("❌ Error fetching cart");
      return [];
    }
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    return [];
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`https://my-ecommm.vercel.app/api/Cart/${itemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("✅ Item removed from cart");
      return {
        success: true,
        message: "Item removed from cart",
      };
    } else {
      return {
        success: false,
        message: "Failed to remove item from cart",
      };
    }
  } catch (err) {
    console.error("❌ Error removing from cart:", err);
    return {
      success: false,
      message: "Failed to remove item from cart",
    };
  }
};

export const updateCartItemQuantity = async (itemId, quantity) => {
  try {
    const response = await fetch(`https://my-ecommm.vercel.app/api/Cart/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Cart item quantity updated:", data);
      return {
        success: true,
        message: "Quantity updated",
        item: data.item,
      };
    } else {
      return {
        success: false,
        message: "Failed to update quantity",
      };
    }
  } catch (err) {
    console.error("❌ Error updating quantity:", err);
    return {
      success: false,
      message: "Failed to update quantity",
    };
  }
};

export const seedCartData = async () => {
  try {
    const response = await fetch("https://my-ecommm.vercel.app/api/Cart/seed/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Test cart data seeded:", data);
      return {
        success: true,
        message: "Test data seeded successfully",
        data,
      };
    } else {
      return {
        success: false,
        message: "Failed to seed test data",
      };
    }
  } catch (err) {
    console.error("❌ Error seeding test data:", err);
    return {
      success: false,
      message: "Failed to seed test data",
    };
  }
};
