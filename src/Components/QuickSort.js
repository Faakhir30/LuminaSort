
function QuickSort({bars, setBars, speed}) {
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
export default QuickSort