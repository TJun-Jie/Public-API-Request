

// Generating 1 user's html
function creatingCard(user) {
    // variables
    const gallery = document.querySelector('#gallery')

    // card div
    const card = document.createElement('div');

    // Image div
    const cardImageContainer = document.createElement('div');
    const img = document.createElement('img');

    // card info div
    const cardInfoContainer = document.createElement('div');
    const cardName = document.createElement('h3');
    const cardEmail = document.createElement('p');
    const cardLocation = document.createElement('p');

    // add classes to all the different sections and append them to the html
    function generatingHtml() {
        card.classList.add('card');
        
        cardImageContainer.classList.add('card-img-container');
        
        img.classList.add('card-img');
        cardImageContainer.appendChild(img)
        
        cardName.classList.add('card-name');
        cardName.classList.add('cap');
        cardName.id = 'name';
        
        cardEmail.classList.add('card-text');
        
        cardLocation.classList.add('card-text');
        cardLocation.classList.add('cap');
        cardInfoContainer.appendChild(cardName);
        cardInfoContainer.appendChild(cardEmail);
        cardInfoContainer.appendChild(cardLocation);
        
        card.appendChild(cardImageContainer);
        card.appendChild(cardInfoContainer)
        
        gallery.appendChild(card)

    }

    // Add the data received to the html
    function createcard(user){
        img.src = user.picture.large
        cardName.textContent = `${user.name.first} ${user.name.last}`
        cardEmail.textContent = `${user.email}`
        cardLocation.textContent = user.location.state  
    }
    generatingHtml()
    createcard(user)

}



fetch('https://randomuser.me/api/?results=12')
.then( res => res.json())
.then( data => gettingAllUsers(data))
.catch(error => console.log('Looks like there was a problem!', error))



function gettingAllUsers(data) {
    const resultsArr = data.results;

    for (let i=0; i< resultsArr.length; i++) {
        creatingCard(resultsArr[i]);
    

    }
}

