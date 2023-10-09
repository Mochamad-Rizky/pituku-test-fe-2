import {getNewsDetail} from "@/actions/fetch-detail-news";
import parse from "html-react-parser";
import Image from "next/image";
import {Metadata} from "next";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ShareLink from "@/components/ui/ShareLink";

type Props = {
  params: { newsId: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const response = await getNewsDetail(params.newsId);

  if (response.status === "fail" || response.isError) {
    return {
      title: "Something went wrong!",
      description: "Please try again later",
    }
  }

  const { title, cover, createdBy, description } = response.data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: cover,
          width: 200,
          height: 150,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: createdBy,
      images: {
        url: cover,
        width: 200,
        height: 150,
        alt: title,
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }
  }
}

export default async function NewsDetail({ params }: { params: { newsId: string }}) {
  const response = await getNewsDetail(params.newsId);

  if (response.status === "fail" || response.isError) {
    return (
      <ErrorMessage message={response.message} />
    )
  }

  const { title, cover, createdAt, body, createdBy} = response.data;

  return (
    <article className="my-20 px-5 w-full max-w-2xl mx-auto">
      <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl">{title}</h1>
      <Image
        className="w-full rounded-2xl mt-5"
        width={200}
        height={150}
        src={cover}
        alt={title}
      />

      <div className="mt-5  border-b pb-5 flex justify-between items-center">
        <div>
          <h2 className="font-bold">
            {createdBy}
          </h2>
          <p className="text-gray-400 text-sm">
            {new Date(createdAt).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center">
          <ShareLink />
        </div>
      </div>

      <div className="mt-10">
        {parse(body)}
      </div>
    </article>
  )
}
