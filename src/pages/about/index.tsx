/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const About = () => {
  const devs = [
    {
      name: 'Annie Fernandez',
      linkedIn: 'https://www.linkedin.com/in/annie-fernandez-cs',
      image:
        'https://media.licdn.com/dms/image/v2/D4E03AQF2Klfk_-uYsQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718254953930?e=1732752000&v=beta&t=d3umlcwNg2LgFo9eUKF5yc5tv7Ia1jH0pWTtiBVVDnA',
    },
    {
      name: 'Anthony Fernandez',
      linkedIn: 'https://www.linkedin.com/in/anthony-fernandez-556622201',
      image:
        'https://media.licdn.com/dms/image/v2/C4E03AQFzJnDtehGQ0w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658456992095?e=1732752000&v=beta&t=B5iApBvrNGzpcQaDwDYcKp5i9Ac-poA6Tb-m8_Fw2Ms',
    },
    {
      name: 'Alejandro Vera',
      linkedIn: 'https://www.linkedin.com/in/alejandrovera09',
      image:
        'https://media.licdn.com/dms/image/v2/C4D03AQH6XL6d7XAIaw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1661532227736?e=1732752000&v=beta&t=dqRm9DWUVbs6QGiV7zSoEtmjWy7GFKq2SJZSQbj3HEk',
    },
    {
      name: 'Alfredo Bidopia',
      linkedIn: 'https://www.linkedin.com/in/alfredo-bidopia',
      image:
        'https://media.licdn.com/dms/image/v2/D5603AQFAkGVjLH9uQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681265752154?e=1732752000&v=beta&t=Qq1EmbjRh_MzerBCm2vHNeGtj2ZtAhZZHe4o23v_sbM',
    },
  ]

  const shuffledDevs = devs.sort(() => Math.random() - 0.5)
  //deploy
  return (
    <div className='w-full flex flex-col items-center gap-5 p-4'>
      <Link href={'/'} className='flex items-center gap-1 mr-auto z-40'>
        <img src='/images/Logo.png' alt='' className='w-[55px]' />
        <span className='font-bold'>Quiz Sensei</span>
      </Link>
      <div className='w-full flex flex-col items-center gap-5 max-w-[1000px]'>
        <h4 className='font-bold text-2xl mr-auto'>About Quiz Sensei</h4>
        <p className='text-lg text-foreground/80'>
          {
            "Quiz Sensei is an innovative web app designed to revolutionize the way users learn by transforming their personal notes into customized quizzes. Built by passionate students during a hackathon, Quiz Sensei aims to accelerate learning through interactive true/false and multiple-choice questions, powered by a pre-trained AI language model. Users can select the quiz's length and difficulty, while the platform tracks their progress, notes, and quiz scores to enhance their learning journey. Quiz Sensei’s standout feature, Deep Dive, provides detailed explanations and visual aids, helping users better understand difficult topics and fostering a deeper educational experience."
          }
        </p>
        <h4 className='font-bold text-2xl mr-auto'>Meet the Team</h4>
        <div className='flex flex-wrap w-full gap-5 justify-center'>
          {shuffledDevs.map((dev, index) => {
            return (
              <Card key={index} className='w-full max-w-[350px] p-4 flex flex-col gap-2'>
                <Avatar className='rounded w-full h-full aspect-square object-fill max-h-[300px] max-w-[300px]'>
                  <AvatarImage src={dev.image} alt={dev.name} className={'aspect-square max-h-[300px] max-w-[300px]'} />
                </Avatar>
                <h4 className='font-semibold text-lg'>{dev.name}</h4>
                <div className='flex items-center gap-2'>
                  <a href={dev.linkedIn} target='_blank' rel='noopener noreferrer'>
                    <Badge className='flex items-center gap-1 w-fit text-white'>
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </Badge>
                  </a>
                  <a href={dev.linkedIn} target='_blank' rel='noopener noreferrer'>
                    <Badge className='flex items-center gap-1 w-fit bg-neutral-800 text-white hover:bg-neutral-900'>
                      <Github size={14} />
                      <span>GitHub</span>
                    </Badge>
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default About
