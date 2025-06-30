const strips = [...document.querySelectorAll(".strip")];
const numbersize = 8;
let is24Hour = true;

document.getElementById("toggleFormat").addEventListener("change", function() {
  is24Hour = !this.checked;
});

function highlight(stripe, d) {
  strips[stripe]
    .querySelector(`.number:nth-of-type(${d + 1})`)
    .classList.add("pop");
  
  setTimeout(() => {
    strips[stripe]
      .querySelector(`.number:nth-of-type(${d + 1})`)
      .classList.remove("pop");
  }, 950);
}

function stripeSlider(stripe, number) {
  let d1 = Math.floor(number / 10);
  let d2 = number % 10;
  
  strips[stripe].style.transform = `translateY(${-d1 * numbersize}vmin)`;
  highlight(stripe, d1);
  
  strips[stripe + 1].style.transform = `translateY(${-d2 * numbersize}vmin)`;
  highlight(stripe + 1, d2);
}

function updateDate() {
  const dateEl = document.getElementById("date");
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  dateEl.textContent = formattedDate;
}
updateDate(); // Show date on load

setInterval(() => {
  const time = new Date();
  let hours = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();
  const ampmEl = document.getElementById("ampm");
  
  if (!is24Hour) {
    const isPM = hours >= 12;
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    ampmEl.textContent = isPM ? "PM" : "AM";
    ampmEl.classList.remove("hidden");
  } else {
    ampmEl.classList.add("hidden");
  }
  
  stripeSlider(0, hours);
  stripeSlider(2, mins);
  stripeSlider(4, secs);
}, 1000);
const backgrounds = [
  "linear-gradient(-45deg, #c4d3ef, #dfe6f6)",
  "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  "linear-gradient(120deg, #a1c4fd, #c2e9fb)",
  "linear-gradient(to right, #fbc2eb, #a6c1ee)",
  "linear-gradient(60deg, #84fab0, #8fd3f4)",
  "linear-gradient(180deg, #add8e6, #e6e6fa)",
  "linear-gradient(0deg, #004e92, #7b4397)"
];

let bgIndex = 0;
document.getElementById("bgToggle").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.body.style.background = backgrounds[bgIndex];
});