import React, { useEffect, useState } from "react";
import "./styles/Header.css";
import "./styles/Bars.css";

const Header = () => {
  const [Size, setSize] = useState(25);
  const [speed, setSpeed] = useState(300);
  const [bars, setBars] = useState(generateRandomArray(Size, 1, Size));
  const [activeSort, setActiveSort] = useState("bubble");
  useEffect(() => {
    setBars(generateRandomArray(Size, 1, Size));
  }, [Size]);
  useEffect(() => {
    if (isSorted(bars)) {
      let startBtn = document.getElementsByClassName("start")[0];
      let slider = document.getElementById("sizeSlider");
      slider.disabled = false;
      startBtn.disabled = false;
    }
  }, [bars]);

  function InsertionSort() {
    let arr = [...bars];
    const n = arr.length;

    async function insertionSort() {
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
          let currentBar = document.getElementById(`${j}th-bar`);
          let nextBar = document.getElementById(`${j + 1}th-bar`);

          currentBar.style.backgroundColor = "red"; // Set color to red for comparison
          nextBar.style.backgroundColor = "red"; // Set color to red for comparison

          await new Promise((resolve) => setTimeout(resolve, 80)); // Delay for visualization

          arr[j + 1] = arr[j];
          setBars([...arr]);

          currentBar.style.backgroundColor = "green"; // Set color to green for swap
          nextBar.style.backgroundColor = "green"; // Set color to green for swap

          await new Promise((resolve) => setTimeout(resolve, 140000 / speed)); // Delay for visualization

          currentBar.style.backgroundColor = "#27374D"; // Set color back to default
          nextBar.style.backgroundColor = "#27374D"; // Set color back to default

          j--;
        }

        arr[j + 1] = key;
        setBars([...arr]);
      }
    }

    insertionSort();
  }

  function MergeSort() {
    let arr = [...bars];
    const n = arr.length;

    async function merge(start, mid, end) {
      let mergedArray = [];
      let i = start;
      let j = mid + 1;

      while (i <= mid && j <= end) {
        let bar1 = document.getElementById(`${i}th-bar`);
        let bar2 = document.getElementById(`${j}th-bar`);

        bar1.style.backgroundColor = "red"; // Set color to red for comparison
        bar2.style.backgroundColor = "red"; // Set color to red for comparison

        await new Promise((resolve) => setTimeout(resolve, 80)); // Delay for visualization

        if (arr[i] <= arr[j]) {
          mergedArray.push(arr[i]);
          i++;
        } else {
          mergedArray.push(arr[j]);
          j++;
        }

        bar1.style.backgroundColor = "#27374D"; // Set color back to default
        bar2.style.backgroundColor = "#27374D"; // Set color back to default
      }

      while (i <= mid) {
        let bar = document.getElementById(`${i}th-bar`);
        bar.style.backgroundColor = "red"; // Set color to red for comparison

        await new Promise((resolve) => setTimeout(resolve, 80)); // Delay for visualization

        mergedArray.push(arr[i]);
        i++;

        bar.style.backgroundColor = "#27374D"; // Set color back to default
      }

      while (j <= end) {
        let bar = document.getElementById(`${j}th-bar`);
        bar.style.backgroundColor = "red"; // Set color to red for comparison

        await new Promise((resolve) => setTimeout(resolve, 80)); // Delay for visualization

        mergedArray.push(arr[j]);
        j++;

        bar.style.backgroundColor = "#27374D"; // Set color back to default
      }

      for (let k = start; k <= end; k++) {
        arr[k] = mergedArray[k - start];
        setBars([...arr]);

        let bar = document.getElementById(`${k}th-bar`);
        bar.style.backgroundColor = "green"; // Set color to green for swap

        await new Promise((resolve) => setTimeout(resolve, 140000 / speed)); // Delay for visualization

        bar.style.backgroundColor = "#27374D"; // Set color back to default
      }
    }

    async function mergeSort(start, end) {
      if (start < end) {
        let mid = Math.floor((start + end) / 2);

        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
      }
    }

    mergeSort(0, n - 1);
  }

  function QuickSort() {
    let arr = [...bars];
    const n = arr.length;

    async function partition(low, high) {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        let bar1 = document.getElementById(`${j}th-bar`);
        let bar2 = document.getElementById(`${high}th-bar`);

        bar1.style.backgroundColor = "red"; // Set color to red for comparison
        bar2.style.backgroundColor = "red"; // Set color to red for comparison

        await new Promise((resolve) => setTimeout(resolve, 80)); // Delay for visualization

        if (arr[j] < pivot) {
          i++;

          // Swap elements
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setBars([...arr]);

          let swapBar1 = document.getElementById(`${i}th-bar`);
          let swapBar2 = document.getElementById(`${j}th-bar`);

          swapBar1.style.backgroundColor = "green"; // Set color to green for swap
          swapBar2.style.backgroundColor = "green"; // Set color to green for swap

          await new Promise((resolve) => setTimeout(resolve, 140000 / speed)); // Delay for visualization

          swapBar1.style.backgroundColor = "#27374D"; // Set color back to default
          swapBar2.style.backgroundColor = "#27374D"; // Set color back to default
        } else {
          bar1.style.backgroundColor = "#27374D"; // Set color back to default
          bar2.style.backgroundColor = "#27374D"; // Set color back to default
        }
      }

      // Swap pivot element
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setBars([...arr]);

      let pivotBar = document.getElementById(`${i + 1}th-bar`);
      let highBar = document.getElementById(`${high}th-bar`);

      pivotBar.style.backgroundColor = "green"; // Set color to green for swap
      highBar.style.backgroundColor = "green"; // Set color to green for swap

      await new Promise((resolve) => setTimeout(resolve, 140000 / speed)); // Delay for visualization

      pivotBar.style.backgroundColor = "#27374D"; // Set color back to default
      highBar.style.backgroundColor = "#27374D"; // Set color back to default

      return i + 1;
    }

    async function quickSort(low, high) {
      if (low < high) {
        let pivotIndex = await partition(low, high);

        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
      }
    }
    quickSort(0, n - 1);
  }

  function BubbleSort() {
    let arr = [...bars];
    const n = arr.length;
    let i = 0;
    let j = 0;
    const intervalId = setInterval(() => {
      if (i < n - 1) {
        if (j < n - i - 1) {
          let bar1 = document.getElementById(`${j}th-bar`);
          let bar2 = document.getElementById(`${j + 1}th-bar`);
          bar1.style.backgroundColor = "red"; // Set color to red for comparison
          bar2.style.backgroundColor = "green"; // Set color to red for comparison

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setBars([...arr]);

            setTimeout(() => {
              bar1.style.backgroundColor = "#27374D"; // Set color back to default
              bar2.style.backgroundColor = "#27374D"; // Set color back to default
            }, 80); // Adjust the delay time as per your preference
          } else {
            // Delay the color change back to default for non-swap comparison
            setTimeout(() => {
              bar1.style.backgroundColor = "#27374D"; // Set color back to default
              bar2.style.backgroundColor = "#27374D"; // Set color back to default
            }, speed); // Adjust the delay time as per your preference
          }

          j++;
        } else {
          i++;
          j = 0;
        }
      } else {
        clearInterval(intervalId);
      }
    }, 140000 / speed);
  }

  function setRandomBars(e) {
    e.preventDefault();
    setBars(generateRandomArray(Size, 1, Size));
  }

  function generateRandomArray(length, min, max) {
    const randomArray = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomArray.push(randomNumber);
    }

    return randomArray;
  }

  function runSort(e) {
    e.preventDefault();
    let startBtn = document.getElementsByClassName("start")[0];
    let slider = document.getElementById("sizeSlider");
    console.log(startBtn.disabled, slider.disabled);
    startBtn.disabled = true;
    slider.disabled = true;
    console.log(startBtn.disabled, slider.disabled);
    const funcSelector = {
      insertion: InsertionSort,
      bubble: BubbleSort,
      merge: MergeSort,
      quick: QuickSort,
    };
    funcSelector[activeSort]();
  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <svg
            fill="#27374D"
            width="6vw"
            height="6vh"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 12.208V7h-2v5.137l-1.086-1.086L8.5 12.466 12.036 16l3.535-3.535-1.414-1.415L13 12.208zM8 6H0v2h8V6zm6-3H0v2h14V3zm2-3H0v2h16V0zM6 9H0v2h6V9zm-2 3H0v2h4v-2z"
              fillRule="evenodd"
            />
          </svg>
          <div>Lumina</div>
          <div style={{ color: "#FFFFFF" }}>Sort</div>
        </div>
        <button className="btn btn-secondary randGen" onClick={setRandomBars}>
          Generate random Array
        </button>
        <div className="slider">
          <input
            id="sizeSlider"
            className="form-range p-0.1 w-0.3"
            type="range"
            min="10"
            max="40"
            step="15"
            defaultValue="25"
            onChange={(e) => setSize(e.target.value)}
          />
          <p className="sliderLabel">Size</p>
        </div>
        <div className="slider">
          <input
            className="form-range p-1"
            type="range"
            min="300"
            max="900"
            defaultValue="300"
            step="300"
            onChange={(e) => setSpeed(e.target.value)}
          />
          <p className="sliderLabel">Speed</p>
        </div>
        <div className="d-flex sortselector">
          <div className="selectSort">Select Sort: </div>
          <div className="sorts">
            <a
              key={"merge"}
              href=""
              style={{
                textDecoration: activeSort === "merge" ? "underline" : "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSort("merge");
              }}
            >
              Merge
            </a>
            <a
              key={"bubble"}
              href=""
              style={{
                textDecoration: activeSort === "bubble" ? "underline" : "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSort("bubble");
              }}
            >
              Bubble
            </a>
            <a
              key={"insert"}
              href=""
              style={{
                textDecoration:
                  activeSort === "insertion" ? "underline" : "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSort("insertion");
              }}
            >
              Insertion
            </a>
            <a
              href=""
              key={"quick"}
              style={{
                textDecoration: activeSort === "quick" ? "underline" : "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSort("quick");
              }}
            >
              Quick
            </a>
          </div>
        </div>
        <button className="btn btn-success start" onClick={runSort}>
          START
        </button>
      </div>
      <div className="bars">{plotBars(bars)}</div>
    </>
  );
};

export default Header;
function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function plotBars(bars) {
  return (
    <>
      {bars.map((element, index) => (
        <div>
          <div className="bardata">
            <div
              key={index}
              id={`${index}th-bar`}
              className="bar"
              style={{
                height: `${(element / Math.max(...bars)) * 70}vh`,
                width: `${40 / bars.length}vw`,
                marginRight: `${4 / bars.length}vw`,
                backgroundColor: "#27374D", // Set the default background color
              }}
            ></div>

            <div className="numbers">{element}</div>
          </div>
        </div>
      ))}
      ;
      <div className="array" key={"array"}>
        ARRAY={toArray(bars)}
      </div>
    </>
  );
}
function toArray(array) {
  const arrayString = JSON.stringify(array, (key, value) => {
    if (Array.isArray(value)) {
      return `{${value.join(", ")}}`;
    }
    return value;
  });
  return arrayString;
}
