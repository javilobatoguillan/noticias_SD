import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    fetch(`https://www.elprogreso.es/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => res.json())
      .then(setNoticia);
  }, [id]);

  if (!noticia) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
         Volver
      </Link>

      {noticia._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <img
          src={noticia._embedded["wp:featuredmedia"][0].source_url}
          alt={noticia.title.rendered}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: noticia.content.rendered }} />
    </div>
  );
};

export default NoticiaDetalle;
