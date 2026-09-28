import {AnimeItem} from "@/app/components/AnimeItem";
import {Button} from "@/app/components/Button";

interface Recommendation {
  content: string,
  mal_id: string,
  entry: Entry[]
}

interface Entry {
  mal_id: string,
  images: {
    jpg: {
      large_image_url: string
    }
  },
  title: string
}

export default async function Recommend({searchParams}: { searchParams: Promise<{ page: string | undefined; }>}) {
  const sp: {page: string | undefined} = await searchParams;
  const data = await fetch(`https://api.tenrai.org/v1/recommendations/anime?page=${sp.page ? sp.page : 1}&sfw=true`);
  const json = await data.json();
  const recommended: Recommendation[] = json.data;

  return (
    <div className={"flex flex-col gap-10"}>
      {recommended.map((anime: Recommendation, i: number) => (
        <div key={i} className={"flex flex-col md:flex-row justify-center items-center gap-10 p-10"}>
          <div className={"flex flex-1/4 flex-col md:flex-row justify-center items-center gap-10"}>
            <AnimeItem id={anime.entry[0].mal_id} title={anime.entry[0].title} image={anime.entry[0].images.jpg.large_image_url} />
            <AnimeItem id={anime.entry[1].mal_id} title={anime.entry[1].title} image={anime.entry[1].images.jpg.large_image_url} />
          </div>
          <p className={"flex-1/4"}>{anime.content}</p>
        </div>
      ))}

      <div className={"flex gap-25 items-center justify-center"}>
        {sp.page ? parseInt(sp.page) > 1 ? <Button href={`/recommend?&page=${parseInt(sp.page)-1}`} text={"Previous"}  /> : undefined : undefined}
        {json.pagination.has_next_page && sp.page ? <Button href={`/recommend?page=${parseInt(sp.page)+1}`} text={"Next"} /> : <Button href={`/recommend?page=${2}`} text={"Next"} />}
      </div>
    </div>
  );
}