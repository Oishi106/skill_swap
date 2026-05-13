import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Viewdetails from "../Pages/Viewdetails";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Privateroute from "../Privateroute/Privateroute";
import Toprated from "../Pages/Toprated";
import Howitworks from "../Pages/Howitworks";
import Testimonials from "../Pages/Testimonials ";
import AllSkills from "../Pages/AllSkills";
import Aboutus from "../Pages/Aboutus";
import Contract from "../Pages/Contract";
import Support from "../Pages/Support";

export const router=createBrowserRouter([
    {
        path:'dashboard',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'profile',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'my-bookings',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'saved-skills',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'add-skill',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'settings',
        element:<Privateroute><Dashboard></Dashboard></Privateroute>
    },
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'details/:skillId',
                element:<Privateroute><Viewdetails></Viewdetails></Privateroute>
            },
            {
                path:'signin',
                element:<Signin></Signin>
            },
            {
                path:'signup',
                element:<Signup></Signup>
            },
            {
                path:'toprated',
                element:<Toprated></Toprated>
            },
            {
                path:'howworks',
                element:<Howitworks></Howitworks>
            },
            {
                path:'all-skills',
                element:<Privateroute><AllSkills></AllSkills></Privateroute>
            },
            {
                path:'about-us',
                element:<Privateroute><Aboutus></Aboutus></Privateroute>
            },
            {
                path:'contract',
                element:<Privateroute><Contract></Contract></Privateroute>
            },
            {
                path:'support',
                element:<Privateroute><Support></Support></Privateroute>
            },
            {
                path:'Testimonials',
                element:<Testimonials></Testimonials>
            }
        ]
    }
])