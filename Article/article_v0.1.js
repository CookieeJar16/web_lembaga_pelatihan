document.addEventListener('DOMContentLoaded', () => {
  const articleId = new URLSearchParams(window.location.search).get('id');
  if (articleId) {
      fetchArticle(articleId);
  } else {
      document.getElementById('article-content').innerText = "No article ID provided.";
  }
});

function fetchArticle(id) {
  fetch(`http://localhost/M1/Backend/controller.php/articles?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              document.getElementById('article-content').innerText = data.error;
          } else {
              document.getElementById('article-title').innerText = data.judul_berita;
              document.getElementById('article-date').innerText = new Date(data.tanggal_publikasi).toLocaleDateString();
              document.getElementById('article-image').setAttribute('src', data.foto_berita);
              document.getElementById('article-content').innerHTML = data.isi_berita;
          }
      })
      .catch(error => {
          console.error('Error fetching article:', error);
          document.getElementById('article-content').innerText = "Error loading article content.";
      });
}