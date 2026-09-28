import {AnimeItem} from "@/app/components/AnimeItem";

interface Recommendation {
  entry: {
    images: {
      jpg: {
        large_image_url: string;
      }
    },
    mal_id: string;
    title: string;
  }
}

export const Recommendations = async ({id}: {id: string}) => {
  const data = await fetch(`https://api.tenrai.org/v1/anime/${id}/recommendations?sfw-strict=true`);
  const result = await data.json();
  const recommendations: Recommendation[] = result.data;

  return (
    <div className={"flex flex-col justify-center items-center gap-10"}>
      <p className={"text-4xl"}>Recommendations</p>
      <div className={"flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10 p-10"}>
        {recommendations.map((r, i) => (
          <div key={i}>
            <AnimeItem id={r.entry.mal_id} title={r.entry.title} image={r.entry.images.jpg.large_image_url} />
          </div>
        ))}
      </div>
    </div>
  )
}