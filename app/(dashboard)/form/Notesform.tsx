import { noteInsertSchema, NoteInsertSchemaType } from '@/app/zod-schema/note'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'


type Props = {
    note? : NoteInsertSchemaType
}

export default function Notesform(
    {note} : Props
) {
    const defaultValues: NoteInsertSchemaType = {
        title: note?.title ?? ' ',
        content: note?.content ?? ' '
    }


    const form = useForm<NoteInsertSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(noteInsertSchema),
        defaultValues,
    })
  return (
    <div>
        <h2>Notes form</h2>
        <p>{JSON.stringify(form.getValues())}</p>
    </div>
  )
}
