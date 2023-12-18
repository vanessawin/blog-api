// Carregamento dos posts da home
const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

// Get all posts
async function getAllPosts () {
  const response = await fetch(url);
  console.log(response);

  const data = await response.json();
  
  console.log(data)

  // esconder A frase  carregando... da pagina index
  loadingElement.classList.add("hide");

  // Criando elementos para cada post individual
  data.map((post)=> {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");
    const link = document.createElement("a");

    // Preencher elementos criados
  title.innerText =  post.title;
    body.innerText = post.body;
    link.innerText = "Ler";
    link.setAttribute("href", `/post-individual.html?id=${post.id}`)

    // Adicionar elementos criados e preenchidos dentro da div criada para cada post
    div.appendChild (title);
    div.appendChild(body);
    div.appendChild(link);

    postsContainer.appendChild(div);

  });

}
getAllPosts()