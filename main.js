"use strict";
(function(){

    window.addEventListener("load", init);

    let array = []
    let waiting_time = 50; 
    let option = "bubble"; 

    let purple = "#562075"; 
    let turqoise = "#109ead"; 

    function init() {
        generateArray(); 
        document.getElementById("newArray").onclick = generateArray; 
        document.getElementById("bubble").onclick = changeToBubble; 
        document.getElementById("insertion").onclick = changeToInsertion; 
        document.getElementById("selection").onclick = changeToSelection; 
        document.getElementById("merge").onclick = changeToMerge; 
        document.getElementById("quick").onclick = changeToQuick; 

        document.getElementById("sort").onclick = sortType; 
    }

    // other functions you may define 
    function changeToBubble() {
        document.getElementById(option).style.color = "black"; 
        document.getElementById(option).style.fontWeight = "normal"; 
        option = "bubble"; 
        document.getElementById(option).style.color = purple; 
        document.getElementById(option).style.fontWeight = "bold"; 
    }

    function changeToInsertion() {
        document.getElementById(option).style.color = "black"; 
        document.getElementById(option).style.fontWeight = "normal"; 
        option = "insertion"; 
        document.getElementById(option).style.color = purple; 
        document.getElementById(option).style.fontWeight = "bold"; 

    }

    function changeToSelection() {
        document.getElementById(option).style.color = "black"; 
        document.getElementById(option).style.fontWeight = "normal"; 
        option = "selection"; 
        document.getElementById(option).style.color = purple; 
        document.getElementById(option).style.fontWeight = "bold"; 
    }

    function changeToMerge() {
        document.getElementById(option).style.color = "black"; 
        document.getElementById(option).style.fontWeight = "normal"; 
        option = "merge"; 
        document.getElementById(option).style.color = purple; 
        document.getElementById(option).style.fontWeight = "bold"; 
    }

    function changeToQuick() {
        document.getElementById(option).style.color = "black"; 
        document.getElementById(option).style.fontWeight = "normal"; 
        option = "quick"; 
        document.getElementById(option).style.color = purple; 
        document.getElementById(option).style.fontWeight = "bold"; 
    }

    function generateArray() {
        if (document.getElementById("sort").disabled) {
            document.getElementById("sort").disabled = false;
            document.getElementById("sort").style.backgroundColor = turqoise; 
            document.getElementById("sort").textContent = "Let's Sort It!"; 
        }
        array = []; 
        let container = document.getElementById("main"); 
        while (container.firstChild) {
            container.removeChild(container.firstChild); 
        }

        for (let i = 0; i < 50; i++) {
            let length = Math.floor(Math.random() * (500 - 20 + 1) + 20);
            array.push(length); 

            let bar = document.createElement("div"); 
            let name = "b" + i; 
            bar.id = name; 
            bar.style.width = "20px"; 
            bar.style.height = length + "px"; 
            bar.style.backgroundColor = colorPicker(length); 
            bar.style.margin = "0px 1px 0px 1px"; 
            container.appendChild(bar); 
        }
    }

    function sortType() {
        document.getElementById("sort").disabled = true;
        document.getElementById("sort").style.backgroundColor = purple; 
        document.getElementById("sort").textContent = "Sorting..."; 
        if (option === "bubble") {
            bubbleSort(); 
        } else if (option === "insertion") {
            insertionSort(); 
        } else if (option === "selection") {
            selectionSort(); 
        } else if (option === "merge") {
            mergeSort(array, 0, 50 - 1); 
        } else if (option === "quick") {
            quickSort(0, array.length - 1); 
            console.log(array); 
        }
    }

    function colorPicker(length) {
        let rgb = [69, 217, 214]; 
        let subtractedGreen = rgb[1] - Math.floor(length / 3); 
        rgb[1] = Math.max(subtractedGreen, 69); 
        if (rgb[1] <= 69) {
            let plusRed = (length - 500) + 58; 
            rgb[0] += plusRed; 
        }
        let rgbToString = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")"; 
        return rgbToString; 
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }

    async function swap(x, y) {
        let temp = array[x]; 
        array[x] = array[y]; 
        array[y] = temp; 

        let xId = "b" + x; 
        let yId = "b" + y; 
        let xbar = document.getElementById(xId);
        let ybar = document.getElementById(yId);

        xbar.style.backgroundColor = "orange"; 
        ybar.style.backgroundColor = "orange"; 

        await sleep(waiting_time); 

        xbar.style.height = array[x] + "px"; 
        ybar.style.height = array[y] + "px"; 

        await sleep(waiting_time); 

        xbar.style.backgroundColor = colorPicker(array[x]); 
        ybar.style.backgroundColor = colorPicker(array[y]); 

        await sleep(waiting_time); 
    }

    async function color(x, y) {
        let xId = "b" + x; 
        let yId = "b" + y; 
        let xbar = document.getElementById(xId);
        let ybar = document.getElementById(yId);

        xbar.style.backgroundColor = "orange"; 
        ybar.style.backgroundColor = "orange"; 

        await sleep(waiting_time); 

        xbar.style.backgroundColor = colorPicker(array[x]); 
        ybar.style.backgroundColor = colorPicker(array[y]); 
    }

    async function bubbleSort() {
        let n = array.length; 
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    await sleep(waiting_time);
                    swap(j, j + 1); 
                }
            }
        }
        document.getElementById("newArray").disabled = false; 
    }

    async function selectionSort() {
        let n = array.length; 

        for (let i = 0; i < n - 1; i++) {
            let minimum = i; 
            for (let j = i + 1; j < n; j++) {
                if (array[j] < array[minimum]) {
                    await sleep(waiting_time); 
                    color(i, j); 
                    minimum = j;  
                }
            }
            await sleep(waiting_time); 
            swap(minimum, i); 
        }
    }

    async function insertionSort() {
        let n = array.length; 

        for (let i = 1; i < n; ++i) {
            let key = array[i]; 
            let j = i - 1; 

            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j]; 
                j = j - 1; 
                await sleep(waiting_time); 
                colorSingle(j + 1); 

            }
            array[j + 1] = key; 
            await sleep(waiting_time); 
            colorSingle(j + 1); 
        }
        colorSingle(n - 1); 
    }

    async function partition(low, high) {
        let pivot = array[high]; 
        let xId = "b" + high; 
        let xbar = document.getElementById(xId);
        await sleep(waiting_time);
        xbar.style.backgroundColor = "GreenYellow"; 
        await sleep(waiting_time);

        let i = low - 1; 

        for (let j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++; 
                await sleep(waiting_time);
                swap(i, j); 
            }
        }
        await sleep(waiting_time);
        swap(i + 1, high); 

        return i + 1; 

    }

    async function quickSort(low, high) {
        if (low < high) {
            let p = await partition(low, high); 
            await quickSort(low, p - 1); 
            await quickSort(p + 1, high); 
        }
    }

    async function colorSingle(x) {
        let xId = "b" + x; 
        let xbar = document.getElementById(xId);
        await sleep(waiting_time);
        xbar.style.backgroundColor = "orange"; 
        await sleep(waiting_time); 
        xbar.style.height = array[x] + "px";
        await sleep(waiting_time); 
        xbar.style.backgroundColor = colorPicker(array[x]); 
    }

    async function merge(arr, l, m, r) { 
        let a1 = m - l + 1; 
        let a2 = r - m; 

        let left = new Array(a1); 
        let right = new Array(a2);

        for (let i = 0; i < a1; i++) {
            left[i] = arr[l + i]; 
        }
        for (let j = 0; j < a2; j++) {
            right[j] = arr[m + 1 + j]; 
        }

        let i = 0; 
        let j = 0; 
        let k = l; 

        while (i < a1 && j < a2) {
            if (left[i] <= right[j]) {
                arr[k] = left[i]; 
                await sleep(waiting_time); 
                colorSingle(k);
                i++; 
            } else {
                arr[k] = right[j];  
                await sleep(waiting_time); 
                colorSingle(k);
                j++; 
            } 
            k++; 
        }
        while (i < a1) {
            arr[k] = left[i]; 
            await sleep(waiting_time); 
            colorSingle(k);
            i++; 
            k++; 
        }

        while (j < a2) {
            arr[k] = right[j]; 
            await sleep(waiting_time); 
            colorSingle(k);
            j++; 
            k++; 
        }
    }

    async function mergeSort(arr, l, r) {
        if (l >= r) {
            return; 
        } else {
            let m = Math.floor((l + r) / 2); 
            // divide
            await sleep(waiting_time); 
            await mergeSort(arr, l, m); 
            await sleep(waiting_time); 
            await mergeSort(arr, m + 1, r); 
            // combine 
            await sleep(waiting_time); 
            await merge(arr, l, m, r); 
        }
    }

})();