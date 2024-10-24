"use client";

import BubbleAddNews from "@/components/BubbleAddNew";
import NewsList from "@/components/NewsList"; 
import SkeletonNews from "@/components/SkeletonNews";
import { AuthContext } from "@/context/AutContext";
import { NewsContext } from "@/context/NewsContext";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { news, loading } = useContext(NewsContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {loading ? <SkeletonNews /> : <NewsList news={news} />}
      {isAuthenticated && <BubbleAddNews />}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
