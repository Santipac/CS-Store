/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import mercadopago from "mercadopago";
import type { NextApiRequest, NextApiResponse } from "next";

mercadopago.configure({
  access_token: env.MP_ACCESS_TOKEN,
});

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const orderId = query.order_id as string;
  const topic = query.topic || query.type;

  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data_id"];
      const payment = await mercadopago.payment.findById(Number(paymentId));
      const paymentStatus = payment.body.status; // approved - failure
      if (paymentStatus === "approved") {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
          },
        });
      }
      //   return res.json({ status: paymentStatus });
    }
  } catch (error) {
    res.send(error);
  }
};

export default handle;
