import {AnimeItem} from "@/app/components/AnimeItem";
import {Button} from "@/app/components/Button";

interface AnimeProps {
  images: {
    jpg: {
      large_image_url: string;
    }
  },
  mal_id: string;
  title: string;
}

export default async function Search ({searchParams}: { searchParams: Promise<{ page: string | undefined; q: string  }>}) {
  const sp: {page: string | undefined; q: string } = await searchParams;
  const str = sp.q.replaceAll(" ", "+");
  const data = await fetch(`https://api.tenrai.org/v1/anime?q=${str}&page=${sp.page ? sp.page : 1}&sfw=true`);
  const json = await data.json();
  const search: AnimeProps[] = json.data;

  console.log(json);

  return (
    <div>
      <div className={"flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10 p-10"}>
        {search.length ? search.map((anime: AnimeProps, i: number) => (
          <AnimeItem key={i} id={anime.mal_id} title={anime.title} image={anime.images.jpg.large_image_url} />
        )) : undefined}
      </div>

      <div className={"flex justify-center items-center gap-10"}>
        {sp.page && parseInt(sp.page) > 1 ? <Button href={`/search?q=${str}&page=${sp.page ? parseInt(sp.page)-1 : 2}`} text={"Previous"}  /> : undefined}
        {json.pagination.has_next_page ? <Button href={`/search?q=${str}&page=${sp.page ? parseInt(sp.page)+1 : 2}`} text={"Next"}  /> : undefined}
      </div>
    </div>
  )
}