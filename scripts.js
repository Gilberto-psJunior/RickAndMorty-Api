
const userContainer = document.querySelector(".user-list");
const filter=document.querySelector('filter')
const next = document.querySelector(".pageN");
const prev= document.querySelector(".pageP");
let currentpage = 1;
const totalPages=42;
let episodeChar=0




// buscar usuários

const fetchUsers = async (page,episodes) => {
  const Response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const episodios=await fetch(episodes)
  const data = await Response.json();
  console.log(data);
  return data.results;
};

const renderUsers = async (page) => {


  const data = await fetchUsers(page);
  
  
 

  data.forEach((user) => {
   
    const userCard = document.createElement("div");
    userCard.classList.add("card");
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
   
 
    userCard.innerHTML += `
        <img src="${user.image}" alt="">
       
        
      `;
      
      switch (user.status) {
        case "alive":
          cardInfo.innerHTML +=`<h3>Status:  ${user.status}  <p class="statusColor" ></p> </h3>`
          break;
      
        case "dead":
          break;
      }
    cardInfo.innerHTML += `
      <h1> ${user.name}</h1>
      <br>
      
      <h3>Status:  ${user.status}  <p class="statusColor" ></p> </h3>
      
      <h3>Species: ${user.species}</h3>
      
      <h3> Last known location:</h3>
      <p>${user.location.name}</p>
      
      `;
      userCard.innerHTML += `
      
     
      
    `;
     
    userContainer.appendChild(userCard);
    userCard.appendChild(cardInfo);
  });
  console.log(currentpage)
};

async function main() {
  const data = await fetchUsers(page)
 
  renderUsers({data})
}



next.addEventListener ("click",async () => {
 if (currentpage <=40) {
  currentpage+= 1;
  userContainer.innerHTML=''
  prev.style.display="block"
  renderUsers(currentpage)
  
 }
 
 
else{
  next.style.display="none"

}
  
  
  });


  prev.addEventListener ("click",async () => {
    if (currentpage >=2) {
      currentpage-= 1;
      userContainer.innerHTML=''
      renderUsers(currentpage)
      next.style.display="block"
      
     }
    else{
     
      prev.style.display="none"
    }
    
    });
async function lastEpisode(character) {
	const ep = character.episode.length - 1;
	try {
		const response = await fetch(`${character.episode[ep]}`).then((value) =>
			value.json()
		);
		return response.name;
	} catch (error) {
		console.log('Erro no Get');
	}
}


renderUsers(currentpage)


