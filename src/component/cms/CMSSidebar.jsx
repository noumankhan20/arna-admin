import { Home, Info, Star, FileText, Package } from "lucide-react";

export const sidebarItems = [
  {
    id: "home-hero",
    label: "Home - Hero",
    icon: Home,
    section: "homeHero"
  },
  {
    id: "home-about",
    label: "Home - About Us",
    icon: Info,
    section: "homeAbout"
  },
  {
    id: "home-why",
    label: "Home - Why Choose Us",
    icon: Star,
    section: "homeWhyChoose"
  },
  {
    id: "about-hero",
    label: "About - Hero",
    icon: FileText,
    section: "aboutHero"
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    section: "products"
  }
];
