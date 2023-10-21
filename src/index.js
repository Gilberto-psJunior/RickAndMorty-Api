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

      <a class="col-lg-4 col-md-6 col-sm-12   pb-5 d-flex justify-content-center  " data-bs-toggle="modal" data-bs-target="#Modal-${index}">
      
       
         <div  class="card  " style="width: 20rem ; padding="20px">
         <img src="${user.image}"  class="card-img-top" alt="...">
         
         
         <div data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-body">
          <h5 class="fs-1  text-center">${user.name}</h5>
         
          <hr>
          <ul class="mods list-group list-group-flush">
          <li class="mods "> <h5 class="card-text text-center"> Species: <em>${user.species}</em></h5></li>
           <li class="mods ">
             <div id='status' class="text-center">
                <div id="spanStatus" >Status: <em> ${user.status} </em><div class='statusColor ${
                  user.status == "Dead"
                    ? "dead"
                    : user.status == "Alive"
                    ? "alive"
                    : "unknown"
                }'>
                </div>
           </li></div>
              
              
              </div>
         
         
              </div>
          </ul>
               </div>
             </div>
       </a>
    </div>
    <div class="modal rounded-5 border border-5 border-secondary " id="Modal-${index}" tabindex="-1">
  <div class="modal-dialog   ">
    <div class="modal-content under  border  d-flex justify-content-center">
      
        <h5  class="shadow-sm mb-0  bg-white  rounded rounded name fs-1 text-center" >${user.name}</h5>
        
        <div class="modal-header under  mb-0  d-flex justify-content-center"><img src="${user.image}"  class="modal-img rounded-5 d-flex justify-content-center  border-success " alt="..."> </div>
     
      
      <ul class="h-75 mods under list-group list-group-flush rounded-5 ">
      <li class="list-group-item"><h5 id="spanStatus" class="card-text text-center fs-3 "> Species: ${user.species}</h5></li>
      <li class="list-group-item"><div id='status' class="text-center ">
         <div id="spanStatus" >Status: ${user.status} <div class=' statusColor ${
           user.status == "Dead"
             ? "dead"
             : user.status == "Alive"
             ? "alive"
             : "unknown"
         }'>
         </div></div></li>
         <li class="text-center list-group-item"><h5 id="spanStatus" class="card-text"> Last known location:</h5>
         <p>${user.location.name}</p>
         </li>
         <li  class="text-center list-group-item"><p id="spanStatus">Last seen in episode: </p><p>${lastEpisodeName}</p>
         <hr>
         <button class="button btn btn-danger" role="button">Close</button>
         </div>
      
      </li>
      
      </ul>
      
      
      
      
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
    document.getElementsByClassName("btnN").disabled = true;
    
    fetchRender(currentpage,searchCharacter.value);
  }
  
 
 
});

prev.addEventListener("click", () => {
  if (currentpage > 1) {
    
    userContainer.innerHTML = "";
    currentpage -= 1;
    
    fetchRender(currentpage,searchCharacter.value);
  }
  else
  if(currentpage==1){
    document.getElementById("btnP").disabled = true;
    document.getElementById("btnP").style="background-color: rgb(0, 0, 0)!important;"
  }
});

function hide() {
  if (currentpage > 1) {
    prev.style.display = "none";
    next.style.display = "block";
  }
}


fetchRender();
