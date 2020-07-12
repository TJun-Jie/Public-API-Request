

// Generating 1 user's html
function creatingCard(user) {
    // variables
    const gallery = document.querySelector('#gallery')

    // card div
    const card = createElement('div');

    // Image div
    const cardImageContainer = createElement('div');
    const imgCard = createElement('img');

    // card info div
    const cardInfoContainer = createElement('div');
    const cardName = createElement('h3');
    const cardEmail = createElement('p');
    const cardLocation = createElement('p');

    // add classes to all the different sections and append them to the html
    function generatingCardHtml() {
        card.classList.add('card');
        
        cardImageContainer.classList.add('card-img-container');
        
        imgCard.classList.add('card-img');
        cardImageContainer.appendChild(imgCard);
        
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
        imgCard.src = user.picture.large
        cardName.textContent = `${user.name.first} ${user.name.last}`
        cardEmail.textContent = `${user.email}`
        cardLocation.textContent = user.location.state  
    }
    generatingCardHtml()
    createcard(user)




    



}

function createElement(element) {
    return document.createElement(element);
}
function addClass(element, selectedClass) {
    element.classList.add(selectedClass);
}

fetch('https://randomuser.me/api/?results=12')
.then( res => res.json())
.then( data => {
    gettingAllUsers(data)
})
.catch(error => console.log('Looks like there was a problem!', error))



function gettingAllUsers(data) {
    const resultsArr = data.results;

    for (let i=0; i< resultsArr.length; i++) {
        creatingCard(resultsArr[i]);
        addModalWindow(resultsArr[i])
        addCardEventListener(i)
        

    }
}



function addModalWindow(user) {
    // Creating modal elements
    const modalContainer = createElement('div');
    const modal = createElement('div');
    const button =  createElement('button');
    const modalInfoContainer = createElement('div');
    const imgModal  = createElement('img');
    const modalName = createElement('h3');
    const modalEmail = createElement('p');
    const modalCity = createElement('p');
    const hr = createElement('hr');
    const modalCode =createElement('p');
    const modalAddress = createElement('p');
    const modalBirthday = createElement('p');

    function createModalHtml() {
        addClass(modalContainer, 'modal-container');
        addClass(modal, 'modal');
        addClass(button, 'modal-close-btn');
        button.id = 'modal-close-btn';
        addClass(modalInfoContainer, 'modal-info-container');
        addClass(imgModal, 'modal-img');
        addClass(modalName, 'modal-name');
        addClass(modalName, 'cap');
        modalName.id = 'name';
        addClass(modalEmail, 'modal-text');
        addClass(modalCity, 'modal-text');
        addClass(modalCode, 'modal-text')
        addClass(modalAddress, 'modal-text')
        addClass(modalBirthday, 'modal-text')
        modalContainer.appendChild(modal);
        modal.appendChild(button);
        modal.appendChild(modalInfoContainer);
        modalInfoContainer.appendChild(imgModal);
        modalInfoContainer.appendChild(modalName);
        modalInfoContainer.appendChild(modalEmail);
        modalInfoContainer.appendChild(modalCity);
        modalInfoContainer.appendChild(hr);
        modalInfoContainer.appendChild(modalCode);
        modalInfoContainer.appendChild(modalAddress);
        modalInfoContainer.appendChild(modalBirthday);
        button.innerHTML= `<strong>X</strong>`
    
        document.querySelector('body').appendChild(modalContainer);
        

    }
    function addModalInfo(user) {
        imgModal.src = user.picture.large
        modalName.textContent = `${user.name.first} ${user.name.last}`
        modalEmail.textContent= user.email;
        modalCity.textContent = user.location.city;
        modalCode.textContent = user.phone;
        modalAddress.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.postcode}`
        let bday = user.dob.date.split('T')[0];
        let formatBday = bday.split('-');
        const formattedBday = `${formatBday[2]}/${formatBday[1]}/${formatBday[0]}`
        modalBirthday.textContent = `Birthday: ${formattedBday}`
        modalContainer.style.display = 'none'
    }

    button.addEventListener('click', (e) => {
        modalContainer.style.display = 'none';
    })

    addModalInfo(user)
    createModalHtml()

}


function addCardEventListener(index) {
    const card = document.querySelectorAll('.card');
    const modalContainer = document.querySelectorAll('.modal-container')
    card[index].addEventListener('click', () => {
        modalContainer[index].style.display = 'block';
    })
}

