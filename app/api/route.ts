import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/app/db";
import { notesTable } from "@/app/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const parentDocumentParam = searchParams.get('parentDocument');
        const parentDocument = parentDocumentParam ? Number(parentDocumentParam) : undefined;

        const notes = await db
            .select()
            .from(notesTable)
            .where(
                parentDocument !== undefined
                    ? and(
                        eq(notesTable.userId, userId),
                        eq(notesTable.parentDocument, parentDocument),
                        eq(notesTable.isArchived, false)
                    )
                    : and(
                        eq(notesTable.userId, userId),
                        isNull(notesTable.parentDocument),
                        eq(notesTable.isArchived, false)
                    )
            );

        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}