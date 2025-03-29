import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/homepage.tsx"),
  route("/original", "routes/index.tsx"),
  route("/shop", "routes/shop.tsx"),
  route("/cart", "routes/cart.tsx"),
  route("/product/:id", "routes/product/$id.tsx"),
] satisfies RouteConfig;
