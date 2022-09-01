import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    MdSmsFailed
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./sidebar.css"


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/application",
            name: "Application List",
            icon: <FaTh />
        },
        {
            path: "/pending",
            name: "Pending Application List",
            icon: <FaUserAlt />
        },
        {
            path: "/record",
            name: "Approved List",
            icon: <FaRegChartBar />
        },
        {
            path: "/declined",
            name: "Decline List",
            icon: <FaRegChartBar />
        },
        {
            path: "/booking",
            name: "Booking List",
            icon: <FaCommentAlt />
        },
        {
            path: "/",
            name: "Sign Out",
            icon: <FaShoppingBag />
        },
        // {
        //     path: "/productList",
        //     name: "Product List",
        //     icon: <FaThList />
        // },
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "400px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin Pannel</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>

            
        </div>



    );
};

export default Sidebar;