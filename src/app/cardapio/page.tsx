import { getItems } from "@/actions/item.action";
import { stackServerApp } from "@/stack";
import CardapioItems from "./CardapioItems";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// type Item = Awaited<ReturnType<typeof getItemById>>;

// type UserItem = Awaited<ReturnType<typeof getItems>>;

// interface ItemsTableProps {
//   items: UserItem;
// }

// interface CardapioProps {
//   item: Item;
// }


const page = async () => {
  const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;
  const items = await getItems();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            {items.userItems.map((item: any) => {
              return <CardapioItems key={item.id} item={item}></CardapioItems>;
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          O Cardápio não existe.
        </div>
      )}
    </>
  );
};

export default page;
