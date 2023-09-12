import React, {useState} from "react";
import Cart from './Cart'
import { TasksProvider } from "./CartContext.js";
import { NavLink } from 'react-router-dom'
import { useCookies  } from "react-cookie";
import { deleteCookie } from 'cookies-next';

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const [cookies, removeCookie] = useCookies(["user"]);

  function logout() {
    removeCookie('user');
    deleteCookie('user');
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className=" text-black mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink className="nav-link" to="/">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Home 
          </a>
        </Typography>
      </NavLink>
      <NavLink className="nav-link" to="/contact">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Contact
          </a>
        </Typography>
      </NavLink>
    </ul>
  );
 
  return (
    <>
    <TasksProvider>  
    <div className=" h-[72px] mb-6 relative "></div>
    <div className="fixed w-screen top-0 left-[-7px] bg-white border- z-10">
    <Navbar className=" text-black mx-auto max-w-screen-xl py-3 px-4 lg:px-8 lg:py-4 overflow-hidden  border-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <NavLink className="nav-link" to="/">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium "
          >
            Online Store
          </Typography>
        </NavLink>
        <div className="hidden lg:block">{navList}</div>
        <div className=" flex">

        <Cart /> 
        {cookies.user ? ( 
          <Button variant="gradient" onClick={logout} size="sm" className="hidden lg:inline-block text-black text-sm">
            Logout <span className=" font-semibold ml-1">{cookies.user.name}</span> 
          </Button>) : (
          <Button variant="gradient" size="sm" className="hidden lg:inline-block text-black text-sm">
            <NavLink className="nav-link" to="/login">Login </NavLink>
          </Button>
        )}
        
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2 text-black">
           <NavLink className="nav-link" to="/cart"><span>View Cart </span> </NavLink>
          </Button>
          <Button variant="gradient" size="sm" fullWidth className="mb-2 text-black">
          <NavLink className="nav-link" to="/login"><span>Login</span></NavLink>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
    </div>

    <div className=" relative top-80">
    </div>
    </TasksProvider>
    </>
  );
}


export default NavbarDefault
