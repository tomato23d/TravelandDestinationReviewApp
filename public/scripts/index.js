
var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);

function submitReview(){

//const userNameInput = document.getElementById('traveller');
//const userEmailInput = document.getElementById('traveller_email');


///inputs////outputs
const reviewInput = document.getElementById('review');
const rateInput = document.getElementById('rate');
//const userNumberInput = document.getElementById('traveller_id');
const placeInput = document.getElementById('place_name');

const placeNumberInput = document.getElementById('place_id');

const placeCreate = document.getElementById('create-place');
const getRate = document.getElementById('get-rate');

const reviewOutput = document.getElementById('show');

////forms///
const placeSearchInput = document.getElementById('search-place');
const reviewForm = document.getElementById('review-form');
const searchInputForm = document.getElementById('search-input');

const createPlaceForm = document.getElementById('form-create-place');
//const getRateForm = document.getElementById('form-get-rate');//


///buttons///
const reviewShowBtn = document.getElementById('show-review');
const rateShowBtn = document.getElementById('show-rate');




/////create new place - test/////////////
createPlaceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var placeCreated = placeCreate.value.trim();


    const newPlace = {
      place_name: placeCreated,
      place_url: "www.google.com",
      place_type: "active"
};
console.log("place to create: " + newPlace);

postPlace(newPlace);
})


const postPlace = (place) =>
  
  fetch('/api/places', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(place),

  })
 
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST Place request:', data);
      //JSON.stringify(place) is a string record without id
      //data is record with id and unquoted record fields
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

//////////create new place - test >>>>>>>

//////////search bar for place and get average review rate ///////
searchInputForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  var findPlace = placeSearchInput.value.trim();
  console.log("place to find: " + findPlace);
  getPlaceReviews(findPlace).then((response) => response.forEach((id) => renderReviews(id)));

  getRateAve(findPlace).then((response) => {if(response.place_name === findPlace){renderRateAve(response.AveRate)}});
  });

        //////// place  
const getPlaceReviews = async (findPlace) => {
  const result = await fetch(`/api/reviews/${findPlace}`, {
    method: 'GET',
  });

  const json = await result.json();
  //console.log(json);
  return json;
};


        /////average review rate
const getRateAve = async (findPlace) => {
  const result = await fetch(`/api/reviews/${findPlace}/rate`, {
    method: 'GET',
  });
  const json = await result.json();
  console.log("await for the rate");
  console.log(json);
  return json;
};


const renderRateAve = () => {
  const sqlRate = document.createElement('par');
  console.log(sqlRate);
  sqlRate.innerText = response;
  getRate.appendChild(sqlRate);
};

//////////search bar >>>>>>>>

/////////// post review on form //////////////

const postReview = (review) =>
  
  fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST Review request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

// Submit the form with the new review record
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

//   var cPlace = placeInput.value.trim();
// //// check if placeInput exists in Place Model
// // if yes - go to const newReview
// // if no - run postPlace and return
//   console.log("line 123: " + cPlace);

// // query Place model with the place input
//  const getPlace = async (cPlace) => {
//   const result = await fetch(`/api/places/${cPlace}`, {
//     method: 'GET',
//   });

//   const json = await result.json();
//   console.log(json);
//   var cPlaceDB = place_name.value.trim();
//   console.log(cPlaceDB);
//   return json;
// };
// // match place input with get place from DB 
// if(cPlace != cPlaceDB){postPlace(cPlace)};


  const newReview = {
    review_text: reviewInput.value.trim(),
    rate: parseInt(rateInput.value.trim()),
    //traveller_id: userNumberInput.value.trim(),
    traveller_id: 1,
    //place_id: 5,
    place_name: placeInput.value.trim(),
  };

  //console.log(newReview);

  postReview(newReview)
 // getPlace(cPlace);
   
    //localStorage.setItem(timeStamp, JSON.stringify(newReview));
});

/////////// post review on form >>>>>>>>>>>>>>>

/////render ALL existing reviews ////
const getReviews = async () => {
  const result = await fetch('/api/reviews', {
    method: 'GET',
  });
  const json = await result.json();
  console.log(json);
  return json;
};



const renderReviews = (id) => {
    const review = document.createElement('td');
    const rate = document.createElement('p');
    const place = document.createElement('tr');

    place.classList.add('jumbotron2');
    review.classList.add('jumbotron2');
    rate.classList.add('jumbotron2');

    review.innerText = id.review_text;
    //rate.innerText = id.averageRate;
    rate.innerText = id.rate;
    place.innerHTML = `<a href=${id.place.place_url}>${id.place.place_name}</a>`;
    review.appendChild(rate);
    place.appendChild(review);
    reviewOutput.appendChild(place);
  
};


const getAndRender = () =>
  getReviews().then((response) => response.forEach((id) => renderReviews(id)));

reviewShowBtn.addEventListener('click', getAndRender);

/////render ALL existing reviews >>>>>>>>>>>>>>>.




};

submitReview();
