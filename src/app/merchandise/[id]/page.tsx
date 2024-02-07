import Image from "next/image";

import { eq } from "drizzle-orm";

import { Post } from "@/components/post";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { merchandiseTable, postTable } from "@/db/schema";

export default async function MerchandisePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const [merchandise] = await db
    .select()
    .from(merchandiseTable)
    .where(eq(merchandiseTable.id, parseInt(id)));
  const posts = await db
    .select()
    .from(postTable)
    .where(eq(postTable.merchandiseId, merchandise.id));

  return (
    <main className="z-10 flex min-h-screen w-full flex-col items-center overflow-x-hidden pt-16">
      <div className="flex max-md:flex-col">
        <AspectRatio ratio={1 / 1}>
          <Image
            width={"1200"}
            height={"1200"}
            src={merchandise.picUrl}
            alt={merchandise.name}
            className="w-full rounded-md object-cover"
          />
        </AspectRatio>

        <div className="space-y-2 p-6">
          <h1 className="text-xl font-semibold">{merchandise.name}</h1>
          <div className="text-md flex space-x-2 border-b-2 pb-6">
            <Badge>{merchandise.color}</Badge>
            <Badge>${merchandise.price}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Post key={post.id} url={post.postUrl} width={328} />
        ))}
      </div>
    </main>
  );
}