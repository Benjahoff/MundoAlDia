'use client';

import NewsList from "@/components/NewsList"; // Asegúrate de que la ruta sea correcta
import { NewsContext } from "@/context/NewsContext";
import { useContext } from "react";

export default function Home() {
  const { news } = useContext(NewsContext);

  return (
      <NewsList news={news}/>
  );
}
