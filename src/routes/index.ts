import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import cartRoutes from "../modules/cart/cart.routes";
import categoryRoutes from "../modules/categories/category.routes";
import orderRoutes from "../modules/orders/order.routes";
import paymentRoutes from "../modules/payments/payment.routes";
import productRoutes from "../modules/products/product.routes";
import userRoutes from "../modules/users/user.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy"
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/payments", paymentRoutes);
router.use("/categories", categoryRoutes);

export default router;
