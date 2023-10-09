import Link from "next/link";
import {NewsItem} from "@/actions/fetch-news";
import Image from "next/image";

type Props = {
  item: NewsItem;
}

export default function NewsCard({ item }: Props) {
  return (
    <article>
      <Image
        className="w-full rounded-2xl"
        width={200}
        height={150}
        src={item.cover}
        alt={item.title}
      />
      <Link
        href={`/news/${item.id}`}
        className="mt-3 inline-block text-center text-lg font-bold lg:text-left"
      >
        {item.title}
      </Link>
      <p className="mt-4 text-center text-gray-400 lg:text-left">
        {new Date(item.createdAt).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </article>
  )
}
