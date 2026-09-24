import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
  useAuth,
} from "@clerk/react";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const { isSignedIn } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to="/">home</NavLink>
      </li>
      <li>
        <NavLink to="/products">products</NavLink>
      </li>
      {isSignedIn && (
        <li>
          <NavLink to="/dashboard">dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about-us">about</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">contact</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow *:capitalize"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Bazar-Shazar
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 *:capitalize">{links}</ul>
      </div>
      <div className="navbar-end space-x-2">
        <Show when="signed-out">
          <SignInButton>
            <button className="btn btn-primary">Login</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn">Sign up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default NavBar;
