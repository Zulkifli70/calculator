const display = document.querySelector("#display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}
