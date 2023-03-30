/*
  - ossian-toolbox.js
  - Version: 1.0
  - Last Update: 2023/03/29
*/


/* -------------------------------------------------------------------------------

  ? 讓使用者自己決定容器的寬度，容器名稱為.container
    * 範圍從 60% - 100%，預設值為 80%
    * 控制容器的拉霸為 <input type="range" id="range-slider" min="60" max="100" step="1" value="80">
    * 當容器寬度小於 1000px 時，容器寬度會自動設成 100% 的寬度，且停止並隱藏 #range-slider

---------------------------------------------------------------------------------*/


function initRangeSlider(containerSelector, rangeSliderSelector) {
  const container = document.querySelector(containerSelector);
  const rangeSlider = document.querySelector(rangeSliderSelector);

  function setContainerWidth(width) {
    container.style.width = width + "%";
  }

  function hideRangeSlider() {
    rangeSlider.style.display = "none";
  }

  function handleRangeSliderChange(event) {
    const width = event.target.value;
    setContainerWidth(width);
    localStorage.setItem("containerWidth", width);
  }

  if (window.innerWidth < 1000) {
    setContainerWidth(100);
    hideRangeSlider();
  } else {
    const storedWidth = localStorage.getItem("containerWidth");
    if (storedWidth) {
      setContainerWidth(storedWidth);
      rangeSlider.value = storedWidth;
    }

    rangeSlider.addEventListener("input", handleRangeSliderChange);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1000) {
      setContainerWidth(100);
      hideRangeSlider();
    } else {
      rangeSlider.style.display = "block";
      const storedWidth = localStorage.getItem("containerWidth");
      if (storedWidth) {
        setContainerWidth(storedWidth);
        rangeSlider.value = storedWidth;
      }
    }
  });
}

// 初始化容器寬度，如果不想每頁都執行的話，
// 請將(".container", "#range-slider") 設為註解
// 然後在需要執行的頁面輸入下面的內容
// <script>
//   initRangeSlider(".container", "#range-slider");
// </script >



/* -------------------------------------------------------------------------------

  ? 讓使用者切換閱讀模式
    * 有日光閱讀及月光閱讀兩種，預設為日光閱讀。
    * 請在需要使用的地方加上 <button id="theme-switcher">月光閱讀</button> 即可

---------------------------------------------------------------------------------*/


class themesMode {
  constructor(themeSwitcherElId = "theme-switcher") {
    this.currentTime = new Date().getHours();
    this.savedTheme = localStorage.getItem("theme");
    this.bodyEl = document.body;
    this.themeSwitcherEl = document.getElementById(themeSwitcherElId);
    this.init();
  }

  init() {
    if (
      // 下面兩個參數會造成晚上七點以後，無法儲存使用者的紀錄
      // this.currentTime >= 19 ||
      // this.currentTime < 6 ||
      this.savedTheme === "dark"
    ) {
      this.setTheme("dark");
    } else {
      this.setTheme("light");
    }
    this.themeSwitcherEl.addEventListener("click", () => {
      const newTheme = this.bodyEl.classList.contains("dark-mode")
        ? "light"
        : "dark";
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    this.bodyEl.classList.toggle("dark-mode", theme === "dark");
    this.themeSwitcherEl.textContent =
      theme === "dark" ? "日光閱讀" : "月光閱讀";
    localStorage.setItem("theme", theme);
  }
}


/* -------------------------------------------------------------------------------

  ? 在網頁上提供 + 及 - 兩個按鈕，使用者點選後，網頁的文字會變大或變小
    * changeFontSize(step, max, min) 包含三個值，分別如下：
    * step: 設定遞增或遞減的幅度，預設值為 0.25em
    * max: 最大值，預設值為 2.25em
    * min: 最小值，預設為 0.875em
  ? 使用方式：
    * 引用 JS 後，在 </body> 之前，呼叫 
      changeFontSize(0.25, 2.25, 0.875);
    * 在需要的位置裡加上 + 及 - 的按鈕
      <button id="decrease">-</button>
      <button id="increase">+</button>
  ? 注意事項：
    * body 的樣式裡不要放 font-size: 16px 以絕對單位標示的尺寸
    * 如果要放，請用相對單位 em 取代 px

---------------------------------------------------------------------------------*/


function changeFontSize(step, max, min) {
  // 取得瀏覽器記錄的使用者選擇
  let fontSize = parseFloat(localStorage.getItem("fontSize")) || 1;

  // 取得加減按鈕和預設文字大小
  const increaseBtn = document.querySelector("#increase");
  const decreaseBtn = document.querySelector("#decrease");
  const defaultFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  // +按鈕的點擊事件
  increaseBtn.addEventListener("click", () => {
    if (fontSize < max) {
      fontSize += step;
      document.documentElement.style.fontSize = fontSize + "em";
      // 將使用者選擇記錄在瀏覽器
      localStorage.setItem("fontSize", fontSize);
    }
  });

  // -按鈕的點擊事件
  decreaseBtn.addEventListener("click", () => {
    if (fontSize > min) {
      fontSize -= step;
      document.documentElement.style.fontSize = fontSize + "em";
      // 將使用者選擇記錄在瀏覽器
      localStorage.setItem("fontSize", fontSize);
    }
  });

  // 設定網頁預設文字大小
  document.documentElement.style.fontSize = fontSize + "em";
}


