import _stripe from "stripe";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
export default stripe;
