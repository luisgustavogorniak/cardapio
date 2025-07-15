import { getItemById } from "@/actions/item.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Item = Awaited<ReturnType<typeof getItemById>>;

interface ItemCardProps {
  item: Item;
}

const CardapioItems = ({ item }: ItemCardProps) => {
  if (!item) {
    return <div>Dados do item não estão disponíveis</div>;
  }

  return (
    <Card className="max-w m-4">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            {item.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">{item.name}</CardTitle>
            <CardTitle className="text-5xl font-bold">
              R$ {item.price}
            </CardTitle>
            <Badge>{item.category}</Badge>
            <CardDescription className="text-white">
              {item.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default CardapioItems;
