/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Business from "@material-ui/icons/Business";

import Info from "@material-ui/icons/Info";

import LibraryBooks from "@material-ui/icons/LibraryBooks";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import CompanyProfile from "views/CompanyProfile/CompanyProfile"
import UserProfile from "views/UserProfile/UserProfile.js";
import About from "views/About/About.js";
import ToDoList from "views/ToDoList/ToDoList.js";


const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: '/company',
    name: "Company Profile",
    rtlName: "لوحة القيادة",
    icon: Business,
    component: CompanyProfile,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/todo",
    name: "To Do",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: ToDoList,
    layout: "/admin"
  },
  {
    path: "/about",
    name: "About",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Info,
    component: About,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
