const userContainer = document.querySelector(".user-list");
const filter = document.querySelector("filter");
const next = document.querySelector(".pageN");
const prev = document.querySelector(".pageP");
let currentpage = 1;
const totalPages = 42;
let episodeChar = 0;

// buscar usuários

const fetchUsers = async (page, episodes) => {
  try { 
    const Response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const episodios = await fetch(episodes);
  const data = await Response.json();
  console.log(data);
  return data.results;
    
  } catch (error) {
    console.log(error,"Error");
    
  }
 
};

const renderUsers = async (page) => {
  try { const data = await fetchUsers(page);

    data.forEach((user) => {
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
 
};



next.addEventListener("click", async () => {
  if (currentpage <= 40) {
    currentpage += 1;
    userContainer.innerHTML = "";
    prev.style.display = "block";
    renderUsers(currentpage);
  } else {
    next.style.display = "none";
  }
});

prev.addEventListener("click", async () => {
  if (currentpage >= 2) {
    currentpage -= 1;
    userContainer.innerHTML = "";
    renderUsers(currentpage);
    next.style.display = "block";
  } else {
    prev.style.display = "none";
  }
});


renderUsers(currentpage);
