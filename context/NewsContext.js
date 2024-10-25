"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { toast } from "react-toastify";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`);
      setNews(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Error al cargar las noticias");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const addNews = async (newNews) => {
    const toastId = toast.loading("Agregando noticia...");
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, newNews, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.data.news) {
        setNews((prevNews) => [...prevNews, response?.data.news]);
        setLoading(false);
        toast.update(toastId, {
          render: "Noticia agregada correctamente.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error adding news:", error);
      toast.update(toastId, {
        render: "Error al agregar la noticia.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const editNews = async (updatedNews) => {
    const toastId = toast.loading("Actualizando noticia...");
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/news/${updatedNews.id}`,
        updatedNews,
        {
          headers: {
            authorization: `Bearer ${token}`, 
          },
        }
      );
      if (response.data.news) {
        setNews((prevNews) =>
          prevNews.map((newsItem) =>
            newsItem._id === response.data.news._id
              ? response.data.news
              : newsItem
          )
        );
        setLoading(false);
      }
      toast.update(toastId, {
        render: "Noticia actualizada correctamente.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error editing news:", error);
      toast.update(toastId, {
        render: "Error al actualizar la noticia.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const deleteNews = async (id) => {
    const toastId = toast.loading("Eliminando noticia...");
    const token = Cookies.get("token");
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNews((prevNews) => prevNews.filter((newsItem) => newsItem._id !== id));
      setLoading(false);
      toast.update(toastId, {
        render: "Noticia eliminada correctamente.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.update(toastId, {
        render: "Error al eliminar la noticia.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <NewsContext.Provider
      value={{ news, addNews, deleteNews, editNews, loading }}
    >
      {children}
    </NewsContext.Provider>
  );
};
