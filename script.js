// script.js

let happiness = 50;
let hunger = 50;
let energy = 50;

const petImage = document.getElementById('petImage');
const errorMessage = document.getElementById('errorMessage');

// Function to fetch a new cat picture
async function getNewCat() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    if (!response.ok) throw new Error('Failed to fetch cat image.');
    
    const data = await response.json();
    petImage.src = data[0].url; // Set the image URL
    errorMessage.textContent = ''; // Clear error message
  } catch (error) {
    console.error(error);
    errorMessage.textContent = 'Could not fetch a new cat image. Please try again.';
  }
}

// Call getNewCat when the page loads
getNewCat();

// Update stats every second
setInterval(updateStats, 1000);

function updateStats() {
  hunger -= 1; // Hunger increases over time
  energy -= 1; // Energy decreases over time
  happiness -= 1; // Happiness decreases over time

  // Update stats on the screen
  document.getElementById('happiness').textContent = happiness;
  document.getElementById('hunger').textContent = hunger;
  document.getElementById('energy').textContent = energy;

  // Check if the pet is in danger
  if (hunger <= 0 || energy <= 0 || happiness <= 0) {
    document.getElementById('status').textContent = "Oh no! Your cat needs attention!";
    clearInterval(updateStats);
  } else {
    document.getElementById('status').textContent = "Your cat is doing okay!";
  }
}

// Actions
function feedPet() {
  hunger += 10;
  if (hunger > 100) hunger = 100;
  document.getElementById('status').textContent = "You fed your cat!";
}

function playWithPet() {
  happiness += 10;
  energy -= 5; // Playing uses energy
  if (happiness > 100) happiness = 100;
  document.getElementById('status').textContent = "You played with your cat!";
}

function restPet() {
  energy += 10;
  if (energy > 100) energy = 100;
  document.getElementById('status').textContent = "Your cat is resting!";
}

// Add event listener to the "Get a New Cat Picture" button
document.getElementById('newCatBtn').addEventListener('click', getNewCat);
