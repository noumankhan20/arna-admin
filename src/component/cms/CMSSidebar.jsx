import { Home, Info, Star, FileText, Package, Tag, BookOpen } from "lucide-react";

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
    id: "promos",
    label: "Sponsor a POP Model",
    icon: Tag,
    section: "promos"
  },
  {
    id: "ourstory",
    label: "Our Story Section",
    icon: BookOpen,
    section: "ourstory"
  }
];
