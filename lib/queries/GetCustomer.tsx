import db from "@/app/db";
import { notesTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";


export async  function getCustomer(id: number){
    const customer = await db.select().from(notesTable).where(eq(notesTable.id, id));
    return customer[0];
}