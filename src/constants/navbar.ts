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
          href: "#",
          imageSrc: navbar1.src,
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
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
            { name: "Knifes", href: "#" },
            { name: "Gloves", href: "#" },
            { name: "Fusil", href: "#" },
            { name: "Pistols", href: "#" },
            { name: "Snipers", href: "#" },
            { name: "Shotguns", href: "#" },
            { name: "SMG", href: "#" },
          ],
        },
        {
          id: "others",
          name: "Others",
          items: [
            { name: "Agents", href: "#" },
            { name: "Music Kit", href: "#" },
            { name: "Pins", href: "#" },
            { name: "Stickers", href: "#" },
          ],
        },
      ],
    },
  ],
};
