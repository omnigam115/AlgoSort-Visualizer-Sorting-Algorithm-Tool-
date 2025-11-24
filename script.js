document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const arrayContainer = document.getElementById('array-container');
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const sortBtn = document.getElementById('sort-btn');
    const arraySizeSlider = document.getElementById('array-size');
    const speedSlider = document.getElementById('speed');
    const algorithmSelect = document.getElementById('algorithm');
    const sizeValue = document.getElementById('size-value');
    const speedValue = document.getElementById('speed-value');
    const currentAlgDisplay = document.getElementById('current-alg');
    const timeTakenDisplay = document.getElementById('time-taken');
    const comparisonsDisplay = document.getElementById('comparisons');
    const swapsDisplay = document.getElementById('swaps');
    const codeLanguageSelect = document.getElementById('code-language');
    const algorithmCodeDisplay = document.getElementById('algorithm-code');
    
    // Variables
    let array = [];
    let originalArray = [];
    let arraySize = parseInt(arraySizeSlider.value);
    let animationSpeed = 101 - parseInt(speedSlider.value);
    let isSorting = false;
    let startTime, endTime;
    let comparisons = 0;
    let swaps = 0;
    
    // Algorithm code snippets
    const algorithmCodes = {
        bubble: {
            javascript: `function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    
    return arr;
}`,
            python: `def bubble_sort(arr):
    n = len(arr)
    swapped = True
    
    while swapped:
        swapped = False
        for i in range(n - 1):
            if arr[i] > arr[i + 1]:
                # Swap elements
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        n -= 1
    
    return arr`,
            java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    
    do {
        swapped = false;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);
}`,
            cpp: `void bubbleSort(int arr[], int n) {
    bool swapped;
    
    do {
        swapped = false;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        n--;
    } while (swapped);
}`,
            c: `void bubbleSort(int arr[], int n) {
    int swapped;
    
    do {
        swapped = 0;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = 1;
            }
        }
        n--;
    } while (swapped);
}`
        },
        selection: {
            javascript: `function selectionSort(arr) {
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}`,
            python: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min_index = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    
    return arr`,
            java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
            cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`,
            c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`
        },
        insertion: {
            javascript: `function insertionSort(arr) {
    let n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}`,
            python: `def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr`,
            java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}`,
            cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}`,
            c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}`
        },
        merge: {
            javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
            python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
            java: `public static void mergeSort(int[] arr) {
    if (arr.length <= 1) return;
    
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    
    mergeSort(left);
    mergeSort(right);
    
    merge(arr, left, right);
}

