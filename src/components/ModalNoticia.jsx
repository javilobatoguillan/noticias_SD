import React from "react";

const ModalNoticia = ({ noticia, onClose }) => {
  if (!noticia) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition text-3xl leading-none"
          aria-label="Cerrar"
        >
          
        </button>

        {noticia._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={noticia._embedded["wp:featuredmedia"][0].source_url}
            alt={noticia.title.rendered}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {noticia.title.rendered}
          </h2>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: noticia.content.rendered }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalNoticia;
