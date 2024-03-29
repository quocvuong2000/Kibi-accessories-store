// Sidebar imports
import {
  UilArchive,
  UilChart,
  UilClipboardAlt,
  UilEstate,
  UilLabelAlt,
  UilNewspaper,
  UilPackage,
  UilUsersAlt,
  UilCommentAlt,
  UilBloggerAlt,
  UilCloudCheck,
  UilEnvelopeEdit,
  UilCommentAltDots,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilMoneyWithdrawal, UilUsdSquare } from "@iconscout/react-unicons";

// Recent Card Imports
import img1 from "../assets/images/Avatar/img1.png";
import img2 from "../assets/images/Avatar/img2.png";
import img3 from "../assets/images/Avatar/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Orders",
    link: "/dashboard/orders",
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
    link: "/dashboard/customers",
  },
  {
    icon: UilUsersAlt,
    heading: "Staffs",
    link: "/dashboard/staffs",
  },
  {
    icon: UilPackage,
    heading: "Products",
    link: "/dashboard/products",
  },
  {
    icon: UilLabelAlt,
    heading: "Brands",
    link: "/dashboard/brands",
  },
  {
    icon: UilArchive,
    heading: "Categories",
    link: "/dashboard/categories",
  },
  {
    icon: UilArchive,
    heading: "Category Blog",
    link: "/dashboard/categoryblog",
  },
  {
    icon: UilBloggerAlt,
    heading: "Blog",
    link: "/dashboard/blogs",
  },
  {
    icon: UilCloudCheck,
    heading: "Approve Blog",
    link: "/dashboard/approveblog",
  },
  {
    icon: UilCommentAlt,
    heading: "Comment",
    link: "/dashboard/comments",
  },
  {
    icon: UilCommentAltDots,
    heading: "Approve Comments",
    link: "/dashboard/approvecomments",
  },
  {
    icon: UilEstate,
    heading: "Branches",
    link: "/dashboard/branch",
  },
  {
    icon: UilNewspaper,
    heading: "Storage",
    link: "/dashboard/storage",
  },
  {
    icon: UilChart,
    heading: "Other",
    link: "/dashboard",
  },
  {
    icon: UilEnvelopeEdit,
    heading: "Subscriber",
    link: "/dashboard/subscriber",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround: "#0288d1",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
