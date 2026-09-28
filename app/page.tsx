import {AnimeItem} from "@/app/components/AnimeItem";
import {Button} from "@/app/components/Button";

interface Props {
  mal_id: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
    }
   };
}

export default async function Home({searchParams}: { searchParams: Promise<{ page: string | undefined; }>}) {
  const sp: {page: string | undefined} = await searchParams;
  const data = await fetch(`https://api.tenrai.org/v1/top/anime?page=${sp.page ? sp.page : 1}`);
  const json = await data.json();
  const top: Props[] = json.data;

  return (
    <div className={"flex flex-col justify-center items-center gap-10 p-10"}>
      <h1 className={"text-4xl"}>Top Anime</h1>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10">
        {top.map((anime: Props, i: number) => (
          <AnimeItem key={i} id={anime.mal_id} title={anime.title} image={anime.images.jpg.image_url} />
        ))}
      </div>

      <div className={"flex justify-center items-center gap-10"}>
        {sp.page ? parseInt(sp.page) > 1 ? <Button href={`/?page=${parseInt(sp.page) - 1}`} text={"Previous"}/> : undefined : undefined}
        {json.pagination.has_next_page ? <Button href={`/?page=${sp.page ? parseInt(sp.page)+ 1 : 2}`} text={"Next"}/> : undefined}
      </div>

    </div>
  );
}
