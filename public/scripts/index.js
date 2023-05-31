var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);
var rateAve = "";
var findPlace = "";
var placeRateId = "";

function submitReview(){

///inputs///outputs
const reviewInput = document.getElementById('review');
const rateInput = document.getElementById('rate');
const placeInput = document.getElementById('place_name');

const getRate = document.getElementById('get-rate');

const reviewOutput = document.getElementById('show');

///forms///
const placeSearchInput = document.getElementById('search-place');
const reviewForm = document.getElementById('review-form');
const searchInputForm = document.getElementById('search-input');


///buttons///
const reviewShowBtn = document.getElementById('show-review');
const rateShowBtn = document.getElementById('show-rate');

////////search bar for place and get average review rate
searchInputForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      findPlace = placeSearchInput.value.trim();
      getPlaceReviews(findPlace).then((response) => response.forEach((id) => renderReviews(id)));
      getRateAve(findPlace);
     });


        //////// render reviews for selected place  
const getPlaceReviews = async (findPlace) => {
  const result = await fetch(`/api/reviews/${findPlace}`, {
    method: 'GET',
  });

  const json = await result.json();
  return json;
};

        //////// render reviews for selected place_end >>>>>>>  

        //////// render average review rate for selected place
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
            
         localStorage.setItem("rates", JSON.stringify(AverageRate));
         //var readRate = JSON.parse(localStorage.getItem("rates"));
         

        
       const sqlRate = document.createElement('p');
             
       sqlRate.classList.add('jumbotron4');
       sqlRate.textContent = placeRate + " Average Reviews Rate " + AverageRate.rateAve;
   
       getRate.appendChild(sqlRate);
      } 
              } ;
          
  });
};
     //////// render average review rate for selected place_end >>>>>>

  //////// render for selected place_end >>>>>>>  



/////// post review on the form 

      /////// Review post to EXISTING place route
const postReview = (review) =>
  
  fetch('/api/reviews', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(review)})
    .then((res) => res.json())
    .then((data) => {console.log('Successful POST Review request:', data);
      return data;
    })
    .catch((error) => {console.error('Error in POST request:', error);
    });
      /////// Review post to EXISTING place route_end >>>>>>>

      /////// validate if existing place and post if doesn't exists
    // const getPlace = async (cPlace) => {
    //   fetch(`/api/places/`)
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then(function (placesDB) {
    //      // console.log("places_DB", placesDB)
    //       var placesArray = [];
        
    //       for (var i = 0; i < placesDB.length; i++) {
    //         var placeName = placesDB[i].place_name;
    //         placesArray.push(placeName)
    //       };
    //     //  console.log(placesArray);
      
    //       const AA = placesArray.includes(`${cPlace}`)
         
    //       console.log(AA);
    //       if(!AA){
    //           postReview(newReviewPlace);
    //       };  
    //           postReview(newReview);
    //       })
    //      };

      /////// validate if existing place_end >>>>>


    //////// Submit the new  review form 
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  var cPlace = placeInput.value.trim();
    const newReview = {
    review_text: reviewInput.value.trim(),
    rate: parseInt(rateInput.value.trim()),
    traveller_id: 1,
    place_name: cPlace,
    place_url: "www.google.com",
    place_type: "active"
  };
  postReview(newReview);

  /// set item at timeStamp and traveller login
  //localStorage.setItem("newReview", JSON.stringify(newReview));
 
   // getPlace(cPlace);
   
 
});

    //////// Submit the new  review form_end  >>>>>>>>>>>>>>>

//////// render ALL existing reviews 
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
    rate.innerText = id.rate;
    place.innerHTML = `<a href=${id.place.place_url}>${id.place.place_name}</a>`;
    review.appendChild(rate);
    place.appendChild(review);
    reviewOutput.appendChild(place);
  
};

const getAndRender = () =>
  getReviews().then((response) => response.forEach((id) => renderReviews(id)));

reviewShowBtn.addEventListener('click', getAndRender);

//////// render ALL existing reviews_end  >>>>>>>>>>>>>>

};

submitReview();