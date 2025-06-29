const strips = [...document.querySelectorAll(".strip")];
const numbersize = 8; // in vmin

// Highlight number on strip for animation
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

setInterval(() => {
  const time = new Date();
  
  const hours = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();
  
  stripeSlider(0, hours);
  stripeSlider(2, mins);
  stripeSlider(4, secs);
}, 1000);