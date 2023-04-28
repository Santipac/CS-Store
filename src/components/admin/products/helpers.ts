/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type React from "react";
import { api } from "@/utils/api";
import { MAX_FILE_SIZE } from "@/constants/config";

interface Input {
  file: undefined | File;
}

interface Props {
  input: Input;
  setInput: React.Dispatch<React.SetStateAction<Input>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useFileSelected = ({ input, setInput, setError }: Props) => {
  const { mutateAsync: createPresignedUrl } =
    api.product.createPresignedUrl.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No file selected");
    if (e.target.files[0].size > MAX_FILE_SIZE) return setError("File too big");
    setInput((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  const handleImageUpload = async () => {
    const { file } = input;
    if (!file) return;
    const { fields, key, url } = await createPresignedUrl({
      fileType: file.type,
    });

    const data = {
      ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    await fetch(url, {
      method: "POST",
      body: formData,
    });
    return key;
  };

  return {
    handleImageUpload,
    handleFileSelect,
  };
};
