import { updateNote } from '@/app/actions/notes'
import { notesTable } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNoteTitle } from '@/hooks/use-note-title'
import { useRefresh } from '@/hooks/use-refresh'
import { InferSelectModel } from 'drizzle-orm'
import React, { startTransition, useEffect, useRef, useState } from 'react'
type Note = InferSelectModel<typeof notesTable>

type Props = {
  initialData: Note
}

export default function Title(
  { initialData }: Props
) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData.title || 'Untitled')
  const [localTitle, setLocalTitle] = useState('')
  const { title: globalTitle, setTitle: setGlobalTitle } = useNoteTitle()

  useEffect(() => {
    setGlobalTitle(initialData.title || 'Untitled')
  }, [initialData.id])

  const enableInput = () => {
    setLocalTitle(initialData.title)
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const { refresh } = useRefresh()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setLocalTitle(newTitle);
    setGlobalTitle(newTitle)
    startTransition(async () => {
      try {
        await updateNote({
          id: initialData.id,
          title: newTitle || 'Untitled'
        })
        refresh()
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    });

  };

  const disableInput = () => {
    setIsEditing(false)
  }



  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      disableInput()
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input ref={inputRef} onClick={enableInput} onBlur={disableInput} onChange={onChange} onKeyDown={onKeyDown} value={localTitle} className="h-7 px-2 focus-visible:ring-transparent" />
      ) : (
        <Button onClick={enableInput} variant={'ghost'} size={'sm'} className="font-normal h-auto p-1">
          <span className="truncate">
              {globalTitle || 'Untitled'}
          </span>
        </Button>
      )}
    </div>
  )
}
