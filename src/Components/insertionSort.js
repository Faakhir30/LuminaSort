
function InsertionSort({bars, setBars, speed}) {
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
  export default InsertionSort