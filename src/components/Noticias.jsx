import React, { useEffect, useState } from "react";
import ModalNoticia from "./ModalNoticia";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://laliganoticias.com/wp-json/wp/v2/posts?categories=1&_embed")
      .then((res) => res.json())
      .then(setNoticias);
  }, []);

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {noticias.map((n) => (
        <div
          key={n.id}
          onClick={() => setNoticiaSeleccionada(n)}
          className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
        >
          {n._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={n._embedded["wp:featuredmedia"][0].source_url}
              alt={n.title.rendered}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3
              className="text-lg font-semibold mb-2 text-gray-800"
              dangerouslySetInnerHTML={{ __html: n.title.rendered }}
            />
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: n.excerpt.rendered.substring(0, 100) + "...",
              }}
            />
          </div>
        </div>
      ))}

      <ModalNoticia
        noticia={noticiaSeleccionada}
        onClose={() => setNoticiaSeleccionada(null)}
      />
    </div>
  );
};

export default Noticias;
