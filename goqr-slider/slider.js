// Global variables
let sliderValue = 0;
let totalCost = 0;
let timeSaved = 0;
let inputValue = 500;

// DOM elements
const planLogo = document.getElementById("planLogo");
const h1Element = document.querySelector('.info-container h1');
const h1Element2 = document.querySelector('.info-container .h1_2');
const h2Element = document.querySelector('.info-container h2');
const h3Element1 = document.querySelector('.info-container .h3_1');
const h3Element2 = document.querySelector('.info-container .h3_2');
const h3Element3 = document.querySelector('.info-container .h3_3');
const h3Element4 = document.querySelector('.info-container .h3_4');
const slider = document.getElementById("slider");
const sliderIcon1 = document.querySelector('.slider_icon1');
const sliderIcon2 = document.querySelector('.slider_icon2');
const sliderIcon3 = document.querySelector('.slider_icon3');
const sliderIcon4 = document.querySelector('.slider_icon4');


// Input element for custom subscriber count
const inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.id = 'customTypeInput';
inputElement.placeholder = 'Custom';
inputElement.classList.add('custom-input-style');

// Calculate cost and time saved based on custom input (Global due to handler update issues)
const parsedValue = parseInt(inputValue) || 0;
const additionalCost = Math.floor(parsedValue / 100) * 20;
const baseCost = 0;
totalCost = baseCost + additionalCost;
const timeSavedPer100 = 10;
 timeSaved = Math.floor(parsedValue / 100) * timeSavedPer100;

// Input event for custom subscriber count
inputElement.addEventListener('input', function () {
    // Get value and only take in 4 numbers / no letters
    inputValue = inputElement.value.toString().trim().replace(/\D/g, '').slice(0, 4);

        // Calculate cost and time saved based on custom input
        const parsedValue = parseInt(inputValue) || 0;
        const additionalCost = Math.floor(parsedValue / 100) * 20;
        const baseCost = 0;
        totalCost = baseCost + additionalCost;
        const timeSavedPer100 = 10;
        timeSaved = Math.floor(parsedValue / 100) * timeSavedPer100;

    // Update UI with new values
    inputElement.value = inputValue;
    h2Element.textContent = `£${totalCost} Monthly cost`;
    h3Element3.textContent = `GOQR saves time! ${timeSaved}hr/per month`;
    h1Element.textContent = `${inputValue} Subscribers`;
});

// Slider event listener
slider.addEventListener("input", function () {
    updateSliderContent();
});

// Slider icon event listeners
sliderIcon1.addEventListener("click", function () { setSliderValue(0); });
sliderIcon2.addEventListener("click", function () { setSliderValue(33); });
sliderIcon3.addEventListener("click", function () { setSliderValue(68); }); //nice
sliderIcon4.addEventListener("click", function () { setSliderValue(100); });


// Function to set slider value and update content
function setSliderValue(value) {
    slider.value = value;
    updateSliderContent();
}

// Function to update content based on slider value
function updateSliderContent() {
    const sliderValue = parseInt(slider.value);

    if (sliderValue <= 32) {
        // Update content for plan 1
        updatePlanContent("src/plan-logo-1.png", "1-99 Subscribers", "<strong>£20</strong> Monthly cost", "<strong>£0</strong> Set up fee", "<strong>0%</strong> Per transaction", 10);
    } else if (sliderValue <= 66) {
        // Update content for plan 2
        updatePlanContent("src/plan-logo-2.png", "100-200 Subscribers", "<strong>£40</strong> Monthly cost", "<strong>£0</strong> Set up fee", "<strong>0%</strong> Per transaction", 20);
    } else if (sliderValue <= 99) {
        // Update content for plan 3
        updatePlanContent("src/plan-logo-3.png", "200-300 Subscribers", "<strong>£60</strong> Monthly cost", "<strong>£0</strong> Set up fee", "<strong>0%</strong> Per transaction", 30);
    } else if (sliderValue === 100) {
        // Update content for custom plan
        updateCustomPlanContent();
    }
}

// Function to update content for plans 1-3
function updatePlanContent(logoSrc, h1Text, h2Text, h3_1Text, h3_2Text, timeSaved) {
    // planLogo.src = logoSrc;
    h1Element.innerHTML = h1Text;
    h2Element.innerHTML = h2Text;
    h3Element1.innerHTML = h3_1Text;
    h3Element2.innerHTML = h3_2Text;
    // h3Element3.innerHTML = `GOQR saves time! <strong>${timeSaved}hr/per</strong> month`;
    // h3Element4.innerHTML = "Increase Monthly Revenue by <strong>30%</strong>";
    h1Element2.innerHTML = '';
}

// Function to update content for custom plan
function updateCustomPlanContent() {

    h1Element.textContent = `${inputValue} Subscribers`;
    // planLogo.src = "src/plan-logo-4a.png";
    h2Element.innerHTML = `<strong>£${totalCost}</strong> Monthly cost`
    h3Element1.innerHTML = "<strong>£0</strong> Set up fee";
    h3Element2.innerHTML = "<strong>0%</strong> Per transaction";
    // h3Element3.innerHTML = `GOQR saves time! <strong>${timeSaved}hr/per</strong> month`;
    // h3Element4.innerHTML = "Increase Monthly Revenue by <strong>30%</strong>";
    h1Element2.innerHTML = '';
    h1Element2.appendChild(inputElement);
}

// Modal event handling
var modal = document.getElementById("myModal");
var btn = document.querySelector('.info-container button');
var span = document.getElementsByClassName("close")[0];

btn.addEventListener("click", function() { modal.style.display = "block"; });
span.addEventListener("click", function() { modal.style.display = "none"; });
window.addEventListener("click", function(event) { if (event.target == modal) { modal.style.display = "none"; } });

// Set initial content based on slider value
updateSliderContent();
