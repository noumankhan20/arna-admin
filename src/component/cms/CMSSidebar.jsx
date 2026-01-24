import { Home, Info, Star, FileText, Package } from "lucide-react";

export const sidebarItems = [
  {
    id: "home-hero",
    label: "Home - Hero",
    icon: Home,
    section: "home-hero"
  },
  // {
  //   id: "home-about",
  //   label: "Home - About Us",
  //   icon: Info,
  //   section: "homeAbout"
  // },
  // {
  //   id: "home-why",
  //   label: "Home - Why Choose Us",
  //   icon: Star,
  //   section: "homeWhyChoose"
  // },
  {
    id: "about-hero",
    label: "About - Hero",
    icon: FileText,
    section: "about-hero"
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    section: "products"
  },
  {
    id: "pop-model",
    label: "Sponsor a POP Model",
    icon: Package,
    section: "pop-model"
  }
];
