"use client";

import { DeleteItem } from "@/actions/item.action";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteDialogProps {
  item: {
    id: string;
  };
}

export default function DeleteDialog({ item }: DeleteDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await DeleteItem(item.id);
      toast.success("Item removido com sucesso!");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Falha ao remover o item.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <Trash2 className="w-4 h-4 text-default" />
            Remover
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            Essa ação não pode ser desfeita, certifique-se de que está removendo
            o item correto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">
              Confirmar remoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
