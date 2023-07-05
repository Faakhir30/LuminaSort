import React, { useEffect, useState } from "react";
import "./styles/Header.css";
import "./styles/Bars.css";
import PlotBars from "./PlotBars";
import BubbleSort from "./BubbleSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import InsertionSort from "./insertionSort";
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
    let randGen = document.getElementsByClassName("randGen")[0];
      slider.disabled = false;
    startBtn.disabled = false;randGen.disabled=false;
    }
  }, [bars]);

  function setRandomBars(e) {
    e.preventDefault();
    setBars(generateRandomArray(Size, 1, Size));
  }

  function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
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
    let randGen = document.getElementsByClassName("randGen")[0];
    
    startBtn.disabled = true;
    slider.disabled = true;randGen.disabled=true;
    const funcSelector = {
      insertion: InsertionSort,
      bubble: BubbleSort,
      merge: MergeSort,
      quick: QuickSort,
    };
    funcSelector[activeSort]({bars, setBars, speed});
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
      <div className="bars">{<PlotBars bars={bars} setBars={setBars}/>}</div>
    </>
  );
};

export default Header;
