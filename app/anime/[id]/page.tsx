import Image from "next/image";
import Link from "next/link";
import {Video} from "@/app/components/Video";
import {Reviews} from "@/app/components/Reviews";
import {Recommendations} from "@/app/components/Recommendations";

interface AnimeProps {
  aired: {
    from: string;
    "prop": {
      "from": {
        "day": 12,
        "month": 10,
        "year": 2023
      },
    }
  }
  duration: string;
  episodes: number;
  favorites: number;
  genres: Genre[]
  images: {
    jpg: {
      large_image_url: string;
    }
  }
  rating: string;
  title: string;
  title_japanese: string;
  trailer: {
    images: {
      large_image_url: string;
    },
    youtube_id: string;
  }
  status: string;
  streaming: Streaming[];
  synopsis: string;
}

interface Genre {
  name: string;
}

interface Streaming {
  name: string;
  url: string;
}

const DefaultText = ({text}: {text: string | number}) => (
  <span className={"text-white"}>{text}</span>
)

export default async function Anime({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const data = await fetch(`https://api.tenrai.org/v1/anime/${id}/full`);
  const result = await data.json();
  const anime: AnimeProps = result.data;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  console.log(id);
  return (
    <div className={"flex flex-col justify-center items-center gap-10"}>
      <div className={"flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-10"}>
        {/* Title */}
        <div className={"flex flex-col justify-center items-center gap-4 w-[200px]"}>
          <Image src={anime.images.jpg.large_image_url} alt={anime.title} width={200} height={300} />
          <h1 className={"text-center"}>{anime.title}</h1>
          <h1>{anime.title_japanese}</h1>
        </div>

        {/* Details */}
        <div className={"flex  flex-col text-gray-400"}>
          <p>Aired: <DefaultText text={`${monthNames[new Date(anime.aired.from).getMonth()]} ${anime.aired.prop.from.day}, ${anime.aired.prop.from.year}`} /></p>
          <p>Duration: <DefaultText text={anime.duration} /></p>
          <p>Episodes: <DefaultText text={anime.episodes} /></p>
          <p>Favorites: <DefaultText text={anime.favorites} /></p>
          <div className={"flex gap-2"}>
            <p>Genre: </p>
            {anime.genres.map((g, i) => (
              <p key={i}><DefaultText text={g.name} /></p>
            ))}
          </div>
          <p>Rating: <DefaultText text={anime.rating} /></p>
          <p>Status: <DefaultText text={anime.status} /></p>
          {anime.streaming.length ? <div className={"flex gap-2 w-[200px]"}>
            <p>Streaming: </p>
            {anime.streaming.map((s, i) => (
              <Link key={i} href={s.url} target={"_blank"} className={"text-pink-500"}>{s.name}</Link>
            ))}
          </div> : undefined}
        </div>
      </div>

      {anime.trailer.youtube_id && <Video id={anime.trailer.youtube_id} />}

      <p className={"lg:max-w-1/2 p-10 text-base/7 mb-10"}>{anime.synopsis}</p>

      <Reviews id={id} />

      <Recommendations id={id} />

    </div>
  )
}
