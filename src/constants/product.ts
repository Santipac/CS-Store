import type { Option } from "@/interfaces/form";

export const statTrak: Option[] = [
  { value: "YES", description: "Yes" },
  { value: "NO", description: "No" },
];
export const wear: Option[] = [
  { value: "-", description: "None" },
  { value: "Factory New", description: "Factory New" },
  { value: "Minimal Wear", description: "Minimal Wear" },
  { value: "Field-Tested", description: "Field-Tested" },
  { value: "Well-Worn", description: "Well-Worn" },
  { value: "Battle-Scarred", description: "Battle-Scarred" },
];
export const type: Option[] = [
  { value: "-", description: "Pick One" },
  { value: "KNIFE", description: "Knife" },
  { value: "GLOVES", description: "Gloves" },
  { value: "FUSIL", description: "Fusil" },
  { value: "PISTOL", description: "Pistol" },
  { value: "STICKER", description: "Sticker" },
  { value: "AGENT", description: "Agent" },
  { value: "PIN", description: "Pin" },
  { value: "KIT", description: "Kit Music" },
];
