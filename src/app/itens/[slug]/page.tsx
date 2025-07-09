import { stackServerApp } from "@/stack";
import ItemCard from "./ItemCard";
import { getItemById } from "@/actions/item.action";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const item = await getItemById(id);
  return {
    title: item ? item.name : "Detalhes do item",
    description: item ? item.description : "Página de detalhes do item",
  };
}

async function page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const item = await getItemById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <ItemCard item={item} />
      </div>
    </div>
  );
}

export default page;
