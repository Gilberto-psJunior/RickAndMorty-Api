const userContainer = document.querySelector(".user-list");
const filter = document.querySelector("filter");
const next = document.querySelector(".pageN");
const prev = document.querySelector(".pageP");
let currentpage = 1;
const totalPages = 42;
let episodeChar = 0;
let searchCharacter = document.querySelector("#name");

async function fetchRender(page, name = "") {
  try {
    const params = { page, name };
    const response = await api.get(`/character`, { params });

    const users = response.data.results;
    const infos = response.data.info;

    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.classList.add("card");
      const cardInfo = document.createElement("div");
      cardInfo.classList.add("card-info");

      userCard.innerHTML += `
              <img src="${user.image}" alt="">
             
              
            `;

      cardInfo.innerHTML += `
            <h1> ${user.name}</h1>
            <br>
            
            <h3>Species: ${user.species} </h3>
            
            <div id='status'>
            <span id="spanStatus" >Status: ${user.status}</span>
                <div class='statusColor ${
                  user.status == "Dead"
                    ? "dead"
                    : user.status == "Alive"
                    ? "alive"
                    : "unknown"
                }'>
                </div>
                
            </div>
            
            <h3> Last known location:</h3>
            <p>${user.location.name}</p>
            
            `;
      userCard.innerHTML += `
            
           
            
          `;

      userContainer.appendChild(userCard);
      userCard.appendChild(cardInfo);
    });
    console.log(currentpage);
  } catch (error) {
    console.log(error, "render characters error");
  }
}

searchCharacter.addEventListener("input", (event) => {
  fetchRender(currentpage, searchCharacter.value);
  userContainer.innerHTML = "";
});

next.addEventListener("click", () => {
  if (currentpage < 42) {
    userContainer.innerHTML = "";
    currentpage += 1;
    fetchRender(currentpage);
  }
});
prev.addEventListener("click", () => {
  if (currentpage > 1) {
    userContainer.innerHTML = "";
    currentpage -= 1;
    fetchRender(currentpage);
  }
});

fetchRender();
