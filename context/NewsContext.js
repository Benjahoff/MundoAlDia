// NewsContext.js
'use client'; // Asegúrate de que esto esté presente

import { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const initialNews = [
    {
      id: 1,
      imageUrl: '/path/to/image1.jpg',
      title: 'Architectural Engineering Wonders',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Technology',
      description: 'A look at modern architectural wonders.',
      dateCreated: 'October 21, 2022',
    },
    {
      id: 2,
      imageUrl: '/path/to/image2.jpg',
      title: 'Innovation in Green Energy',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Science',
      description: 'How green energy is transforming the world.',
      dateCreated: 'October 22, 2022',
    },
    {
      id: 3,
      imageUrl: '/path/to/image2.jpg',
      title: 'Innovation in Green a',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Science',
      description: 'How green energy is transforming the world.',
      dateCreated: 'October 22, 2022',
    },
    {
      id: 4,
      imageUrl: '/path/to/image2.jpg',
      title: 'Innovation in Green Energy',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Science',
      description: 'How green energy is transforming the world.',
      dateCreated: 'October 22, 2022',
    },
    {
      id: 5,
      imageUrl: '/path/to/image2.jpg',
      title: 'Innovation in Green Energy',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Science',
      description: 'How green energy is transforming the world.',
      dateCreated: 'October 22, 2022',
    },
    {
      id: 6,
      imageUrl: '/path/to/image2.jpg',
      title: 'Innovation in Green Energy',
      subtitle: 'El descubrimiento de el doctor hoffman permitio que las nutrias consuman cannabis',
      category: 'Science',
      description: 'How green energy is transforming the world.',
      dateCreated: 'October 22, 2022',
    },
  ];

  const [news, setNews] = useState(initialNews);

  return (
    <NewsContext.Provider value={{ news }}>
      {children}
    </NewsContext.Provider>
  );
};
