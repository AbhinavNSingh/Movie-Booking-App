 /*
 step1: Get References to DOM Elements
 */
//Get a reference to the main container
const container = document.querySelector(".container");

//Get a reference for all available seats
const seats = document.querySelectorAll(".row .seat:not(.sold)");

//Get a reference for the count and total elements
const total = document.getElementById("total");
const count = document.getElementById("count");

//Get a reference for movie dropdown
const movieSelect = document.getElementById("movie");




 /*
 Step2: Add Event Listeners to book seats
 */

//Event Listerner for Movie Sleection change
movieSelect.addEventListener("change", e=>{
//update ticket price and store selected movie data
ticketPrice = e.target.value;
setMovieData(e.target.selectedIndex, e.target.value);

// update displayed count and total
updateSelectedCount();
});

// Event Listener for Seat clicks
container.addEventListener("click", e=>{

    //check if seat if clicked and not sold
    if(e.target.classList.contains("seat") && !e.target.classList.contains("sold")){

        //Toggle seat Selection
    e.target.classList.toggle("selected");
    // update displayed count and total
    updateSelectedCount();


 }});

 /*
 Step3: Will Define some functions, to updated selected count and total
 */
function updateSelectedCount(){
//Get all selected seats
const selectedSeats = document.querySelectorAll(".row .seat.selected");

//Get an array of selected seats indexes
const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seats));

// Store selected seats index into local storage
localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

// calculate selected setas and count

const selectedSeatsCounts = selectedSeats.length;

//update UI with selected seats count and total price
count.innerText = selectedSeatsCounts;
total.innerText = selectedSeatsCounts * ticketPrice;

setMovieData(movieSelect.selectedIndex, movieSelect.value);

}

/*
 Step4: Define functions to set selected movie data in local storage
 */
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

 /*
 Step5: Define function to populate UI with local storage data
 */

 //function to populate UI from Local storage data'
 function populateUI(){
//get selected seats from local storage
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

//if selected seats, mark them selected

if(selectedSeats != null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected")
        }
    })
}

//get selected movie data fro loal storage
const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

//if there's a selecte dmovie index then set it in the dropdown

if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
}


 }

 /*
 Step6: Intial Setup of count, total and UI based on Saved data
 */
 populateUI();
 //initialise ticket price
let ticketPrice = +movieSelect.value;
 updateSelectedCount();
