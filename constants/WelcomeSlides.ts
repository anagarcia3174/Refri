import { Slide } from '../types/WelcomeTypes';
import  { images } from '../constants/images';

export const slides: Slide[] = [
  {
    key: '1',
    image: images.welcome1,
    text: 'Easily plan and track your meals, and stay on top of your macro goals all in one place.',
  },
  {
    key: '2',
    image: images.welcome2,
    text: 'Discover and share delicious recipes tailored to your dietary needs.',
  },
];