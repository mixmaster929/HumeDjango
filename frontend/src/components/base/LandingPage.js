import { createTheme, ThemeProvider } from '@mui/material/styles';

import IntroSection from "./IntroSection";
import Navbar from "./Navbar";


const defaultTheme = createTheme();
const introContent = {
    title: 'Decode Beyond Words: AI-Powered Body Language Analysis',
    description:
      `Step into a new era of communication with our revolutionary AI technology. 
      Witness the power of real-time and comprehensive body language assessment 
      from videos and images. Unlock a deeper understanding of non-verbal cues 
      for more meaningful connections and confident interactions. Experience 
      the future of communication with our cutting-edge platform`,
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'Body Language Assesment Platform',
  };

export default function LandingPage(){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <IntroSection post={introContent} />
        </ThemeProvider>
    );
}
