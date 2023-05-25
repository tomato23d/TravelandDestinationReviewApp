
var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);

function submitReview(){
const userNameInput = document.getElementById('traveller');
const userEmailInput = document.getElementById('traveller_email');



///inputs////
const reviewInput = document.getElementById('review');
const rateInput = document.getElementById('rate');
const userNumberInput = document.getElementById('traveller_id');
const placeInput = document.getElementById('place_name');

const placeNumberInput = document.getElementById('place_id');

////forms///
const placeSearchInput = document.getElementById('search-place');
const reviewForm = document.getElementById('review-form');
const searchInputForm = document.getElementById('search-input');

///buttons///
const reviewShowBtn = document.getElementById('show-review');
const rateShowBtn = document.getElementById('show-rate');


const reviewOutput = document.getElementById('show');


searchInputForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  var findPlace = placeSearchInput.value.trim();
  console.log(findPlace);
  getPlaceReviews(findPlace).then((response) => response.forEach((id) => renderReviews(id)));
  });


//test render
const getPlaceReviews = async (findPlace) => {
  const result = await fetch(`/api/reviews/${findPlace}`, {
    method: 'GET',
  });

  const json = await result.json();
  console.log(json);
  return json;
};


  ///////

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
      console.log('Successful POST request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

// Submit the form with the new review record
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newReview = {
    review_text: reviewInput.value.trim(),
    rate: rateInput.value.trim(),
    traveller_id: userNumberInput.value.trim(),
    place_id: placeNumberInput.value.trim()

	  // traveller: userNameInput.value.trim(),
    // traveller_email: userEmailInput.value.trim(),
    // place: placeInput.value.trim(),
  };

  

  postReview(newReview)
    .then((data) => alert(`Review added! Review ID: ${data.body.id}`))
    .catch((err) => console.error(err));

  
    localStorage.setItem(timeStamp, JSON.stringify(newReview));
});

//render existing reviews
const getReviews = async () => {
  const result = await fetch('/api/reviews', {
    method: 'GET',
  });
  const json = await result.json();
 // console.log(json);
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
  //getReviews().then((response) => response.forEach((review_id) => renderReviews(review_id)));
  getReviews().then((response) => response.forEach((id) => renderReviews(id)));


reviewShowBtn.addEventListener('click', getAndRender);
};

submitReview();
