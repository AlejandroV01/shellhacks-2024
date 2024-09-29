import { QuestionType } from "@/pages/api/get-questions";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ExtendedQuestionType = QuestionType & {
  userSelection?: string; // or number, or whichever type is appropriate for the selection
};

export interface IQuiz {
  id: string;
  noteId: string;
  quizType: "true-or-false" | "multiple-choice";
  questions: ExtendedQuestionType[];
  currentQuestionIndex: number;
  score: number;
  difficulty: "easy" | "medium" | "hard";
  questionAmount: number;
  createdAt: Date;
}

export interface INote {
  title: string;
  description: string;
  id: string;
  content: string;
  quizzes: IQuiz[];
}

interface IGlobalStateValues {
  notes: INote[];
}

export interface IGlobalState extends IGlobalStateValues {
  addNote: ({ note }: { note: INote }) => void;
  addQuiz: ({ quiz }: { quiz: IQuiz }) => void;
  updateNote: (noteId: string, newNote: Partial<INote>) => void;
  updateQuiz: (noteId: string, quizId: string, newQuiz: Partial<IQuiz>) => void;
}

export const initialState: IGlobalStateValues = {
  notes: [],
};

const useGlobalStore = create<IGlobalState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addNote: (newNote): void => {
          set((state) => ({
            notes: [...state.notes, newNote.note],
          }));
        },
        addQuiz: (newQuiz): void => {
          const notes = get().notes;

          const note = notes.find((note) => note.id === newQuiz.quiz.noteId);

          if (!note) {
            return;
          }
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === newQuiz.quiz.noteId
                ? { ...note, quizzes: [...(note.quizzes || []), newQuiz.quiz] }
                : note
            ),
          }));
        },
        updateNote: (noteId, newNote): void => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === noteId ? { ...note, ...newNote } : note
            ),
          }));
        },
        updateQuiz: (noteId, quizId, newQuiz): void => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    quizzes: note.quizzes.map((quiz) =>
                      quiz.id === quizId ? { ...quiz, ...newQuiz } : quiz
                    ),
                  }
                : note
            ),
          }));
        },
      }),
      {
        name: "gpt-teacher-notes-store", // Store name
      }
    )
  )
);

export default useGlobalStore;
