import {ResponseFetch} from "@/types";

export type NewsItem = {
  id: string;
  title: string;
  cover: string;
  createdAt: string;
};

type ResponseNews = ResponseFetch & {
  data: NewsItem[];
  totalItems: number;
  isError: boolean;
}

export async function getNews(page: number) {
  const perPage = 10;
  try {
    const response = await fetch(`https://api.pituku.id/api/articles?page=${page}&perPage=${perPage}`);

    return await response.json() as ResponseNews;
  } catch (error: any) {
    return {
      isError: true,
    } as ResponseNews;
  }
}
