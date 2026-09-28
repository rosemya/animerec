import Link from "next/link";

export const Button = ({href, text}: {href: string; text: string}) =>
  <Link
    className={"bg-pink-400 text-white rounded-xl pl-10 pr-10 pt-5 pb-5"}
    href={href}
  >{text}</Link>