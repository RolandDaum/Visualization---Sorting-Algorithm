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

document.addEventListener('DOMContentLoaded', () => {
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
        // for (let i = 0; i < 10; i++) {
        //     ID_shuffelbutton.click()
        // }
    })
}
function AEL_sortspeedslider() {
    ID_sortspeedslider.addEventListener('change', () => {
        ID_spanspeed.innerHTML = ID_sortspeedslider.value
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
// Eventlistener for the sort Button
function AEL_sort() {
    ID_sortbutton.addEventListener('click', () => {
        runSort = true
        switch (ID_sortselect.value) {
            case 'Bubblesort':
                VS_SORT_bubblesort()
                break;
            case 'Quicksort':
                VS_SORT_quicksort(0,dataArray.length-1)
                break;
            case 'Selection Sort':
                VS_SORT_selectionsort();
                break;
            case 'Algorithm':
                window.alert("please choose a sorting algorythm first");
                break;
            case 'TEST':
                VS_SORT_selectionsortbutwithlisttosaveminvalues();
                break;
        }
    })
}

function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
async function drawArrayMarkBar(BarIndex1, BarIndex2) {
    ArrayBar()
    document.getElementsByClassName('bar')[BarIndex1].classList.add('bar_active2')
    document.getElementsByClassName('bar')[BarIndex2].classList.add('bar_active2')
    await sleep(ID_sortspeedslider.value)
    document.getElementsByClassName('bar')[BarIndex1].classList.remove('bar_active2')
    document.getElementsByClassName('bar')[BarIndex2].classList.remove('bar_active2')
}

async function VS_SORT_selectionsort() {
    let leftIndex = 0;
    let nIndex = dataArray.length-1;
    while (leftIndex <= nIndex) {
        let minIndex = leftIndex;
        for (let i = leftIndex; i <= nIndex; i++) {
            if (!runSort) {return;}
            await drawArrayMarkBar(minIndex, i)
            if (dataArray[i] < dataArray[minIndex]) {
                minIndex = i;
            }
        }
        let minVal = dataArray[minIndex];
        let leftVal = dataArray[leftIndex];
        dataArray[minIndex] = leftVal;
        dataArray[leftIndex] = minVal;
        leftIndex++;
    }
    ArrayBar()
}
async function VS_SORT_bubblesort() {
    let nIndex = dataArray.length-1;
    while (nIndex > 0) {
        for (let i = 0; i < nIndex; i++) {
            if (!runSort) {return;}
            if (dataArray[i] > dataArray[i+1]) {
                await drawArrayMarkBar(i, i+1)
                let iVal = dataArray[i];
                let iiVal = dataArray[i+1];
                dataArray[i] = iiVal;
                dataArray[i+1] = iVal;
            }
        }
        nIndex--;
    }
    ArrayBar();
}
async function VS_SORT_quicksort(left, right) {
    if (left >= right) {return;}
    let pivotVal = dataArray[right];
    let pushCount = 0;
    for (let i = left; i < right-pushCount; i++) {
        if (!runSort) {return;}
        await drawArrayMarkBar(i, right-pushCount)
        if (dataArray[i] > pivotVal) {
            dataArray.splice(right+1, 0, dataArray[i])
            dataArray.splice(i, 1);
            pushCount++;
            i--;
        }
    }
    let middle = right-pushCount-1;
    await VS_SORT_quicksort(left, middle);
    await VS_SORT_quicksort(middle+1, right);
}