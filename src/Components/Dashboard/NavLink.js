import {
  faUsers,
  faUserPlus,
  faSquarePlus,
  faFileCirclePlus,
  faIcons,
  faTruckRampBox,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: "1995",
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faUserPlus,
    role: "1995",
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faIcons,
    role: ["1995", "1999"],
  },
  {
    name: "Add category",
    path: "/dashboard/category/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faTruckRampBox, 
    role: ["1995", "1999"],
  },
  {
    name: "Add product",
    path: "/dashboard/product/add",
    icon: faCirclePlus, 
    role: ["1995", "1999"],
  },
];
