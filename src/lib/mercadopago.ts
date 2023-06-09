import { env } from "@/env.mjs";
import mp from "mercadopago";

const mercadopago = mp.configure({
  access_token: env.MP_ACCESS_TOKEN,
});

export default mercadopago;
