//==============================
//public API request 
//==============================

// async function to fetch data
async function getUsersData() {
    let response =  await fetch('https://randomuser.me/api/?results=12');
    let data = await response.json()
    return data
}

getUsersData()
.then( data => {
    gettingAllUsers(data)
})
.catch(error => console.log('Looks like there was a problem!', error))


// main function which receives the data of all 12 users
function gettingAllUsers(data) {
    const users = data.results;
    let cardMarkup = ``;
    // iterating through every single users
    for (let i=0; i< users.length; i++) {
        // Loop through all users and add all their html together
        cardMarkup +=creatingCard(users[i]);
        // Create modal div for each user
        modalEvents(users[i]);
          
    }
    // Add html of all the user's card to the gallery
    document.querySelector('#gallery').innerHTML = cardMarkup;
    // add click listener to open modal window when clicked
    addAllCardEventListener();

    // create search bar
    searchBar()

    // add search bar functionality
    searchEmployees()
    
}

// Generating 1 user's html
function creatingCard(user) {

    return `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.state}, ${user.location.country}</p>
        </div>
    </div>
    `    

}


function modalEvents(userData) {
    // create modal div
    const modal  = document.createElement('div')
    modal.classList.add('modal-container')
    // make the modal div invisible initially and only show it when user clicks the card
    modal.style.display = 'none'
    // add user's data into modal 
    modal.innerHTML = addModalWindow(userData)
    // Add modal div to the body html
    document.querySelector('body').appendChild(modal)  

    // adding close button event listener
    const closeButton  = modal.querySelector('#modal-close-btn')
    closeButton.addEventListener('click', (e) => {
        modal.style.display = 'none';
    })

    // adding prev button event listener
    const modalButtonPrev = modal.querySelector('#modal-prev');
    modalButtonPrev.addEventListener('click', (e) => {
        const prevModal = modal.previousElementSibling
        modal.style.display = 'none'
        if(prevModal) {
            prevModal.style.display = "block";
        }
    })
    // adding next button event listener
    const modalButtonNext = modal.querySelector('#modal-next');
    modalButtonNext.addEventListener('click', (e) => {
        const nextModal = modal.nextElementSibling
        modal.style.display = 'none'
        if(nextModal) {
            nextModal.style.display = "block";
        }
    })
}

// Receives user's data and create modal's html together with the user's data
function addModalWindow(user) {
    // format phone 
    const phone = user.phone;
    const allNumbers = phone.replace(/[\D]/g , '')
    const formatPhone = `(${allNumbers.slice(0,3)}) ${allNumbers.slice(3,6)}-${allNumbers.slice(6)}`

    // format bday
    let bday = user.dob.date.split('T')[0];
    let formatBday = bday.split('-');
    
    return `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.state}</p>
            <hr>
            <p class="modal-text">${formatPhone}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.nat} ${user.location.postcode}</p>
            <p class="modal-text">${formatBday[2]}/${formatBday[1]}/${formatBday[0]}</p>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>
            `;
                      
        
                    }
                    
                    
// add click listener on 1 card to open modal when clicked
function addOneCardEventListener(index) {
    const card = document.querySelectorAll('.card');
    
    // link the modal div to the card section
    const modalContainer = document.querySelectorAll('.modal-container')
    card[index].addEventListener('click', () => {
        console.log('clicked')
        modalContainer[index].style.display = 'block';
    })
}

//  add click listener to all cards
function addAllCardEventListener() {
    const card = document.querySelectorAll('.card');
    for (let i = 0 ; i < card.length ; i ++ ) {
        addOneCardEventListener(i);
    }
}

// create search bar 
function searchBar() {
    const searchBarHtml = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    const searchDiv = document.querySelector('.search-container');
    searchDiv.innerHTML = searchBarHtml;
    
}

// search employees functionality
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
                // if input matches card name then we will show it , if it does not match, we will hide that card
                const cardName = allCards[i].querySelector('.card-name').textContent;
                // accepts cases where user types lower case or with upper casing
                if(!cardName.toLowerCase().includes(searchInput.value) || !cardName.toLowerCase().includes(searchInput.value)) {
                    allCards[i].style.display = 'none'
                }
            }
        }
    })   
}



