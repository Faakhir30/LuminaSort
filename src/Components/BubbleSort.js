import React from 'react'
function BubbleSort({bars, setBars, speed}) {
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

export default BubbleSort