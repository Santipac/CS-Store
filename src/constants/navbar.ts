import navbar1 from "../../public/navbar1.jpg";
import navbar2 from "../../public/navbar2.jpg";
export const navigation = {
  categories: [
    {
      id: "products",
      name: "Products",
      featured: [
        {
          name: "New Arrivals",
          href: "/products",
          imageSrc: navbar1.src,
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "All Products",
          href: "/products",
          imageSrc: navbar2.src,
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "weapons",
          name: "Weapons",
          items: [
            { name: "Knifes", href: "/products/categories/KNIFE" },
            { name: "Gloves", href: "/products/categories/GLOVES" },
            { name: "Fusil", href: "/products/categories/FUSIL" },
            { name: "Pistols", href: "/products/categories/PISTOL" },
            { name: "Snipers", href: "/products/categories/SNIPER" },
            { name: "Shotguns", href: "/products/categories/SHOTGUN" },
            { name: "SMG", href: "/products/categories/SMG" },
          ],
        },
        {
          id: "others",
          name: "Others",
          items: [
            { name: "Agents", href: "/products/categories/AGENT" },
            { name: "Music Kit", href: "/products/categories/KIT" },
            { name: "Pins", href: "/products/categories/PIN" },
            { name: "Stickers", href: "/products/categories/STICKER" },
          ],
        },
      ],
    },
  ],
};
