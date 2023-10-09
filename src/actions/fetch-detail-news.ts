import { NewsItem } from "@/actions/fetch-news";
import {ResponseFetch} from "@/types";

type NewsDetail = NewsItem & {
  body: string;
  createdBy: string;
  description: string;
};

type ResponseNewsDetail = ResponseFetch & {
  data: NewsDetail;
  isError: boolean;
};

export async function getNewsDetail(id: string) {
  try {
    const response = await fetch(`https://api.pituku.id/api/articles/${id}`);

    return await response.json() as ResponseNewsDetail;
  } catch (error: any) {
    return {
      isError: true,
    } as ResponseNewsDetail;
  }
}
