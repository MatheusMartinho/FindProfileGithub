const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("MatheusMartinho");

async function getUser(username) {
    // fetch() starts a request and returns a promise.
    //  When the request completes,
    //  the promise is resolved with the Response object.
    //  If the request fails due to some network problems, 
    //  the promise is rejected.
    const resp = await fetch(APIURL + username);
    // The response object, returned by the await fetch(), is a generic placeholder for multiple data formats.
    // For example, you can extract the JSON object from a fetch response:
    // response.json() is a method on the Response object that lets you extract a JSON object from the response.
    //  The method returns a promise, so you have to wait for the JSON: await response.json().
    const respData = await resp.json();

    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposParaCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposParaCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count) // Ordenando os repositorios pela quantidade de estrelas
        .slice(0, 10) // Irá mostrar no máximo 10 projetos
        .forEach((repo) => { 
            const repoEl = document.createElement("a"); // Criando cada repositorio como um link
            repoEl.classList.add("repo");// para cada repositorio ele ira criar ele como um novo item com classe "repo"

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

// Quando clicar no submit ira disparar a funçao arrow que
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});


