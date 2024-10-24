'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Textarea, Button, Select, SelectItem } from '@nextui-org/react';
import ValidatedInput from './ValidatedInput';
import { NewsContext } from '../context/NewsContext';
import { isValidUrl } from '@/functions';

export default function ModalNews({ onClose, isOpen, newsId = false }) {
  const { news, addNews, editNews } = useContext(NewsContext);
  const [isEdit, setIsEdit] = useState(false)
  const [categories] = useState([
    { id: 1, label: "Politica", value: 'Politica' },
    { id: 2, label: 'Deportes', value: 'Ciencia' },
    { id: 3, label: 'Tecnologia', value: 'Tecnologia' },
    { id: 4, label: 'Economia', value: 'Economia' },
    { id: 5, label: 'Internacionales', value: 'Internacionales' },
  ]);

  const [newsData, setNewsData] = useState({
    title: '',
    subtitle: '',
    category: '',
    urlToImage: '',
    content: '',
    author: 'User',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && newsId !== false) {
      getNews()
    }
  }, [isOpen]);

  const getNews = () => {
    const newsToEdit = news.find((item) => item._id === newsId);
    if (newsToEdit) {
      setIsEdit(true)
      setNewsData({
        title: newsToEdit.title || '',
        subtitle: newsToEdit.subtitle || '',
        category: newsToEdit.category || '',
        urlToImage: newsToEdit.urlToImage || null,
        content: newsToEdit.content || '',
      });
    }
  }


  const validate = () => {
    let tempErrors = {};
    if (!newsData.title.trim()) {
      tempErrors.title = 'El título es obligatorio.';
    }
    if (!newsData.category.trim()) {
      tempErrors.category = 'La categoría es obligatoria.';
    }
    if (!newsData.urlToImage) {
      tempErrors.urlToImage = 'La imagen es obligatoria.';
    } else if (!isValidUrl(newsData.urlToImage)) {
      tempErrors.urlToImage = 'Ingrese un formato valido de url.(hhps;//example.com)';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isEdit) {
        editNews({ ...newsData, id: newsId });
        newsId = false
      } else {
        addNews(newsData)
      }
      onClose();
    }
  };

  const handleOnClose = () => {
    setIsEdit(false)
    setNewsData({
      title: '',
      subtitle: '',
      category: '',
      urlToImage: '',
      content: '',
      author: 'Benjamin Hoffman',
    })
    onClose()
  }
  return (
    <Dialog open={isOpen} onClose={handleOnClose} className="relative z-50" >
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <DialogTitle className="text-xl font-semibold">
            {isEdit ?
              'Editar Noticia'
              : 'Crear Noticia'
            }
          </DialogTitle>
          <h2>
            {isEdit ?
              'Modifica los campos para actualizar la noticia.'
              :
              'Agregar una nueva noticia '}
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <ValidatedInput
              label="Título"
              placeholder="Ingresa el título"
              minLength={6}
              errorMessage="El título debe tener al menos 6 caracteres"
              value={newsData.title}
              id='title'
              mandatoryField={true}
              onChange={(value) => setNewsData({ ...newsData, title: value })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

            <ValidatedInput
              label="Subtítulo"
              placeholder="Ingresa el subtítulo"
              minLength={10}
              id='subtitle'
              errorMessage="El subtítulo debe tener al menos 10 caracteres"
              value={newsData.subtitle}
              mandatoryField={true}
              onChange={(value) => setNewsData({ ...newsData, subtitle: value })}
            />

            <Select
              label="Categoría"
              variant="bordered"
              fullWidth
              id='category'
              isRequired
              selectedKeys={[newsData.category]}
              onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </Select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

            <ValidatedInput
              label="URL imagen"
              placeholder="https://"
              minLength={10}
              id='urlImage'
              errorMessage="Ingrese una URL valida"
              value={newsData.urlToImage}
              mandatoryField={true}
              pattern={/^[A-Za-z0-9\-.:&?=_/]*$/}
              isTheValueValid={(e) => /^[A-Za-z0-9\-.:&?=_/]*$/.test(e)}
              onChange={(value) => setNewsData({ ...newsData, urlToImage: value })}
            />
            {errors.urlToImage && <p className="text-red-500 text-sm">{errors.urlToImage}</p>}
            <Textarea
              label="Descripción"
              variant="bordered"
              id='description'
              isRequired
              value={newsData.content}
              onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
              fullWidth
              rows={6}
            />

            <div className="flex justify-end space-x-2">
              <Button color="error" onClick={handleOnClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400"
                id='btnCreate'
              >
                {isEdit ? 'Actualizar Noticia' : 'Crear Noticia'}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
