function MergeSort({bars, setBars, speed}) {
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
export default MergeSort