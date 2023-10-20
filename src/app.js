let dataArray = [1,2,3,4,5,6,7,8,9,10]

const ID_barnumberslider = document.getElementById('BarNumberSlider')
const ID_barDiv = document.getElementById('bar_div')
const ID_shuffelbutton = document.getElementById('shuffel')
const ID_sortbutton = document.getElementById('sort')
const ID_sortselect = document.getElementById('sortSelect')
const ID_sortspeedslider = document.getElementById('SortSpeedSlider')
const ID_algname = document.getElementById('algName')
const ID_spanbarnum = document.getElementById('spanbarnum')
const ID_spanspeed = document.getElementById('spanspeed')
let runSort = true

document.addEventListener('DOMContentLoaded', function() {
    UI_slider()
    AEL_selectsort()
    AEL_barnumberslider()
    AEL_sortspeedslider()
    AEL_shuffelArray()
    AEL_sort()
    
    // enetial setup for the default dataArray
    ArrayBar()
});

// UI function for the slider
function UI_slider() {
    document.querySelectorAll('.slider').forEach(element => {
        element.addEventListener('input', function() {
            element.style.background = 'linear-gradient(to right, #EFC9A4 0%, #EFC9A4 ' + (91.1111111111/this.max*this.value) + '%, #B0B4B7 ' + (91.1111111111/this.max*this.value) + '%, #B0B4B7 100%)';
        });
        element.style.background = 'linear-gradient(to right, #EFC9A4 0%, #EFC9A4 ' + (91.1111111111/element.max*element.value) + '%, #B0B4B7 ' + (91.1111111111/element.max*element.value) + '%, #B0B4B7 100%)';
    });
}
// Assigning the Eventlistener to the Bar Number Slider
function AEL_barnumberslider() {
    ID_barnumberslider.addEventListener("change", () => {
        runSort = false
        ID_spanbarnum.innerHTML = ID_barnumberslider.value
        dataArray = []
        for (let i=0; i < ID_barnumberslider.value; i++) {
            dataArray.push(i+1) 
        }
        ArrayBar()
    })
}
function AEL_sortspeedslider() {
    ID_sortspeedslider.addEventListener('change', () => {
        ID_spanspeed.innerHTML = ID_sortspeedslider.value*10
    })
}
function AEL_selectsort() {
    ID_sortselect.addEventListener('change', () => {
        runSort = false
        ID_algname.innerHTML = ID_sortselect.value
    })
}
// (drawing) the dataArray into html
function ArrayBar() {
    ID_barDiv.innerHTML = ''
    var barHTML = ''
    for (let i=0; i < dataArray.length; i++) {
        barHTML += `<bar class="bar" id="${dataArray[i]}"></bar>`;
    }
    ID_barDiv.innerHTML = barHTML

    document.querySelectorAll(".bar").forEach(element => {
        const marginValue = (100 / ID_barnumberslider.value) / 4;              
        element.style.margin = `0 ${marginValue}% 0 ${marginValue}%`;
        element.style.height = 100/ID_barnumberslider.value*element.id + '%'
    });
}
// reading the html intop the dataArray
function BarArray() {
    dataArray = []
    document.querySelectorAll('.bar').forEach(element => {
        dataArray.push(element.id);
    });
}
// shuffel the array and drawing it via ArrayBar
function AEL_shuffelArray() {
    ID_shuffelbutton.addEventListener('click', () => {
        for (let i=0; i < dataArray.length; i++) {
            runSort = false
            let newIndex = Math.floor(Math.random()*dataArray.length)
            dataArray.splice(newIndex, 0, dataArray.splice(i,1)[0])
        }
        ArrayBar()
    })
}

function AEL_sort() {
    ID_sortbutton.addEventListener('click', () => {
        runSort = true
        if (ID_sortselect.value === 'Bubblesort') {
            VS_SORT_bubblesort()
        }
        else if (ID_sortselect.value === 'Quicksort') {
            VS_SORT_quicksort()
        }
    })
}

// Bubble Sort
async function VS_SORT_bubblesort() {
    var somethingChanged = true
    while (somethingChanged) {
        somethingChanged = false
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > dataArray[i+1]) {

                // Visual - rot, wenn das danach kleiner als das davor ist
                ArrayBar()
                document.getElementsByClassName('bar')[i].classList.add('bar_active2')
                document.getElementsByClassName('bar')[i+1].classList.add('bar_active2')
                await sleep(10*ID_sortspeedslider.value)
                document.getElementsByClassName('bar')[i].classList.remove('bar_active2')
                document.getElementsByClassName('bar')[i+1].classList.remove('bar_active2')

                SORT_swap(i,i+1)
                somethingChanged = true

                // Visual, wenn fertig getauscht wurde
                ArrayBar()
                document.getElementsByClassName('bar')[i].classList.add('bar_active2')
                document.getElementsByClassName('bar')[i+1].classList.add('bar_active2')
                await sleep(10*ID_sortspeedslider.value)
                document.getElementsByClassName('bar')[i].classList.remove('bar_active2')
                document.getElementsByClassName('bar')[i+1].classList.remove('bar_active2')
            }
            if (!runSort) {
                break;
            }

            // Visual - blau für jeden normalen schritt
            ArrayBar();
            document.getElementsByClassName('bar')[i].classList.add('bar_active')
            await sleep(10*ID_sortspeedslider.value)
            document.getElementsByClassName('bar')[i].classList.remove('bar_active')
        }
    }
}
async function SORT_swap(x,y) {
    let tmp = dataArray[y]
    dataArray[y] = dataArray[x]
    dataArray[x] = tmp
}

// Quicksort
async function VS_SORT_quicksort() {
    await quickSort(dataArray)
    ArrayBar()
}
async function quickSort(dataArray, start = 0, end = dataArray.length - 1) {
    if (start < end) {
        const pivotIndex = await partition(dataArray, start, end);
        await quickSort(dataArray, start, pivotIndex - 1);
        await quickSort(dataArray, pivotIndex + 1, end);
    }
}
async function partition(dataArray, start, end) {
    const pivot = dataArray[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (dataArray[j] <= pivot) {
            i++;

            // wenn der wert rechts kleiner als der pivot wert ist (pivot ist hier = der letzte wert aus dem dataArray bzw. dem bereich), werden die werte links und rechts getauscht, und der Zeiger links geht eins weiter
            [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];

            // Visual - rot, wenn zweit werte gerauscht
            ArrayBar()
            document.getElementsByClassName('bar')[i].classList.add('bar_active2')
            document.getElementsByClassName('bar')[j].classList.add('bar_active2')
            await sleep(10*ID_sortspeedslider.value)
            document.getElementsByClassName('bar')[i].classList.remove('bar_active2')
            document.getElementsByClassName('bar')[j].classList.remove('bar_active2')

        }
        // Visual - blau, wenn nichts passirt und eingach nur eins weitergegangen wird
        ArrayBar()
        document.getElementsByClassName('bar')[i + 1].classList.add('bar_active')
        document.getElementsByClassName('bar')[j + 1].classList.add('bar_active')
        await sleep(10*ID_sortspeedslider.value)
        document.getElementsByClassName('bar')[i + 1].classList.remove('bar_active')
        document.getElementsByClassName('bar')[j + 1].classList.remove('bar_active')

    }

    [dataArray[i + 1], dataArray[end]] = [dataArray[end], dataArray[i + 1]];
    return i + 1;
}

function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}