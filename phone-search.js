const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    searchField.value = '';
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResults(data.data))
}

const displaySearchResults = data => {
    console.log(data);
    const searchResultDiv = document.getElementById('search-result-section');
    data.forEach(phone => {
        const Div = document.createElement('div');
        Div.classList.add('col');
        Div.innerHTML = ` <div class="col">
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <p class="card-text"></p>
                <p class="card-text"></p>
            </div>
        </div>
    </div> ` ;
        searchResultDiv.appendChild(Div);
        console.log(phone)


    })
}