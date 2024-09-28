/* eslint-disable @next/next/no-img-element */
import { generateRandomId } from '@/lib/generateRandomId'
import { ApiGetTitleType } from '@/pages/api/get-title'
import useGlobalStore, { INote } from '@/store/useGlobalStore'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Textarea } from '../ui/textarea'

type InputFields = {
  notes: string
}

export const LandingPage = () => {
  const { addNote, notes } = useGlobalStore()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputFields>()

  const onSubmit = async (data: InputFields) => {
    const response = await fetch('/api/get-title', {
      method: 'POST',
      body: JSON.stringify({ userInput: data.notes }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resData = (await response.json()) as ApiGetTitleType
    if (!resData.data) {
      return
    }
    const newNote: INote = {
      title: resData.data.data.title,
      description: resData.data.data.description,
      id: generateRandomId(),
      content: data.notes,
      quizzes: [],
    }

    addNote({
      note: newNote,
    })

    router.push(`/${newNote.id}/choose-study-mode`)
  }

  return (
    <main className='p-4 flex flex-col items-center w-full'>
      <nav className='flex justify-between w-full'>
        <div className='flex items-center gap-1'>
          <img src='/images/Logo.png' alt='' className='w-[60px]' />
          <span>GPT Teacher</span>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
      <section className='flex flex-col items-center w-full mt-14 gap-5 max-w-[1000px]'>
        <span>GPT Teacher | The best teacher ever!</span>
        <h2 className='text-5xl'>
          <span className='font-bold'>Quiz</span> at the speed of light!
        </h2>
        <span className='text-foreground/50'>One button away from creating a quiz based on your notes.</span>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Card className='w-full pt-6'>
            <CardContent>
              <Textarea
                {...register('notes', {
                  required: 'This field is required',
                })}
                placeholder='Paste your notes here'
                rows={8}
              />
              {errors.notes && <span className='text-red-500'>{errors.notes.message}</span>}
            </CardContent>
            <CardFooter>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </form>
        <h3 className='text-xl text-foreground/80 mr-auto'>Previous Notes</h3>
        {notes.length > 0 &&
          notes.map(note => {
            return <NoteCard key={note.id} noteId={note.id} noteTitle={note.title} noteDescription={note.description} />
          })}
      </section>
    </main>
  )
}

const NoteCard = ({ noteId, noteTitle, noteDescription }: { noteId: string; noteTitle: string; noteDescription: string }) => {
  const router = useRouter()
  const handleEnterNote = () => {
    router.push(`/${noteId}`)
  }
  return (
    <Card className='w-full pt-6'>
      <CardContent>
        <h3 className='text-xl font-bold'>{noteTitle}</h3>
        <p className='truncate'>{noteDescription}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleEnterNote}>Enter Note</Button>
      </CardFooter>
    </Card>
  )
}
