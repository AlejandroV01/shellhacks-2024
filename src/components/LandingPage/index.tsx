import { generateRandomId } from '@/lib/generateRandomId'
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
  const { addNote } = useGlobalStore()
  const router = useRouter()

  const notes: INote[] = [
    {
      title: 'Physics',
      id: 'note1',
      content: 'Introduction to Biology - Cells and their structure',
      quizzes: [
        {
          noteId: 'note1',
          id: 'quiz1',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'easy',
          questionAmount: 5,
        },
      ],
    },
    {
      title: 'Physics',
      id: 'note2',
      content: 'Chemistry 101 - Periodic Table and Element Properties',
      quizzes: [
        {
          noteId: 'note1',
          id: 'quiz2',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'medium',
          questionAmount: 7,
        },
        {
          noteId: 'note1',
          id: 'quiz3',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'easy',
          questionAmount: 3,
        },
      ],
    },
    {
      title: 'Physics',
      id: 'note3',
      content: 'History - World War II and its aftermath',
      quizzes: [
        {
          noteId: 'note1',
          id: 'quiz4',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'hard',
          questionAmount: 4,
        },
      ],
    },
    {
      title: 'Physics',
      id: 'note4',
      content: 'Mathematics - Algebra and Functions',
      quizzes: [
        {
          noteId: 'note1',
          id: 'quiz5',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'medium',
          questionAmount: 6,
        },
      ],
    },
    {
      title: 'Physics',
      id: 'note5',
      content: 'Physics - Laws of Motion and Gravitation',
      quizzes: [
        {
          noteId: 'note1',
          id: 'quiz6',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'hard',
          questionAmount: 8,
        },
        {
          noteId: 'note1',
          id: 'quiz7',
          quizType: 'multiple-choice',
          questions: [],
          score: 0,
          difficulty: 'medium',
          questionAmount: 5,
        },
      ],
    },
  ]

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputFields>()

  const onSubmit = (data: InputFields) => {
    const newNote: INote = {
      title: '',
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
    <main className='p-4 flex flex-col items-center'>
      <nav className='flex justify-between w-full'>
        <div className='flex items-center gap-1'>
          <div>LOGO</div>
          <span>GPT Teacher</span>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full mt-14 gap-5 max-w-[1000px]'>
        <span>GPT Teacher | The best teacher ever!</span>
        <h2 className='text-5xl'>
          <span className='font-bold'>Quiz</span> at the speed of light!
        </h2>
        <span className='text-foreground/50'>One button away from creating a quiz based on your notes.</span>
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
        <h3 className='text-xl text-foreground/50 mr-auto'>Previous Notes</h3>
        {notes.length > 0 &&
          notes.map(note => {
            return <NoteCard key={note.id} noteId={note.id} noteTitle={note.content} noteContent={note.content} />
          })}
      </form>
    </main>
  )
}

const NoteCard = ({ noteId, noteTitle, noteContent }: { noteId: string; noteTitle: string; noteContent: string }) => {
  const router = useRouter()
  const handleEnterNote = () => {
    router.push(`/${noteId}`)
  }
  return (
    <Card className='w-full max-w-[800px] pt-6'>
      <CardContent>
        <h3 className='text-xl font-bold'>{noteTitle}</h3>
        <p>{noteContent}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleEnterNote}>Enter Note</Button>
      </CardFooter>
    </Card>
  )
}
