import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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

  return (
    <div>
      <h3>About</h3>
      <div>
        {devs.map((dev, index) => {
          return (
            <Card key={index}>
              <Avatar className='rounded' w-full>
                <AvatarImage src={dev.image} alt={dev.name} />
              </Avatar>
              <h4>{dev.name}</h4>
              <a href={dev.linkedIn} target='_blank'>
                <Badge>LinkedIn</Badge>
              </a>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default About
