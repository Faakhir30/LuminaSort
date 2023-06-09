import React, { useState } from "react";
import "./styles/Header.css";
import "./styles/Bars.css";
const Header = () => {
  const [bars, setBars] = useState(generateRandomArray(50, 1, 100));

  function BubbleSort() {
    let arr = bars;
    const n = arr.length;

    let i = 0;
    let j = 0;

    const intervalId = setInterval(() => {
      if (i < n - 1) {
        if (j < n - i - 1) {
          // Compare adjacent elements
          if (arr[j] > arr[j + 1]) {
            // Swap them if they are in the wrong order
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setBars([...arr]);
          }
          j++;
        } else {
          // Move to the next iteration of i and reset j
          i++;
          j = 0;
        }
      } else {
        // Sorting is complete, cancel the interval
        clearInterval(intervalId);
      }
    }, 50);
  }
  function handleBars(bars) {
    const oldBars = document.getElementsByClassName("bars");
    oldBars.innerHTML = plotBars(bars);
  }

  function setRandomBars(e) {
    e.preventDefault();
    setBars(generateRandomArray(50, 1, 100));
  }

  function generateRandomArray(length, min, max) {
    const randomArray = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomArray.push(randomNumber);
    }

    return randomArray;
  }

  return (
    <>
      <div className="header">
        <button>logo</button>
        <div>
          <button onClick={setRandomBars}>Generate random Array</button>
          <button>speed</button>
          <button onClick={BubbleSort}>Bubble sort</button>
          <button>start</button>
        </div>
      </div>
      <div className="bars">{plotBars(bars)}</div>
    </>
  );
};

export default Header;

function plotBars(bars) {
  return bars.map((element, index) => (
    <div
      key={index}
      className="bar"
      style={{
        height: `${(element / Math.max(...bars)) * 70}vh`,
        width: `${40 / bars.length}vw`,
        marginRight: `${4 / bars.length}vw`,
      }}
    >
      {element}
    </div>
  ));
}
