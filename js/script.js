const url = 'https://jsonplaceholder.typicode.com/posts';
// Selecionar elemento da pagina Home
const loadingElement = document.querySelector('#loading');
const postsContainer = document.querySelector('#posts-container');

// Selecionar elemento da pagina post-individual
const postPage = document.querySelector('#post');
const postContainer = document.querySelector('#post-container');
const commentsContainer = document.querySelector('#comments-container');

//Selecionar os elementos do formulário da pagina post-individual
const commentForm = document.querySelector('#comment-form');
const emailInput = document.querySelector('#email');
const bodyInput = document.querySelector('#body');

// Get id from URL para diferenciar a pagina
// urlSearchParams: Salva a url
const urlSearchParams = new URLSearchParams(window.location.search);
// Verifica se a url tem id e salva o id no postId
const postId = urlSearchParams.get('id');

// Get all posts
async function getAllPosts() {
  const response = await fetch(url);
  console.log(response);

  const data = await response.json();

  console.log(data);

  // Esconder A frase  carregando... da pagina index
  loadingElement.classList.add('hide');

  // Criando elementos para cada post individual
  data.map((post) => {
    const div = document.createElement('div');
    const title = document.createElement('h2');
    const body = document.createElement('p');
    const link = document.createElement('a');

    // Preencher elementos criados
    title.innerText = post.title;
    body.innerText = post.body;
    link.innerText = 'Ler';
    link.setAttribute('href', `/post-individual.html?id=${post.id}`);

    // Adicionar elementos criados e preenchidos dentro da div criada para cada post
    div.appendChild(title);
    div.appendChild(body);
    div.appendChild(link);

    postsContainer.appendChild(div);
  });
}
//  Get individual post
async function getPost(id) {
  // Duas requisições assincronas
  const [responsePost, responseComments] = await Promise.all([
    fetch(`${url}/${id}`),
    fetch(`${url}/${id}/comments`),
  ]);

  const dataPost = await responsePost.json();
  const dataComments = await responseComments.json();

  loadingElement.classList.add('hide');
  postPage.classList.remove('hide');

  const title = document.createElement('h1');
  const body = document.createElement('p');

  title.innerText = dataPost.title;
  body.innerText = dataPost.body;

  postContainer.appendChild(title);
  postContainer.appendChild(body);

  console.log('dataComments', dataComments);

  // Get Comments post individual
  dataComments.map((comment) => {
    createComment(comment);
  });


}
function createComment(comment) {
  const div = document.createElement('div');
  const email = document.createElement('h3');
  const commentBody = document.createElement('p');

  email.innerText = comment.email;
  commentBody.innerText = comment.body;

  div.appendChild(email);
  div.appendChild(commentBody);
  commentsContainer.appendChild(div);
}

//  Post a comment( Enviar comentario)
async function postComment(comment) {
  const response = await fetch(`${url}/${postId}/comments`,{
    method: 'POST',
    body: comment,
    headers: {
      'Content-type': 'application/json',
    },
  });

  const data = await response.json();

  createComment(data);
}

// Para saber qual pagina esta
if (!postId) {
  // se nao tiver id na url esta na pagina home
  getAllPosts();
} else {
  // se tiver id na url esta na pagina individual post
  console.log('postId', postId);
  getPost(postId);

  // Add event to comment form
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let comment = {
      email: emailInput.value,
      body: bodyInput.value,
    };
    // let comment vire um texto em formato json
    comment = JSON.stringify(comment);

    postComment(comment);
  });
}
