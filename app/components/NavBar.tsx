'use client';

import Link from "next/link";
import React, {useState} from "react";
import {usePathname} from "next/navigation";

export const NavBar = () => {
  const [search, setSearch] = useState<string>("");
  const currentRoute = usePathname();
  const activeStyle = ' text-pink-400';
  const nonActiveStyle = ' text-white';

  /**
   * Stores the value of the input field in the search state
   * @param e - event object
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }


  /**
   * Redirects to the search page with the search query
   *
   */
  const handleSearch = () => {
    if (search.trim() !== "") {
      // TODO - Implement search
      alert("Search not implemented yet")
    } else {
      alert("Please enter a search value")
    }
  }

  /**
   * Checks if the key pressed is the Enter key
   * @param event - event object containing the key pressed
   * @returns calls the handleSearch function
   */
  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === "Enter")
      return handleSearch()
  }

  return (
    <div className={"flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 p-10"}>
      <Link href={"/"} className={"text-4xl"}>AnimeRec</Link>
      <div className={"flex gap-4"}>
        <Link href={"/"} className={currentRoute === "/" ? activeStyle : nonActiveStyle}>Top</Link>
        <Link href={"/recommend"} className={currentRoute === "/recommend" ? activeStyle : nonActiveStyle}>Recommended</Link>
      </div>
      <input
        className={"border-1 border-gray-300 rounded-4xl p-3"}
        type={"text"}
        placeholder={"Search..."}
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}