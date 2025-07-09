"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getItems } from "@/actions/item.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { CreateDialog } from "./CreateDialog";
import { EditDialog } from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Item = Awaited<ReturnType<typeof getItems>>;

interface ItemsTableProps {
  items: Item;
}

const ItemsTable = ({ items }: ItemsTableProps) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items?.userItems?.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || item.category === selectedCategory)
  );

  if (!items) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Pesquisar item..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />

        <CreateDialog />
      </div>

      <Table>
        <TableCaption>Lista de itens recém adicionados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID do item</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Categoria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems?.map((item: any) => {
            const slugifiedName = item.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${item.id}--${slugifiedName}`;
            const ItemUrl = `/itens/${slug}`;

            return (
              <TableRow key={item.id} onClick={() => router.push(ItemUrl)}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>R$ {item.price}</TableCell>
                <TableCell>{item.category}</TableCell>

                <TableCell className="text-right">
                  <div
                    className="flex justify-end space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog item={item}/>
                    <DeleteDialog item={item}/>
                    
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
