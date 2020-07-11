

// Generating gallery 
const gallery = document.querySelector('#gallery')
const card = document.createElement('div');
card.classList.add('card');

const cardImageContainer = document.createElement('div');
cardImageContainer.classList.add('card-img-container');

const img = document.createElement('img');
img.classList.add('card-img');
cardImageContainer.appendChild(img)


const cardInfoContainer = document.createElement('div');

const cardName = document.createElement('h3');
cardName.classList.add('card-name');
cardName.classList.add('cap');
cardName.id = 'name';

const cardEmail = document.createElement('p');
cardEmail.classList.add('card-text');

const cardLocation = document.createElement('p');
cardLocation.classList.add('card-text');
cardLocation.classList.add('cap');

cardInfoContainer.appendChild(cardName);
cardInfoContainer.appendChild(cardEmail);
cardInfoContainer.appendChild(cardLocation);

card.appendChild(cardImageContainer);
card.appendChild(cardInfoContainer)

gallery.appendChild(card)



// <div class="card">
// <div class="card-img-container">
//     <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
// </div>
// <div class="card-info-container">
//     <h3 id="name" class="card-name cap">first last</h3>
//     <p class="card-text">email</p>
//     <p class="card-text cap">city, state</p>
// </div>
// </div>

fetch('https://randomuser.me/api/')
.then( res => res.json())
.then( data => addingUser(data))
.catch(error => console.log('Looks like there was a problem!', error))


function addingUser(data) {
    img.src = data.results[0].picture.large
}