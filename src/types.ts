export interface GiftItem {
  id: string;
  title: string;
  price: number;
  iconName?: string;
  category?: 'lua-de-mel' | 'experiencias' | 'casa-nova' | 'cotas' | string;
  accentColor?: string; // pastel color from palette
  description?: string;
  image: string;
}

export interface TimelineChapter {
  chapter: string;
  title: string;
  text: string;
  photoUrl: string;
  photoAlt: string;
  photoPosition: 'left' | 'right';
}

export interface RsvpData {
  fullName: string;
  attending: boolean;
  guestsCount: number;
  message: string;
  phone?: string;
}
