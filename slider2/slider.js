const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress"),
  slider = document.querySelector(".slider input");

let priceGap = 1000;

priceInput.forEach(input => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.classList.contains("input-min")) {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }

    // Check if input value is 0 or 10000 and apply shaking effect
    checkMinValue(priceInput[0]);
    checkMaxValue(priceInput[1]);
  });
});

rangeInput.forEach(input => {
  input.addEventListener("input", () => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (input.classList.contains("range-min")) {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });

  // Check if input value is 0 or 10000 and apply shaking effect
  input.addEventListener("blur", () => {
    if (parseInt(input.value) === 0 || parseInt(input.value) === 10000) {
      input.parentElement.classList.add('shake');
      setTimeout(() => {
        input.parentElement.classList.remove('shake');
      }, 500);
    }
  });
});

  // Function to toggle the visibility of the dropdown container
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
  }
  
  // Handle changes in the slider value
  document.getElementById("priceSlider").addEventListener("input", function() {
    var selectedPrice = document.getElementById("selectedPrice");
    selectedPrice.textContent = "Selected Price: $" + this.value;
  });
  
