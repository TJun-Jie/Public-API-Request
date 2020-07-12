

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
        cardLocation.textContent = `${user.location.state}, ${user.location.country}`  
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
    const modalPhone =createElement('p');
    const modalAddress = createElement('p');
    const modalBirthday = createElement('p');
    const modalButtonContainer = createElement('div');
    const modalButtonPrev = createElement('button');
    const modalButtonNext=  createElement('button');

//     <div class="modal-btn-container">
//     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//     <button type="button" id="modal-next" class="modal-next btn">Next</button>
// </div>

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
        addClass(modalPhone, 'modal-text')
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
        modalInfoContainer.appendChild(modalPhone);
        modalInfoContainer.appendChild(modalAddress);
        modalInfoContainer.appendChild(modalBirthday);
        button.innerHTML= `<strong>X</strong>`

        modalButtonContainer.classList.add('modal-btn-container');
        modalButtonPrev.type = 'button';
        modalButtonNext.type = 'button';
        modalButtonPrev.id = 'modal-prev';
        modalButtonNext.id = 'modal-next';
        modalButtonPrev.classList.add('modal-prev', 'button');
        modalButtonNext.classList.add('modal-next', 'button');
        modalButtonPrev.textContent = 'Prev';
        modalButtonNext.textContent = 'Next';
        modalButtonContainer.appendChild(modalButtonPrev)
        modalButtonContainer.appendChild(modalButtonNext)
        modalContainer.appendChild(modalButtonContainer);
        
        

    
        document.querySelector('body').appendChild(modalContainer);
        

    }
    function addModalInfo(user) {
        imgModal.src = user.picture.large
        modalName.textContent = `${user.name.first} ${user.name.last}`
        modalEmail.textContent= user.email;
        modalCity.textContent = user.location.city;
        // formatting of phone numbers
        const phone = user.phone;
        const allNumbers = phone.replace(/[\D]/g , '')
        const formatPhone = `(${allNumbers.slice(0,3)}) ${allNumbers.slice(3,6)}-${allNumbers.slice(6)}`
        modalPhone.textContent = formatPhone
        console.log(user.location)
        modalAddress.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.nat} ${user.location.postcode}`
        let bday = user.dob.date.split('T')[0];
        let formatBday = bday.split('-');
        const formattedBday = `${formatBday[2]}/${formatBday[1]}/${formatBday[0]}`
        modalBirthday.textContent = `Birthday: ${formattedBday}`
        modalContainer.style.display = 'none'
    }

    button.addEventListener('click', (e) => {
        modalContainer.style.display = 'none';
    })

    modalButtonPrev.addEventListener('click', (e) => {
        prevModal = modalContainer.previousElementSibling
        modalContainer.style.display = 'none'
        if(prevModal) {
            prevModal.style.display = "block";
        }
    })
    modalButtonNext.addEventListener('click', (e) => {
        nextModal = modalContainer.nextElementSibling
        modalContainer.style.display = 'none'
        if(nextModal) {
            nextModal.style.display = "block";
        }
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

function searchBar() {
    const searchBarHtml = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
    const searchDiv = document.querySelector('.search-container');
    searchDiv.innerHTML = searchBarHtml;

}
searchBar()

function searchEmployees() {
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('#search-input')
    searchForm.addEventListener('submit', () => {
        const allCards =document.querySelectorAll('.card');
        // nothing in input so we are going to show all 12 employees
        if (searchInput.value === '') {
            for ( let i = 0 ; i < allCards.length; i ++ ) {
                allCards[i].style.display =  'block'                
            }
        }
        // There is something in the search
        else {          
            for ( let i = 0 ; i < allCards.length; i ++ ) {
                const cardName = allCards[i].querySelector('.card-name').textContent;
                // accepts cases where user types lower case or with upper casing
                if(!cardName.toLowerCase().includes(searchInput.value) || !cardName.toLowerCase().includes(searchInput.value)) {
                    allCards[i].style.display = 'none'
                }
            }
        }
    })
    
}
searchEmployees()