private static void merge(int[] arr, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    
    while (i < left.length) {
        arr[k++] = left[i++];
    }
    
    while (j < right.length) {
        arr[k++] = right[j++];
    }
}`,
            cpp: `void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
            c: `void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    
    int L[n1], R[n2];
    
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    i = 0;
    j = 0;
    k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`
        },
        quick: {
            javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
            python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
            java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`,
            cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
            c: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`
        }
    };
    
    // Initialize
    updateSizeValue();
    updateSpeedValue();
    generateNewArray();
    updateAlgorithmCode();
    
    // Event listeners
    generateBtn.addEventListener('click', generateNewArray);
    resetBtn.addEventListener('click', resetArray);
    sortBtn.addEventListener('click', startSorting);
    arraySizeSlider.addEventListener('input', updateSizeValue);
    speedSlider.addEventListener('input', updateSpeedValue);
    algorithmSelect.addEventListener('change', updateAlgorithmCode);
    codeLanguageSelect.addEventListener('change', updateAlgorithmCode);
    
    // Functions
    function updateSizeValue() {
        arraySize = parseInt(arraySizeSlider.value);
        sizeValue.textContent = arraySize;
        generateNewArray();
    }
    
    function updateSpeedValue() {
        animationSpeed = 101 - parseInt(speedSlider.value);
        speedValue.textContent = speedSlider.value;
    }
    
    function generateNewArray() {
        if (isSorting) return;
        
        array = [];
        arrayContainer.innerHTML = '';
        
        for (let i = 0; i < arraySize; i++) {
            array.push(Math.floor(Math.random() * 100) + 5); // Values between 5-105
        }
        
        originalArray = [...array];
        renderArray();
        resetStats();
    }
    
    function resetArray() {
        if (isSorting) return;
        
        array = [...originalArray];
        renderArray();
        resetStats();
    }
    
    function resetStats() {
        comparisons = 0;
        swaps = 0;
        comparisonsDisplay.textContent = '0';
        swapsDisplay.textContent = '0';
        timeTakenDisplay.textContent = '0 ms';
        currentAlgDisplay.textContent = '-';
    }
    
    function renderArray() {
        arrayContainer.innerHTML = '';
        const containerHeight = arrayContainer.clientHeight;
        const maxValue = Math.max(...array);
        
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.width = `${100 / arraySize}%`;
            bar.setAttribute('data-value', value);
            arrayContainer.appendChild(bar);
        });
    }
    
    function updateAlgorithmCode() {
        const algorithm = algorithmSelect.value;
        const language = codeLanguageSelect.value;
        algorithmCodeDisplay.textContent = algorithmCodes[algorithm][language];
        algorithmCodeDisplay.className = `language-${language}`;
        hljs.highlightElement(algorithmCodeDisplay);
    }
    
    function startSorting() {
        if (isSorting) return;
        
        isSorting = true;
        generateBtn.disabled = true;
        resetBtn.disabled = true;
        sortBtn.disabled = true;
        
        const algorithm = algorithmSelect.value;
        currentAlgDisplay.textContent = algorithmSelect.options[algorithmSelect.selectedIndex].text;
        
        // Reset stats
        comparisons = 0;
        swaps = 0;
        comparisonsDisplay.textContent = '0';
        swapsDisplay.textContent = '0';
        
        // Start timer
        startTime = performance.now();
        
        switch (algorithm) {
            case 'bubble':
                bubbleSort();
                break;
            case 'selection':
                selectionSort();
                break;
            case 'insertion':
                insertionSort();
                break;
            case 'merge':
                mergeSort();
                break;
            case 'quick':
                quickSort();
                break;
            default:
                bubbleSort();
        }
    }
    
    function updateStats() {
        comparisonsDisplay.textContent = comparisons;
        swapsDisplay.textContent = swaps;
    }
    
    function markSorted() {
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.style.backgroundColor = '#2ecc71';
        });
        
        // End timer
        endTime = performance.now();
        timeTakenDisplay.textContent = `${(endTime - startTime).toFixed(2)} ms`;
        
        isSorting = false;
        generateBtn.disabled = false;
        resetBtn.disabled = false;
        sortBtn.disabled = false;
    }
    
    // Sorting Algorithms with Visualization
    async function bubbleSort() {
        const bars = document.querySelectorAll('.array-bar');
        let swapped;
        
        do {
            swapped = false;
            for (let i = 0; i < array.length - 1; i++) {
                // Highlight comparing bars
                bars[i].style.backgroundColor = '#e74c3c';
                bars[i + 1].style.backgroundColor = '#e74c3c';
                comparisons++;
                updateStats();
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                
                if (array[i] > array[i + 1]) {
                    // Highlight swapping bars
                    bars[i].style.backgroundColor = '#f39c12';
                    bars[i + 1].style.backgroundColor = '#f39c12';
                    await new Promise(resolve => setTimeout(resolve, animationSpeed));
                    
                    // Swap values
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    swaps++;
                    updateStats();
                    
                    // Update heights
                    bars[i].style.height = `${(array[i] / 105) * 100}%`;
                    bars[i + 1].style.height = `${(array[i + 1] / 105) * 100}%`;
                    
                    swapped = true;
                    
                    await new Promise(resolve => setTimeout(resolve, animationSpeed));
                }
                
                // Reset colors if not swapped
                if (!swapped || i === array.length - 2) {
                    bars[i].style.backgroundColor = '#3498db';
                    bars[i + 1].style.backgroundColor = '#3498db';
                }
            }
        } while (swapped);
        
        markSorted();
    }
    
    async function selectionSort() {
        const bars = document.querySelectorAll('.array-bar');
        
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            
            // Highlight current min
            bars[minIndex].style.backgroundColor = '#f39c12';
            
            for (let j = i + 1; j < array.length; j++) {
                // Highlight comparing bars
                bars[j].style.backgroundColor = '#e74c3c';
                comparisons++;
                updateStats();
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                
                if (array[j] < array[minIndex]) {
                    // Reset previous min
                    bars[minIndex].style.backgroundColor = '#3498db';
                    minIndex = j;
                    // Highlight new min
                    bars[minIndex].style.backgroundColor = '#f39c12';
                    await new Promise(resolve => setTimeout(resolve, animationSpeed));
                } else {
                    // Reset comparing bar
                    bars[j].style.backgroundColor = '#3498db';
                }
            }
            
            if (minIndex !== i) {
                // Highlight swapping bars
                bars[i].style.backgroundColor = '#f39c12';
                bars[minIndex].style.backgroundColor = '#f39c12';
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                
                // Swap values
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                swaps++;
                updateStats();
                
                // Update heights
                bars[i].style.height = `${(array[i] / 105) * 100}%`;
                bars[minIndex].style.height = `${(array[minIndex] / 105) * 100}%`;
                
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
            
            // Mark as sorted
            bars[i].style.backgroundColor = '#2ecc71';
        }
        
        // Mark last element as sorted
        bars[array.length - 1].style.backgroundColor = '#2ecc71';
        markSorted();
    }
    
    async function insertionSort() {
        const bars = document.querySelectorAll('.array-bar');
        
        for (let i = 1; i < array.length; i++) {
            let j = i;
            
            // Highlight current element
            bars[j].style.backgroundColor = '#e74c3c';
            comparisons++;
            updateStats();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            while (j > 0 && array[j] < array[j - 1]) {
                // Highlight swapping bars
                bars[j].style.backgroundColor = '#f39c12';
                bars[j - 1].style.backgroundColor = '#f39c12';
                comparisons++;
                updateStats();
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                
                // Swap values
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
                swaps++;
                updateStats();
                
                // Update heights
                bars[j].style.height = `${(array[j] / 105) * 100}%`;
                bars[j - 1].style.height = `${(array[j - 1] / 105) * 100}%`;
                
                // Reset colors
                bars[j].style.backgroundColor = '#3498db';
                bars[j - 1].style.backgroundColor = j === 1 ? '#2ecc71' : '#3498db';
                
                j--;
                
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
            
            // Mark as sorted
            bars[j].style.backgroundColor = '#2ecc71';
        }
        
        markSorted();
    }
    
    async function mergeSort() {
        await mergeSortHelper(0, array.length - 1);
        markSorted();
    }
    
    async function mergeSortHelper(l, r) {
        if (l < r) {
            const m = Math.floor((l + r) / 2);
            await mergeSortHelper(l, m);
            await mergeSortHelper(m + 1, r);
            await merge(l, m, r);
        }
    }
    
    async function merge(l, m, r) {
        const bars = document.querySelectorAll('.array-bar');
        const n1 = m - l + 1;
        const n2 = r - m;
        
        let L = new Array(n1);
        let R = new Array(n2);
        
        for (let i = 0; i < n1; i++) {
            L[i] = array[l + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = array[m + 1 + j];
        }
        
        let i = 0, j = 0, k = l;
        
        while (i < n1 && j < n2) {
            // Highlight comparing bars
            if (l + i < bars.length) bars[l + i].style.backgroundColor = '#e74c3c';
            if (m + 1 + j < bars.length) bars[m + 1 + j].style.backgroundColor = '#e74c3c';
            comparisons++;
            updateStats();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            if (L[i] <= R[j]) {
                array[k] = L[i];
                i++;
            } else {
                array[k] = R[j];
                j++;
            }
            
            // Update height
            bars[k].style.height = `${(array[k] / 105) * 100}%`;
            
            // Highlight merged element
            bars[k].style.backgroundColor = '#f39c12';
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            // Reset color
            bars[k].style.backgroundColor = '#3498db';
            
            k++;
        }
        
        while (i < n1) {
            array[k] = L[i];
            bars[k].style.height = `${(array[k] / 105) * 100}%`;
            bars[k].style.backgroundColor = '#f39c12';
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            bars[k].style.backgroundColor = '#3498db';
            i++;
            k++;
        }
        
        while (j < n2) {
            array[k] = R[j];
            bars[k].style.height = `${(array[k] / 105) * 100}%`;
            bars[k].style.backgroundColor = '#f39c12';
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            bars[k].style.backgroundColor = '#3498db';
            j++;
            k++;
        }
    }
    
    async function quickSort() {
        await quickSortHelper(0, array.length - 1);
        markSorted();
    }
    
    async function quickSortHelper(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }
    
    async function partition(low, high) {
        const bars = document.querySelectorAll('.array-bar');
        const pivot = array[high];
        let i = low - 1;
        
        // Highlight pivot
        bars[high].style.backgroundColor = '#9b59b6';
        
        for (let j = low; j < high; j++) {
            // Highlight comparing bars
            bars[j].style.backgroundColor = '#e74c3c';
            comparisons++;
            updateStats();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            if (array[j] < pivot) {
                i++;
                
                // Highlight swapping bars
                bars[i].style.backgroundColor = '#f39c12';
                bars[j].style.backgroundColor = '#f39c12';
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                
                // Swap values
                [array[i], array[j]] = [array[j], array[i]];
                swaps++;
                updateStats();
                
                // Update heights
                bars[i].style.height = `${(array[i] / 105) * 100}%`;
                bars[j].style.height = `${(array[j] / 105) * 100}%`;
                
                // Reset colors
                bars[i].style.backgroundColor = '#3498db';
                bars[j].style.backgroundColor = '#3498db';
            } else {
                // Reset comparing bar
                bars[j].style.backgroundColor = '#3498db';
            }
        }
        
        // Highlight final swap
        bars[i + 1].style.backgroundColor = '#f39c12';
        bars[high].style.backgroundColor = '#f39c12';
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        
        // Swap pivot to correct position
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swaps++;
        updateStats();
        
        // Update heights
        bars[i + 1].style.height = `${(array[i + 1] / 105) * 100}%`;
        bars[high].style.height = `${(array[high] / 105) * 100}%`;
        
        // Reset colors
        bars[i + 1].style.backgroundColor = '#3498db';
        bars[high].style.backgroundColor = '#3498db';
        
        return i + 1;
    }
});