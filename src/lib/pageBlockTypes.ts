export type BlockType = 'hero' | 'text' | 'image' | 'cta' | 'testimonials' | 'spacer';

export interface HeroBlockData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
  showButton: boolean;
  alignment: 'left' | 'center' | 'right';
  minHeight: string;
}

export interface TextBlockData {
  content: string;
  alignment: 'left' | 'center' | 'right';
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  textColor: string;
  backgroundColor: string;
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ImageBlockData {
  src: string;
  alt: string;
  width: 'sm' | 'md' | 'lg' | 'full';
  rounded: boolean;
  caption: string;
}

export interface CTABlockData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  layout: 'centered' | 'side-by-side';
}

export interface TestimonialItem {
  name: string;
  text: string;
  role: string;
}

export interface TestimonialsBlockData {
  title: string;
  items: TestimonialItem[];
  backgroundColor: string;
  textColor: string;
}

export interface SpacerBlockData {
  height: 'sm' | 'md' | 'lg' | 'xl';
}

export type BlockData =
  | HeroBlockData
  | TextBlockData
  | ImageBlockData
  | CTABlockData
  | TestimonialsBlockData
  | SpacerBlockData;

export interface PageBlock {
  id: string;
  type: BlockType;
  data: BlockData;
}

export const defaultBlockData: Record<BlockType, BlockData> = {
  hero: {
    title: 'Welkom',
    subtitle: 'Ontdek een bewuster leven',
    backgroundImage: '',
    backgroundColor: '#c17a50',
    textColor: '#ffffff',
    buttonText: 'Meer weten',
    buttonLink: '#',
    showButton: true,
    alignment: 'center',
    minHeight: '60vh',
  } as HeroBlockData,
  text: {
    content: 'Voeg hier je tekst toe...',
    alignment: 'left',
    fontSize: 'base',
    textColor: '',
    backgroundColor: '',
    maxWidth: 'lg',
  } as TextBlockData,
  image: {
    src: '',
    alt: 'Afbeelding',
    width: 'lg',
    rounded: true,
    caption: '',
  } as ImageBlockData,
  cta: {
    title: 'Klaar om te beginnen?',
    description: 'Sluit je aan bij onze community',
    buttonText: 'Aanmelden',
    buttonLink: '/register',
    backgroundColor: '#c17a50',
    textColor: '#ffffff',
    buttonColor: '#ffffff',
    layout: 'centered',
  } as CTABlockData,
  testimonials: {
    title: 'Wat anderen zeggen',
    items: [
      { name: 'Anna', text: 'Een prachtige community die me heeft geholpen.', role: 'Lid sinds 2024' },
      { name: 'Mark', text: 'De cursussen zijn van ongelooflijke kwaliteit.', role: 'Lid sinds 2023' },
    ],
    backgroundColor: '',
    textColor: '',
  } as TestimonialsBlockData,
  spacer: {
    height: 'md',
  } as SpacerBlockData,
};

export const blockLabels: Record<BlockType, string> = {
  hero: 'Hero Banner',
  text: 'Tekst',
  image: 'Afbeelding',
  cta: 'Call to Action',
  testimonials: 'Testimonials',
  spacer: 'Ruimte',
};
