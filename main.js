const apiKey = 'd91c443745374cf4b666da7a29e1695d';  // Reemplaza con tu API Key
const query = 'ONG';  // Palabra clave que deseas buscar
const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;  // Sin el parámetro country

// Realizar la solicitud a la API
fetch(url)
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    if (data.status === 'ok') {
      renderNews(data.articles);  // Llamar a la función para renderizar noticias
    } else {
      console.error('Error en la API:', data.message);  // Manejar errores específicos de la API
    }
  })
  .catch(error => {
    console.error('Error:', error);  // Manejar errores de red
  });

function renderNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';  // Limpiar el contenedor

  articles.forEach(article => {
    // Crear elementos para cada noticia
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-article');

    // Añadir imagen
    if (article.urlToImage) {
      const image = document.createElement('img');
      image.src = article.urlToImage;
      image.alt = article.title;  // Texto alternativo para la imagen
      image.classList.add('news-image');
      articleElement.appendChild(image);
    }

    const title = document.createElement('h2');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.textContent = article.description;

    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = 'Leer más';
    link.target = '_blank';  // Abrir en una nueva pestaña

    // Añadir los elementos al contenedor
    articleElement.appendChild(title);
    articleElement.appendChild(description);
    articleElement.appendChild(link);

    newsContainer.appendChild(articleElement);
  });
}
