import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/app/db";
import { notesTable } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = Number(params.id);
        const body = await request.json();

        const existingNote = await db.select().from(notesTable)
            .where(and(eq(notesTable.id, id), eq(notesTable.userId, userId)))
            .limit(1);

        if (!existingNote.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const updated = await db.update(notesTable)
            .set(body)
            .where(and(eq(notesTable.id, id), eq(notesTable.userId, userId)))
            .returning();

        return NextResponse.json(updated[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}