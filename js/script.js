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

function moveTarget() {
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
  let targets = document.querySelector(".numOfTargets").value;

  if (Number(targets)) {
    document.querySelector(".target").innerHTML = `<div class="red"></div>
                <div class="orange"></div>
                <div class="green"></div>`;
    document.querySelector(".target").addEventListener("click", moveTarget);
    document.querySelector(".range").addEventListener("click", moveTarget);
    document.querySelector(".menu").classList.add("inGame");
    setTimeout(() => {
      document.querySelector(".num__of__targets").removeChild(document.querySelector(".num__of__targets").querySelector('p'))
    }, 1000)
  } else {
    let p = document.createElement('p')
    p.innerHTML = "Podaj ilość celi"
    if(!document.querySelector(".num__of__targets").contains(document.querySelector("p"))) {
      document.querySelector(".num__of__targets").appendChild(p)
    }
  }
});
