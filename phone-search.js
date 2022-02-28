const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const searchResultDiv = document.getElementById('search-result-section');
    searchResultDiv.textContent = '';
    const singleResultDiv = document.getElementById('single-phone-details');
    singleResultDiv.textContent = '';

    if (searchText == '') {
        const searchResultDiv = document.getElementById('search-result-section');
        const Div = document.createElement('div');
        Div.innerHTML = ` <b class="text-danger"> You didn't type anything ! </b>`;
        searchResultDiv.appendChild(Div);
    }
    else {
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResults(data.data))//here 2nd '.data'  from api
    }
}

const displaySearchResults = data => {
    console.log(data);
    const searchResultDiv = document.getElementById('search-result-section');
    searchResultDiv.textContent = '';
    if (data.length == 0) {
        const Div = document.createElement('div');
        Div.innerHTML = ` <b class=" mx-auto text-center text-danger"> No Result Found </b>`;
        searchResultDiv.appendChild(Div);


    }
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
    singleResultDiv.textContent = '';
    const Div = document.createElement('div');
    Div.classList.add('card');
    Div.innerHTML = ` <img src="${phoneDetails.image}" class="card-img-top" style="width: 300px">
    <div class="card-body">
        <h5 class="card-title">${phoneDetails.name}</h5>
        <p class="card-text">Release Date: ${phoneDetails.releaseDate}</p>  
        <p class="card-text">Brand: <b>${phoneDetails.slug}</b></p>
        <p class="card-text">Chipset: <b>${phoneDetails.mainFeatures.chipSet} </b> </p>
        <p class="card-text">Memory: <b> ${phoneDetails.mainFeatures.memory}</b></p>
        <p class="card-text">Storage: <b> ${phoneDetails.mainFeatures.storage}</b></p>
        <p class="card-text">Display Size: <b> ${phoneDetails.mainFeatures.displaySize}</b></p>
        <p class="card-text">Sensors: <b>${phoneDetails.mainFeatures.sensors}</b></p>
       <p class="card-text">Other~  <br>    
                              Bluetooth: <b> ${phoneDetails.others.Bluetooth} </b>   <br>
                                    GPS: <b> ${phoneDetails.others.GPS} </b>   <br> 
                                  Radio: <b> ${phoneDetails.others.Radio} </b>   <br>
                                    USB: <b> ${phoneDetails.others.USB} </b>   <br>
                                    NFC: <b> ${phoneDetails.others.NFC} </b>
                                    WLAN: <b> ${phoneDetails.others.WLAN} </b>  <br>
                    </p>
      
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>  `;
    singleResultDiv.appendChild(Div);



}