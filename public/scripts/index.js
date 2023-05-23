
var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);

function submitReview(){
const userNameInput = document.getElementById('traveller');
const userNumberInput = document.getElementById('traveller_id');
const userEmailInput = document.getElementById('traveller_email');


const placeInput = document.getElementById('place');
const placeNumberInput = document.getElementById('place_id');

const reviewInput = document.getElementById('review');
const rateInput = document.getElementById('rate');

const placeSearchInput = document.getElementById('search-place');




const reviewForm = document.getElementById('review-form');
const searchInputForm = document.getElementById('search-input');

const reviewShowBtn = document.getElementById('show-review');
const reviewOutput = document.getElementById('show');

const rateShowBtn = document.getElementById('show-rate');


searchInputForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  var findPlace = placeSearchInput.value.trim();
  console.log(findPlace);
  // getPlaceReviews(findPlace);
  // renderReviews(id);
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
    traveller_id: userNumberInput.value.trim(),
	  traveller: userNameInput.value.trim(),
    traveller_email: userEmailInput.value.trim(),
    place: placeInput.value.trim(),
    place_id: placeNumberInput.value.trim(),
    review_text: reviewInput.value.trim(),
    rate: rateInput.value.trim(),
  };

  

  postReview(newReview)
    .then((data) => alert(`Review added! Review ID: ${data.body.review_id}`))
    .catch((err) => console.error(err));

  
    localStorage.setItem(timeStamp, JSON.stringify(newReview));
});

//render existing reviews
const getReviews = async () => {
  const result = await fetch('/api/reviews', {
    method: 'GET',
  });
  const json = await result.json();
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
    place.innerHTML = `<a href=${id.place_url}>${id.place}</a>`;
    review.appendChild(rate);
    place.appendChild(review);
    reviewOutput.appendChild(place);
  
};

// const renderPlaceReviews = (????) => {
//   const review = document.createElement('td');
//   const rate = document.createElement('p');
//   const place = document.createElement('tr');

//   place.classList.add('jumbotron2');
//   review.classList.add('jumbotron2');
//   rate.classList.add('jumbotron2');

//   review.innerText = review_id.review_text;
//   rate.innerText = review_id.rate;
//   place.innerHTML = `<a href=${review_id.place_url}>${review_id.place}</a>`;
//   review.appendChild(rate);
//   place.appendChild(review);
//   reviewOutput.appendChild(place);

// };




const getAndRender = () =>
  //getReviews().then((response) => response.forEach((review_id) => renderReviews(review_id)));
  getReviews().then((response) => response.forEach((id) => renderReviews(id)));


reviewShowBtn.addEventListener('click', getAndRender);
};

submitReview();
