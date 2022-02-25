let targetSize;
let hit = new Audio("audio/hit.wav");
let allHits;
let accuracy = "0%";
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
  let targets2 = targets;
  let timeStart = new Date();
  allHits = 0;
  let hits = 0;
  if (Number(targets) && targets > 0) {
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
      allHits++;
      targets--;
      accuracy = `${Math.floor((hits / allHits) * 100)}%`;
      if (targets === 0) {
        let timeEnd = new Date();
        let timeDifference = (timeEnd.getTime() - timeStart.getTime()) / 1000;
        timeDifference < 60
          ? (timeDifference = `${Math.round(timeDifference * 10) / 10}s`)
          : (timeDifference = `${
              Math.round((timeDifference / 60) * 100) / 100
            }min`);

        document.querySelector(".menu").classList.remove("inGame");
        document.querySelector(".stats").classList.add("active");
        document
          .querySelector(".target")
          .removeChild(
            document.querySelector(".target").querySelector(".green")
          );
        document
          .querySelector(".target")
          .removeChild(
            document.querySelector(".target").querySelector(".orange")
          );
        document
          .querySelector(".target")
          .removeChild(document.querySelector(".target").querySelector(".red"));
        document.querySelector(".accuracy__score").innerHTML = accuracy;
        document.querySelector(
          ".hits__score"
        ).innerHTML = `${hits} / ${targets2}`;
        document.querySelector(".time__score").innerHTML = timeDifference;
      }
    });

    // playing sound after hit
    document.querySelector(".target").addEventListener("click", () => {
      hits++;
      hit.play();
    });
    // removing alert
    setTimeout(() => {
      if (
        document
          .querySelector(".num__of__targets")
          .contains(document.querySelector("p"))
      )
        document
          .querySelector(".num__of__targets")
          .removeChild(
            document.querySelector(".num__of__targets").querySelector("p")
          );
    }, 1000);
  } else {
    // show alert
    let p = document.createElement("p");
    p.innerHTML = "Podaj ilość celi";
    if (
      !document
        .querySelector(".num__of__targets")
        .contains(document.querySelector("p"))
    ) {
      document.querySelector(".num__of__targets").appendChild(p);
    }
  }
});
