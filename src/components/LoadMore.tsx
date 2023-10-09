"use client";

import {useCallback, useEffect, useState} from "react";
import { useInView } from "react-intersection-observer";
import {getNews, NewsItem} from "@/actions/fetch-news";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import SkeletonNews from "@/components/skeleton/SkeletonNews";

export default function LoadMore() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false); // [1
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const loadMoreNews = useCallback(async () => {
    const nextPage = (page % 10) + 1;
    setIsLoading(true);
    const newStateNews = (await getNews(nextPage)) ?? [];
    if (newStateNews.data.length === 0) {
      setIsPageEnd(true);
    }
    setIsLoading(false);
    setNews((prevState: NewsItem[]) => [...prevState, ...newStateNews.data]);
    setPage(nextPage);
  }, [page]);

  useEffect(() => {
    if (inView) {
      loadMoreNews();
    }
  }, [inView, loadMoreNews]);

  return (
    <>
      {news.map((item) => (
        <NewsCard item={item} key={item.id} />
      ))}
      {isLoading && (
        <SkeletonNews />
      )}
      {!isPageEnd && (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 lg:col-span-4"
          ref={ref}
        >
          <div
            className="block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
          </div>
        </div>
      )}
    </>
  )
}
