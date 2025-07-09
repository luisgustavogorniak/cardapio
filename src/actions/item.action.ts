"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getItems(searchTerm?: string) {
    try {
        const currentUserId = await getUserId();

        const whereClause: any = {
            userId: currentUserId,
        }

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive"
            }
        }

        const userItems = await prisma.items.findMany({
            where: whereClause
        })

        revalidatePath("/");
        return { success: true, userItems }
    } catch (error) {
        console.log("Error in getItems", error)
        throw new Error("Failed to fetch items")
    }
}

export async function getItemById(id: string) {
    return await prisma.items.findUnique({
        where: { id },
    });
}

export async function CreateItem(data: Prisma.ItemsCreateInput) {
    console.log("creating item")
    console.log(data)
    try {
        const currentUsertId = await getUserId();
        if (!currentUsertId) return
        const newItem = await prisma.items.create({
            data: {
                ...data,
                userId: currentUsertId,
            }
        })
        revalidatePath("/itens")
        return newItem;
    } catch (error) {
        console.error("Error creating item:", error);
        throw error;
    }
}

export async function EditItem(id: string, data: Prisma.ItemsUpdateInput) {
    try {
        const currentUserId = await getUserId();

        const updatedItem = await prisma.items.update({
            where: { id },
            data: {
                ...data,
                userId: currentUserId,
            },
        });

        revalidatePath("/itens");
        return updatedItem;
        
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
}

export async function DeleteItem(id: string) {
    try {
        console.log("Deleting:", id);
        const currentUserId = await getUserId();

        if (!currentUserId) return;
        const deletedItem = await prisma.items.delete({
            where: { id },
        });

        revalidatePath("/itens")
        return deletedItem

    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
}