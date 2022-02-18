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

// moving target
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

// menu
document
  .querySelector(".target__size .subtitle")
  .addEventListener("click", () => {
    document.querySelector(".target__size").classList.toggle("active");
  });

// changing size of target
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

// game start
document.querySelector(".playBtn").addEventListener("click", () => {
  let targets = document.querySelector(".numOfTargets").value;

  if (Number(targets)) {
    document.querySelector(".target").innerHTML = `<div class="red"></div>
                <div class="orange"></div>
                <div class="green"></div>`;
    // moving target after click
    document.querySelector(".target").addEventListener("click", moveTarget);
    document.querySelector(".range").addEventListener("click", moveTarget);

    // hidding menu
    document.querySelector(".menu").classList.add("inGame");

    // counting clicks
    document.querySelector(".range").addEventListener("click", () => {
      targets--;
      if(targets === 0) {
        document.querySelector(".menu").classList.remove("inGame");
        document.querySelector(".target").removeChild(document.querySelector(".target").querySelector(".green"))
        document.querySelector(".target").removeChild(document.querySelector(".target").querySelector(".orange"))
        document.querySelector(".target").removeChild(document.querySelector(".target").querySelector(".red"))
      }
    });
    // removing alert
    setTimeout(() => {
      if(document.querySelector(".num__of__targets").contains(document.querySelector("p")))
      document.querySelector(".num__of__targets").removeChild(document.querySelector(".num__of__targets").querySelector('p'))
    }, 1000)
  } else {
    // show alert
    let p = document.createElement('p')
    p.innerHTML = "Podaj ilość celi"
    if(!document.querySelector(".num__of__targets").contains(document.querySelector("p"))) {
      document.querySelector(".num__of__targets").appendChild(p)
    }
  }
});
