import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});
