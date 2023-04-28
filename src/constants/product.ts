import type { Option } from "@/interfaces/form";

export const statTrak: Option[] = [
  { value: "yes", description: "Yes" },
  { value: "no", description: "No" },
];
export const wear: Option[] = [
  { value: "fn", description: "Factory New" },
  { value: "mw", description: "Minimal Wear" },
  { value: "ft", description: "Field-Tested" },
  { value: "ww", description: "Well-Worn" },
  { value: "bs", description: "Battle-Scarred" },
];
export const type: Option[] = [
  { value: "knife", description: "Knife" },
  { value: "gloves", description: "Gloves" },
  { value: "fusil", description: "Fusil" },
  { value: "pistol", description: "Pistol" },
  { value: "sticker", description: "Sticker" },
  { value: "agent", description: "Agent" },
  { value: "pin", description: "Pin" },
  { value: "kit", description: "Kit Music" },
];
