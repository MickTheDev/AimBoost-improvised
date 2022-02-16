let targetSize;
let targetSizes = {
  duży: 100,
  średni: 75,
  mały: 50,
};

function rng(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

document
  .querySelector(".target__size .subtitle")
  .addEventListener("click", () => {
    document.querySelector(".target__size").classList.toggle("active");
  });

document.querySelectorAll(".select li").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".target__size").classList.remove("active");
    targetSize = option.innerHTML.toLowerCase();
    switch (targetSize) {
      case "duży":
        targetSize = targetSizes.duży;
        break;
      case "średni":
        targetSize = targetSizes.średni;
        break;
      case "mały":
        targetSize = targetSizes.mały;
        break;
    }
    document
      .querySelector(".target")
      .style.setProperty("height", `${targetSize}px`);
    document
      .querySelector(".target")
      .style.setProperty("width", `${targetSize}px`);
  });
});

document.querySelector(".playBtn").addEventListener("click", () => {
  document.querySelector(".target").innerHTML = `<div class="red"></div>
        <div class="orange"></div>
        <div class="green"></div>`;
  document.querySelector(".target").addEventListener("click", () => {
    document.querySelector(".target").style.setProperty(
      "transform",
      `translate(${rng(
        -document.querySelector(".range").offsetWidth / 2 +
          document.querySelector(".target").offsetWidth / 2,
        document.querySelector(".range").offsetWidth / 2 -
          document.querySelector(".target").offsetWidth / 2
      )}px,
             ${rng(
               -document.querySelector(".range").offsetHeight / 2 +
                 document.querySelector(".target").offsetHeight / 2,
               document.querySelector(".range").offsetHeight / 2 -
                 document.querySelector(".target").offsetHeight / 2
             )}px`
    );
  });
});
