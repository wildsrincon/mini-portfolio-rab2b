import adoptme from '../assets/images/projects/adoptme1.webp'
import promptopia from '../assets/images/projects/promptopia.webp'
import weatherapp from '../assets/images/projects/weather_app.webp'
import profile from '../assets/images/wilds.png'

interface ITechnology {
  name: string
  color: string
}

interface IProject {
  id: number
  title: string
  image: string
  description: string
  link: string
  technologies: ITechnology[]
  github?: string
}

interface IHero {
  title: string
  subtitle: string
  cta: string
  image: string
}

const HeroInfo = {
  title: 'Hi, I am Wilds',
  subtitle:
    'I am a Frontend Developer with experience in building web applications using React, Angular, and Next.js. I am passionate about creating user-friendly and responsive interfaces.',
  cta: 'See my work',
  image: profile,
}

const projects: IProject[] = [
  {
    id: 1,
    title: 'Adopt Me',
    image: adoptme,
    description:
      'App to adopt pets developed with react 18, typescript, tailwindcss and vite intro react V8 course Brian Holt Frontend Masters',
    link: 'https://adopt-me-v2.vercel.app/',
    technologies: [
      {
        name: 'React',
        color: 'pink-text-gradient',
      },
      {
        name: 'Typescript',
        color: 'green-text-gradient',
      },
      {
        name: 'Tailwinscss',
        color: 'orange-text-gradient',
      },
    ],
  },
  {
    id: 2,
    title: 'Promptopia',
    image: promptopia,
    description:
      'Promptopia WepApp built using NextJs, ReactJs and Tailwind CSS with MongoDB, Express and NextAuth for authentication.',
    link: 'https://promptopia-five.vercel.app/',
    technologies: [
      {
        name: 'NextJs',
        color: 'pink-text-gradient',
      },
      {
        name: 'React',
        color: 'green-text-gradient',
      },
      {
        name: 'Tailwindcss',
        color: 'orange-text-gradient',
      },
    ],
  },
  {
    id: 3,
    title: 'Weather App Angular',
    image: weatherapp,
    description:
      'Weather App with geolocalization and pronostic weather for 5 days, build in with Angular 9, API Openweather.',
    link: 'https://weather-app-66cf5.firebaseapp.com/',
    technologies: [
      {
        name: 'Angular',
        color: 'pink-text-gradient',
      },
      {
        name: 'RestApi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'orange-text-gradient',
      },
    ],
  },
]

export { HeroInfo, projects }
export type { IHero, IProject, ITechnology }
