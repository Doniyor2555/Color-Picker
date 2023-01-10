const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll= document.querySelector(".clear-All");

const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");


const copyColor = (elem) => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = 'copied';
  setTimeout(() => elem.innerText = elem.dataset.color, 1000);
};

const showColors = () => {
  if(!pickedColors) return;
  colorList.innerHTML = pickedColors.map(color => 
    `
    <li class="color">
      <span class="rect" style="background: ${color}; border: 1px solid ${color == '#ffffff' ? "#ccc" : color}"></span>
      <span class="value" data-color="${color}">${color}</span>
    </li>
    `
  ).join("");

  document.querySelectorAll(".color").forEach(li => {
    li.addEventListener("click", (e) => copyColor(e.currentTarget.lastElementChild));
  });

  document.querySelector(".picked-colors").classList.remove("hide");
};

showColors();

const activateEyeDropper = async() => {
  try {
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex); // copying to clipboard

    if(!pickedColors.includes(sRGBHex)) {
      // save picked color to localStorage 
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
      showColors();
    }
  } catch(error) {
    console.log(error)
  }
};

const clearAllColors = () => {
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").classList.add("hide");
};

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);

