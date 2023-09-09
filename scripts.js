
const userContainer = document.querySelector(".user-list");
const filter=document.querySelector('filter')
const next = document.querySelector(".pageN");
const prev= document.querySelector(".pageP");
let currentpage = 1;
const totalPages=42;

// buscar usuários

const fetchUsers = async (page) => {
  const Response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
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
    cardInfo.innerHTML += `
      <h1> ${user.name}</h1>
      <br>
      
      <h3>Status: ${user.status}</h3>
      <div id='status'>
      <div class='statusColor ${
        user.status == 'Dead'
          ? 'dead'
          : user.status == 'Alive'
          ? 'alive'
          : 'unknown'
      }'>
      </div>
      <span>${user.status}</span>
      </div>
      <h3>Species: ${user.species}</h3>
      
      <h3> Last known location:</h3>
      <p>${user.location.name}</p>
      
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




renderUsers(currentpage)


