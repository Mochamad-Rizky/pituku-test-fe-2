import {getNews} from "@/actions/fetch-news";
import LoadMore from "@/components/LoadMore";
import NewsCard from "@/components/NewsCard";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default async function News() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const news = await getNews(1);

  return (
    <>
      {news.isError || news.message === "fail" ? (
        <ErrorMessage message={news.message} />
      ) : (
        <>
          {news.data.map((item) => (
            <NewsCard item={item} key={item.id} />
          ))}
          <LoadMore />
        </>
      )}
    </>
  );
}
