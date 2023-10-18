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
    

    users.forEach((user,index) => {
      
      const lastEpisodeUrl = user.episode[user.episode.length - 1];
      api
        .get(lastEpisodeUrl)
        .then((response) => {
          const lastEpisode = response.data;
          const lastEpisodeName = lastEpisode.name;

    
      userContainer.innerHTML += `

      <div  class="col pb-5   d-flex justify-content-center ">
      
       <a class="col" data-bs-toggle="modal" data-bs-target="#exampleModal-${index}" href="">
         <div class="card " style="width: 18rem ; padding="">
         <img src="${user.image}" class="card-img-top" alt="...">
         
         
         <div data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-body">
          <h5 class="fs-3 card-title text-center">${user.name}</h5>
         
          <hr>
          <h5 class="card-text text-center"> Species:${user.species}</h5>
           <div id='status' class="text-center">
              <div id="spanStatus" >Status: ${user.status} <div class='statusColor ${
                user.status == "Dead"
                  ? "dead"
                  : user.status == "Alive"
                  ? "alive"
                  : "unknown"
              }'>
              </div></div>
              
              
              </div>
         
         
              </div>
          
               </div>
             </div>
       </a>
    </div>
    <div class="modal mods" id="exampleModal-${index}" tabindex="-1">
  <div class="modal-dialog mods d-flex justify-content-center">
    <div class="modal-content d-flex justify-content-center">
      
        <h5  class=" fs-2 text-center" >${user.name}</h5>
        <img src="${user.image}" class="card-img-top" alt="...">
      
      <div class="modal-body">
      <h5 id="spanStatus" class="card-text text-center fs-3 "> Species: ${user.species}</h5>
      <div id='status' class="text-center ">
         <div id="spanStatus" >Status: ${user.status} <div class=' statusColor ${
           user.status == "Dead"
             ? "dead"
             : user.status == "Alive"
             ? "alive"
             : "unknown"
         }'>
         </div></div>
         <h5 id="spanStatus" class="card-text"> Last known location:</h5>
         <p>${user.location.name}</p>
         <p id="spanStatus">Last seen in episode: </p><p>${lastEpisodeName}</p>
         </div>
      </div>
      <div class="modal-footer d-flex justify-content-center ">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    
         `;
         
        })
        .catch((error) => console.log(error)); });
   
    console.log(currentpage);
  } catch (error) {
    console.log(error, "render characters error");
  }
}



async function searchLastEp(urlEpisodio) {
  try {
    const response = await axios.get(urlEpisodio);
    const ultimoEpisodio = response.data;
    console.log("ultimoEpisodio.name");
    return ultimoEpisodio.name;
  } catch (error) {
    console.error("Error getting last episode details:", error);
    return "Error getting episode details";
  }
}
searchCharacter.addEventListener("input", (event) => {
  fetchRender(currentpage, searchCharacter.value);
  userContainer.innerHTML = "";
});

next.addEventListener("click", () => {
  if (currentpage <=41) {
    userContainer.innerHTML = "";
    currentpage += 1;
    prev.style.display='block';
   
    
    fetchRender(currentpage,searchCharacter.value);
  }
  
 
 
});

prev.addEventListener("click", () => {
  if (currentpage > 1) {
    
    userContainer.innerHTML = "";
    currentpage -= 1;
    
    fetchRender(currentpage,searchCharacter.value);
  }
});

function hide() {
  if (currentpage > 1) {
    prev.style.display = "none";
    next.style.display = "block";
  }
}

fetchRender();
