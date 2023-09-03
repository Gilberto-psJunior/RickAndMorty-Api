const search=document.getElementsByClassName('search').value
function procu(search) {

    users.findIndex(user => {
        const userCard = document.createElement('div')
        userCard.classList.add('card')
        const cardInfo = document.createElement('div')
        cardInfo.classList.add('card-info')
        const separador = document.createElement('hr')
  
        userCard.innerHTML = `
          <img src="${user.image}" alt="">
         
         
        `
        cardInfo.innerHTML= `
        <h1> ${user.name}</h1>
        <br>
        <h3>Status: ${user.status}</h3>
        <h3>Species: ${user.species}</h3>
        <h3>Last known location:</h3>
        <p>${user.location.name}</p>
        
        `
        userContainer.appendChild(userCard)
        userCard.appendChild(cardInfo)
      })
    
}