const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    searchField.value = '';
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResults(data.data))//here 2nd '.data'  from api
}

const displaySearchResults = data => {
    // console.log(data);
    const searchResultDiv = document.getElementById('search-result-section');
    data.forEach(phone => {
        const Div = document.createElement('div');
        Div.classList.add('col');
        Div.innerHTML = ` <div class="col">
        <div onclick="loadDetail('${phone.slug}')" class="card h-100">
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
        // console.log(phone);


    })
}

const loadDetail = id_slug => {

    const url = `https://openapi.programming-hero.com/api/phone/${id_slug}`;
    fetch(url).then(res => res.json()).then(data => loadPhoneDetails(data.data))  //here 2nd '.data'  from api
}
const loadPhoneDetails = phoneDetails => {
    console.log(phoneDetails);
    const singleResultDiv = document.getElementById('single-phone-details');
    const Div = document.createElement('div');
    Div.classList.add('card');
    Div.innerHTML = ` <img src="${phoneDetails.image}" class="card-img-top" style="width: 300px">
    <div class="card-body">
        <h5 class="card-title">${phoneDetails.name}</h5>
        <p class="card-text">${phoneDetails.releaseDate}</p>
        <p class="card-text">${phoneDetails.brand}</p>
        <p class="card-text">${phoneDetails.mainFeatures.storage}</p>
        <p class="card-text">${phoneDetails.mainFeatures.displaySize}</p>
        <p class="card-text"></p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>  `;
    singleResultDiv.appendChild(Div);



}