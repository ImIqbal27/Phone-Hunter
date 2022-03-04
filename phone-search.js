///////////////// Search Phone //////////////////
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const searchResultDiv = document.getElementById('search-result-section');
    searchResultDiv.textContent = '';
    const singleResultDiv = document.getElementById('single-phone-details');
    singleResultDiv.textContent = '';
    toggleSpinner('block');
    if (searchText == '') {
        const numberOfResultsFoundDiv = document.getElementById('numberof-results-found');
        numberOfResultsFoundDiv.innerHTML = `<p class="text-danger text-center"> <b> You didn't type anything ! </b>    </p> `;
        const showAllBtn = document.getElementById('show-all');
        showAllBtn.textContent = '';
        toggleSpinner('none');

    }
    else {
        fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(info => displaySearchResults(info.data))//here 2nd '.data'=>  from api//
    }
}
////////////////////////////////////spinner/////////////////////////////
const toggleSpinner = displayStatus => {
    document.getElementById('spinner').style.display = displayStatus;
}
//////////////////////////////////// Display Search Results/////////////////////////////
const displaySearchResults = data => {
    console.log(data);
    const searchResultDiv = document.getElementById('search-result-section');
    searchResultDiv.textContent = '';
    if (data.length == 0) {
        const numberOfResultsFoundDiv = document.getElementById('numberof-results-found');
        numberOfResultsFoundDiv.innerHTML = `<p class="text-danger text-center"> <b> No phone found ! </b> </p> `;
        toggleSpinner('none');
        const showAllBtn = document.getElementById('show-all');
        showAllBtn.textContent = '';

    }
    else {
        const numberOfResultsFoundDiv = document.getElementById('numberof-results-found');
        numberOfResultsFoundDiv.innerHTML = `<p class="text-success text-center"> ${data.length} result(s) found </p> `;
        const twentyResultsShow = data.slice(0, 20);
        twentyResultsShow.forEach(phone => {
            const Div = document.createElement('div');
            Div.classList.add('col');
            Div.innerHTML = ` <div class="col mb-3">
            <div class="card h-50  text-center  image-style  card-style">
                <img src="${phone.image}" class="card-img-top mb-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                <a  onclick="loadDetail('${phone.slug}')" href="#single-phone-details" class="btn btn-success">Show Details</a>
                </div>
            </div>
        </div> 
          ` ;
            searchResultDiv.appendChild(Div);
        })

        toggleSpinner('none');

        // const bgImage = document.getElementById('container');
        // bgImage.style.backgroundColor = 'none';

        if (data.length < 21) {
            showAllDiv.style.display = 'none';
        }
        const showAllDiv = document.getElementById('show-all');
        showAllDiv.innerHTML = ` <button onclick="showAllResults()" class="mb-5  mt-5 btn btn-success mx-auto"> Show All Results </button> `;

    }
}
//////////////////////////////Load Details Fetch/////////////////////
const loadDetail = id_slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${id_slug}`;
    fetch(url).then(res => res.json()).then(info => loadPhoneDetails(info.data))  //here 2nd '.data'  from api
}
////////////////// Load Single Phone Details////////////////////////////
const loadPhoneDetails = phoneDetails => {
    console.log(phoneDetails);

    const singleResultDiv = document.getElementById('single-phone-details');
    singleResultDiv.textContent = '';
    const Div = document.createElement('div');
    Div.classList.add('card');
    if (phoneDetails.releaseDate == "") {
        phoneDetails.releaseDate = 'No release date found !';
    }

    Div.innerHTML = ` <img src="${phoneDetails.image}" class="img-fluid card-img-top mx-auto  single-image-detail" style="width: 300px">
    <div class="card-body">
        <h2 class="card-title  text-success mx-auto text-center">${phoneDetails.name}</h2>
        <p class="card-text">Release Date: ${phoneDetails.releaseDate}</p>  
        <p class="card-text">Brand: <b>${phoneDetails.brand}</b></p>
        <p class="card-text">Chipset: <b>${phoneDetails.mainFeatures.chipSet} </b> </p>
        <p class="card-text">Memory: <b> ${phoneDetails.mainFeatures.memory}</b></p>
        <p class="card-text">Storage: <b> ${phoneDetails.mainFeatures.storage}</b></p>
        <p class="card-text">Display Size: <b> ${phoneDetails.mainFeatures.displaySize}</b></p>
        <p class="card-text">Sensors: <b>${phoneDetails.mainFeatures.sensors}</b></p>
       <p class="card-text text-success">Others Info   </p>
       <p class="card-text ">   
                        Bluetooth: <b> ${phoneDetails.others ? phoneDetails.others.Bluetooth : " Not found !"} </b>   <br>
                        GPS: <b> ${phoneDetails.others ? phoneDetails.others.GPS : "Not found !"} </b>   <br> 
                        Radio: <b> ${phoneDetails.others ? phoneDetails.others.Radio : "Not found !"} </b>   <br>
                        USB: <b> ${phoneDetails.others ? phoneDetails.others.USB : "Not found !"} </b>   <br>
                        NFC: <b> ${phoneDetails.others ? phoneDetails.others.NFC : "Not found !"} </b>  <br>
                        WLAN: <b> ${phoneDetails.others ? phoneDetails.others.WLAN : "Not found !"} </b>  <br>
                    </p>
    </div>  `;
    singleResultDiv.appendChild(Div);
    toggleSpinner('none');
}
///////////////////////////////////////