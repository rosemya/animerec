import Link from "next/link";
import Image from "next/image";

export const AnimeItem = ({id, title, image}: {id: string; title: string; image: string}) =>
  <Link href={`/anime/${id}`} className={"w-[200px] h-[300px] flex justify-center items-center flex-col gap-4 mb-10"}>
    <Image src={image} alt={title} width={200} height={300} />
    <p className={"w-[200px]"}>{title}</p>
  </Link>