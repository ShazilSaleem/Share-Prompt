"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import {
  signIn,
  signOut,
  getSession,
  getProviders,
  useSession,
} from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersHandle = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersHandle();
  }, []);

  // Dropdown animation using react-spring
  const dropdownAnimation = useSpring({
    opacity: toggleDropdown ? 1 : 0,
    transform: toggleDropdown ? "translateY(0)" : "translateY(-10px)",
    display: toggleDropdown ? "block" : "none",
    config: { tension: 200, friction: 15 },
  });

  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptify</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn " href={"/create-prompt"}>
              Create Prompt
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
               src={session.user.image}
                width={40}
                height={40}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            <animated.div style={dropdownAnimation} className=" dropdown">
              {toggleDropdown && (
                <div className="flex flex-col">
                  <Link
                    href={"/profile"}
                    className="dropdown_link p-1"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link p-1"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="w-full mt-5 black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </animated.div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
