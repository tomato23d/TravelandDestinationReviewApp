var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);
var rateAve = "";
var findPlace = "";
var placeRateId = "";

function submitReview(){

//const userNameInput = document.getElementById('traveller');
//const userEmailInput = document.getElementById('traveller_email');


///inputs////outputs
const reviewInput = document.getElementById('review');
const rateInput = document.getElementById('rate');
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



///buttons///
const reviewShowBtn = document.getElementById('show-review');
const rateShowBtn = document.getElementById('show-rate');




/////create new place - test/////////////
// createPlaceForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   var placeCreated = placeCreate.value.trim();


//     const newPlace = {
//       place_name: placeCreated,
//       place_url: "www.google.com",
//       place_type: "active"
// };
// console.log("place to create: " + newPlace);

// postPlace(newPlace);
// })


const postPlace = (newPlace) =>{
      // const newPlace = {
      // place_name: placeCreated,
      // place_url: "www.google.com",
      // place_type: "active"
      // };  

      fetch('/api/places', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newPlace),
      })
    .then((res) => res.json())}
    // .then((data) => {
    //   console.log('Successful POST Place request:', data);
    //   //JSON.stringify(place) is a string record without id
    //   //data is record with id and unquoted record fields
    //   return data;
    // })
    // .catch((error) => {
    //   console.error('Error in POST request:', error);



//////////create new place - test >>>>>>>

//////////search bar for place and get average review rate ///////
searchInputForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  findPlace = placeSearchInput.value.trim();
  console.log("place to find: " + findPlace);
  getPlaceReviews(findPlace).then((response) => response.forEach((id) => renderReviews(id)));
  getRateAve(findPlace);
  });


        //////// place  
const getPlaceReviews = async (findPlace) => {
  const result = await fetch(`/api/reviews/${findPlace}`, {
    method: 'GET',
  });

  const json = await result.json();
  return json;
};
//// place >>>>>

        /////average review rate
const getRateAve = async (findPlace) => {
  fetch(`/api/reviews/${findPlace}/rate`)
    .then(function(response){
      return response.json();
      })
    .then(function(output){console.log( "output" , output )
        for (var i=0; i < 20; i++){
          var placeRate = output[i].place_name;
          if (placeRate === findPlace){
              var AverageRate = {
                rateAve: output[i].AveRate,
                placeRateId: output[i].place_id,
              }
              console.log(AverageRate.rateAve);
              console.log(placeRate);
       //   localStorage.setItem("rates", JSON.stringify(AverageRate));

        
       const sqlRate = document.createElement('p');
              //classList.add

       sqlRate.textContent = placeRate + " Average Reviews Rate " + AverageRate.rateAve;
       console.log(sqlRate);
       getRate.appendChild(sqlRate);
      } 
              } ;
          
  });
};

//// review >>>>>

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

    /// get a place and post if doesn't exists
    const getPlace = async (cPlace) => {
      fetch(`/api/places/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (placesDB) {
          console.log("places_DB", placesDB)
          var placesArray = [];
        
          for (var i = 0; i < placesDB.length; i++) {
            var placeName = placesDB[i].place_name;
            placesArray.push(placeName)
          };
          console.log(placesArray);
      
          const AA = placesArray.includes(`${cPlace}`)
         
          console.log(AA);
          if(!AA){
              
              const newPlace = {
                place_name: cPlace,
                place_url: "www.google.com",
                place_type: "active"
                };
  
              postPlace(newPlace);
       
          };
     
           
          })
         };




// Submit the form with the new review record
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  var cPlace = placeInput.value.trim();
  const newReview = {
    review_text: reviewInput.value.trim(),
    rate: parseInt(rateInput.value.trim()),
    traveller_id: 1,
    place_name: cPlace,
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