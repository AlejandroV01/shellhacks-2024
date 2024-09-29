# Inspiration

We were inspired by the idea of making studying smarter, not harder. As students, we often struggled with effective revision techniques and thought, "What if we could turn our own notes into quizzes to reinforce learning?" This led to the creation of Quiz Sensei, a tool designed to personalize and optimize education.

## What it does

Quiz Sensei allows users to upload their notes, which are then processed by an AI to generate tailored quizzes. Users can choose the number of questions, difficulty level, and quiz type (multiple choice or true/false). It tracks progress, stores quizzes, and features a unique "Deep Dive" function that offers in-depth explanations and visual aids to deepen learning.

## How we built it

We built Quiz Sensei using Next.js with TypeScript to ensure scalability, performance, and seamless integration with our chosen technologies. For UI, we relied on Radix UI, Framer Motion, and Tailwind CSS to create a smooth, user-friendly experience. The AI magic is powered by OpenAI endpoints, while Zustand handles state management and react-hook-form simplifies form validation. We also incorporated libraries like Recharts for progress tracking and Mermaid for generating diagrams in the "Deep Dive" feature. The project is grounded in a modular, modern stack that ensures flexibility and easy maintenance.

## Challenges we ran into

One of the main challenges was integrating the LLM AI endpoints to ensure that quiz questions generated from notes were accurate and meaningful. Additionally, building a responsive, intuitive user interface with animations while ensuring smooth performance across devices was another hurdle. Managing real-time quiz scoring, progress tracking, and state synchronization with Zustand also presented technical difficulties that we had to overcome.

## Accomplishments that we're proud of

We’re proud to have created a fully functional, AI-powered quiz generator that goes beyond simple question generation. The "Deep Dive" feature, in particular, is a highlight, offering users a rich, detailed learning experience with explanations and diagrams. We also successfully integrated a large number of technologies, such as TypeScript, AI endpoints, and complex UI libraries, into a cohesive and high-performing product in a short amount of time.

## What we learned

Through building Quiz Sensei, we deepened our knowledge of AI integration, specifically in using LLMs to generate meaningful educational content. We also learned a lot about building scalable and maintainable web applications using Next.js, TypeScript, and state management libraries like Zustand. This project helped us grow as developers and collaborators, pushing us to solve real-world challenges in education technology.

## What's next for Quiz Sensei

We envision expanding Quiz Sensei by refining the AI’s ability to generate even more diverse types of quizzes, including short-answer questions and interactive learning modules. We also plan to improve the user experience with enhanced progress tracking, more visualization tools, and personalized learning paths. Additionally, we hope to further integrate machine learning to adapt quiz difficulty based on user performance, making Quiz Sensei a dynamic and evolving study partner for students everywhere.
