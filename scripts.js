const userContainer = document.querySelector('.user-list')

// buscar usuários
async function fetchUsers() {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character')
    // quando sucesso, o axios retorna os dados no campo data.
    // essa api tem um array data com os usuários
    const chars = response.data
    const users=chars.results
    console.log(users)

    users.forEach(user => {
      const userCard = document.createElement('div')
      userCard.classList.add('user-card')

      userCard.innerHTML = `
        <img src="${user.image}" alt="">
        <h2>Name: ${user.name}</h2>
        <h3>Status: ${user.status}</h3>
        <h3>Status: ${user.species}</h3>
        <h4>Visto ultima vez em:</h4>
        <p>${user.location.name}</p>
        
      `
      userContainer.appendChild(userCard)
    })

  } catch (error) {
    console.log('Erro ao buscar usuários', error)
  }
}

fetchUsers()