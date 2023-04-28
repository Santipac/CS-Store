/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { s3 } from "@/lib/s3";
import { MAX_FILE_SIZE } from "@/constants/config";
import { protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";
import { productSchema } from "@/common/validation/product";

export const productRouter = createTRPCRouter({
  createPresignedUrl: protectedProcedure
    .input(z.object({ fileType: z.string() }))
    .mutation(async ({ input }) => {
      const id = nanoid();
      const ex = input.fileType.split("/")[1];
      const key = `${id}.${ex}`;

      const { url, fields } = (await new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Bucket: "cs-store-arg",
            Fields: { key },
            Expires: 60,
            Conditions: [
              ["content-length-range", 0, MAX_FILE_SIZE],
              ["starts-with", "$Content-Type", "image/"],
            ],
          },
          (err, signed) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      })) as any as { url: string; fields: any };
      return { url, fields, key };
    }),
  createProduct: protectedProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const isStatTrak = input.statTrak;

      if (!isStatTrak) {
        const product = await ctx.prisma.product.create({
          data: {
            ...input,
            statTrak: false,
          },
        });
        return product;
      }
      if (isStatTrak === "NO") {
        const product = await ctx.prisma.product.create({
          data: {
            ...input,
            statTrak: false,
          },
        });
        return product;
      }
      if (isStatTrak === "YES") {
        const product = await ctx.prisma.product.create({
          data: {
            ...input,
            statTrak: true,
          },
        });
        return product;
      }
      const product = await ctx.prisma.product.create({
        data: {
          ...input,
          statTrak: false,
        },
      });
      return product;
    }),
  deleteProduct: protectedProcedure
    .input(z.object({ image: z.string(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Delete image from s3
      const { image, id } = input;
      await s3.deleteObject({ Bucket: "cs-store-arg", Key: image }).promise();

      // Delete image from db
      await ctx.prisma.product.delete({ where: { id } });

      return true;
    }),
  deleteImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await s3.deleteObject({ Bucket: "cs-store-arg", Key: input }).promise();
      return true;
    }),
});
