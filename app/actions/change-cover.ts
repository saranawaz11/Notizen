"use server";

import { auth } from "@clerk/nextjs/server";
import db from "../db";
import { notesTable } from "../db/schema";
import { and, eq } from "drizzle-orm";

export const changeCover = async (
    noteId: number,
    coverUrl: string
) => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const result = await db
        .update(notesTable)
        .set({ coverImage: coverUrl })
        .where(
            and(
                eq(notesTable.id, noteId),
                eq(notesTable.userId, userId)
            )
        );

    if (!result) {
        throw new Error("Note not found");
    }

    return { success: true, result };
};