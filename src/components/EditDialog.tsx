import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { EditItem } from "@/actions/item.action";
import toast from "react-hot-toast";
import { getItemById } from "@/actions/item.action";
import ImageUpload from "./ImageUpload";

type Item = NonNullable<Awaited<ReturnType<typeof getItemById>>>;

interface EditDialogProps {
  item: Item;
}

export function EditDialog({ item }: EditDialogProps) {
  const [formData, setFormData] = useState({
    name: item.name.trim(),
    description: (item.description || "").trim(),
    price: item.price,
    category: item.category.trim(),
    userId: item.userId.trim(),
    imageUrl: item.imageUrl || "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newItem = await EditItem(item.id, formData);
      console.log("Success! New item edited: ", newItem);
      toast.success("Item editado com sucesso!");
    } catch (error) {
      console.log("error editing new item: ", error);
      toast.error("Falha ao editar o item, por favor tente novamente.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <Edit className="w-4 h-4" />
            Editar item
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar item</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha o formulário abaixo para editar o item.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Insira o nome do item"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="category">Categoria</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição do item</Label>
              <Textarea
                id="description"
                placeholder="Insira a descrição do Item"
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                placeholder="Insira o valor do item"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Image upload */}
          <div className="py-5">
            <Label htmlFor="image">Imagem</Label>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                console.log(url);
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">
              Confirmar edição
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
