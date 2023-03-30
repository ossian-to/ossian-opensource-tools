const fontSizeMap = {
  large: "2rem",
  medium: "1.75rem",
  small: "1.5rem",
};

const btnIds = ["large-btn", "medium-btn", "small-btn"];

// 預設值
const defaultValue = {
  btn: "small-btn",
  size: fontSizeMap["small"],
};

function setActiveButton(btnId) {
  for (let i = 0; i < btnIds.length; i++) {
    const btn = document.getElementById(btnIds[i]);
    if (btn.id === btnId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
}

function setFontSize(fontSize) {
  document.body.style.fontSize = fontSize;
}

function handleClick(event) {
  const btnId = event.target.id;
  const fontSize = fontSizeMap[btnId.replace("-btn", "")];
  setFontSize(fontSize);
  setActiveButton(btnId);
  localStorage.setItem("fontSize", fontSize);
}

for (let i = 0; i < btnIds.length; i++) {
  const btn = document.getElementById(btnIds[i]);
  btn.addEventListener("click", handleClick);
}

const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize) {
    setFontSize(savedFontSize);
    for (let i = 0; i < btnIds.length; i++) {
      const fontSize = fontSizeMap[btnIds[i].replace("-btn", "")];
      if (savedFontSize === fontSize) {
        setActiveButton(btnIds[i]);
        break;
      }
    }
  } else {
    // 預設值
    setActiveButton(defaultValue["btn"]);
    setFontSize(defaultValue["size"]);
  }