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
            runSort = false
            element.style.background = 'linear-gradient(to right, #EFC9A4 0%, #EFC9A4 ' + (91.1111111111/this.max*this.value) + '%, #B0B4B7 ' + (91.1111111111/this.max*this.value) + '%, #B0B4B7 100%)';
        });
        element.style.background = 'linear-gradient(to right, #EFC9A4 0%, #EFC9A4 ' + (91.1111111111/element.max*element.value) + '%, #B0B4B7 ' + (91.1111111111/element.max*element.value) + '%, #B0B4B7 100%)';
    });
}
// Assigning the Eventlistener to the Bar Number Slider
function AEL_barnumberslider() {
    ID_barnumberslider.addEventListener("change", () => {
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
        if (ID_sortselect.value === 'Bubblesort V.1') {
            VS_SORT_bubblesortV1()
        }
        else if(ID_sortselect.value === 'Bubblesort V.2') {
            VS_SORT_bubblesortV2()
        }
        else if (ID_sortselect.value === 'Quicksort') {
            VS_SORT_quicksort()
        }
    })
}

// Bubble Sort
//real
async function VS_SORT_bubblesortV1() {
    var somethingChanged = true
    while (somethingChanged) {
        somethingChanged = false
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > dataArray[i+1]) {
                SORT_swap(i,i+1)
                somethingChanged = true
            }

            if (!runSort) {
                break;
            }
            document.getElementsByClassName('bar')[i].classList.add('bar_active')
            await sleep(10*ID_sortspeedslider.value)
            document.getElementsByClassName('bar')[i].classList.remove('bar_active')
            ArrayBar();
        }
    }
}
//fake
async function VS_SORT_bubblesortV2() {
    var somethingChanged = true
    while (somethingChanged) {
        somethingChanged = false
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > dataArray[i+1]) {
                SORT_swap(i,i+1)
                somethingChanged = true

                document.getElementsByClassName('bar')[i].classList.add('bar_active')
                await sleep(10*ID_sortspeedslider.value)
                document.getElementsByClassName('bar')[i].classList.remove('bar_active')
                ArrayBar();
            }

            if (!runSort) {
                break;
            }
        }
    }
}

async function VS_SORT_quicksort() {
    await compare(0,dataArray.length)
}

async function compare(x,y) { 
    let l = x
    let r = y
    // Durch die neuen Grenzen wird irgendwie nie 1 erreicht, wodurch das ganze bereits in der ersten kleinsten recrusiven aufrufung in einer infinity schleife stuck ist
    // console.log(`Y: ${y}, X: ${x} = ` + (y-x))
    if ((y - x) <= 1) {
        return;
    }
    else {
        let middleIndex = findMiddleIndexValue(x, y)
        let middleIndexValue = dataArray[middleIndex]
        dataArray.splice(y + 1, 0, parseInt(dataArray.splice(middleIndex, 1)));
        for (let i = 0; i < (y-x); i++) {
            if (l >= r) {
                break
            }
            if (dataArray[l] > middleIndexValue) {
                dataArray.splice(y + 1, 0, parseInt(dataArray.splice(l, 1)));
                l--
            }
            if (dataArray[r] < middleIndexValue) {
                dataArray.splice(x, 0, parseInt(dataArray.splice(r, 1)));
                r++
            }

            // document.getElementsByClassName('bar')[l].classList.add('bar_active')
            // document.getElementsByClassName('bar')[r].classList.add('bar_active')

            await sleep(10*ID_sortspeedslider.value)

            // document.getElementsByClassName('bar')[l].classList.remove('bar_active')
            // document.getElementsByClassName('bar')[r].classList.remove('bar_active')

            ArrayBar();

            l++
            r--
        }
        // compare(x,Math.floor((y-x)/2)-1)
        // compare(Math.floor((y-x)/2)-1,y)

        
    }
}
function findMiddleIndexValue(x,y) {
    let middle = null
    let l = x
    let r = y
    for (let i = 0; i < (y-x); i++) {
        middle = middle + dataArray[l]
        l++
    }
    middle = middle/(y-x)

    l = x
    r = y
    let middleIndex = l
    for (let i = 0; i < (y-x); i++) {
        if (Math.sqrt((middle - dataArray[l])**2) < Math.sqrt((middle - dataArray[middleIndex])**2)) {
            middleIndex = l
        }
        l++
    }

    return middleIndex
}


function SORT_swap(x,y) {
    let tmp = dataArray[y]
    dataArray[y] = dataArray[x]
    dataArray[x] = tmp
}


// Just works in async func called with await
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}