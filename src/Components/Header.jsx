import React, { useState } from "react";
import "./styles/Header.css";
import "./styles/Bars.css";

const Header = () => {
  const [bars, setBars] = useState(generateRandomArray(10, 1, 100));
  const [activeSort, setActiveSort] = useState("bubble");
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

          await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization

          currentBar.style.backgroundColor = "#27374D"; // Set color back to default
          nextBar.style.backgroundColor = "#27374D"; // Set color back to default

          j--;
        }

        arr[j + 1] = key;
        setBars([...arr]);
      }
    }

    console.log(bars);
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

        await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization

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

    console.log(bars);
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

          await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization

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

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visualization

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

    console.log(bars);
    quickSort(0, n - 1);
  }

  function BubbleSort() {
    let arr = [...bars];
    const n = arr.length;
    let i = 0;
    let j = 0;
    console.log(bars);
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
            }, 300); // Adjust the delay time as per your preference
          }

          j++;
        } else {
          i++;
          j = 0;
        }
      } else {
        clearInterval(intervalId);
        console.log(bars);
      }
    }, 800);
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
              fill-rule="evenodd"
            />
          </svg>
          <div>Lumina</div>
          <div style={{color:"#FFFFFF"}}>Sort</div>
        </div>
          <button className="btn btn-secondary" onClick={setRandomBars}>Generate random Array</button>
          <div>Select Sort:</div>
          <div className="sorts">
          <a href="" style={{backgroundColor:  activeSort==="merge"?"#DDE6ED":"none"}} onClick={MergeSort}>Merge</a>
          <a href="" onClick={BubbleSort}>Bubble</a>
          <a href="" onClick={InsertionSort}>Insertion</a>
          <a href="" onClick={QuickSort}>Quick</a>
          </div>
          <button className="btn btn-success">START</button>
      </div>
      <div className="bars">{plotBars(bars)}</div>
    </>
  );
};

export default Header;

function plotBars(bars) {
  return bars.map((element, index) => (
    <>
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
    </>
  ));
}
