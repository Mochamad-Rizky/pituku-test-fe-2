import News from "@/components/News";
import {Suspense} from "react";
import SkeletonNews from "@/components/skeleton/SkeletonNews";

export default function Home() {
  return (
    <main>
      <h1 className="text-green-500 font-extrabold text-3xl text-center my-10">Pituku Blogs</h1>

      <section className="max-w-screen-2xl mx-auto px-5">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<SkeletonNews />}>
            <News/>
          </Suspense>
        </div>
      </section>
    </main>
  )
}
