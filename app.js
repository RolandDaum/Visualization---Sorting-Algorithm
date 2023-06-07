//nachdem der body geladen wurde wartet er, bis ein regler betätigt wird und dividiert dann 100 durch den maximal wert des Reglers und multipliziert ihn dann mit dem aktuellem positionswert des Reglers. Daraus ergibt sich die position des Reglers im verhältnis zur gesamtlänge des range inputs. Nun werden die zwei bereiche (Mitte ist der errechnete Prozentwert) mit hilfe eines linear gradiants unterschiedliche gefärbt. Da es duchr positionierungs fehler/ungenauigkeiten die prozentzahl nicht genau dem entspricht, wo der regler ist, subtrahieren wir noch 2%, damit die grenze nicht sichbar ist.
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("input_bars").addEventListener('input', function() {
        var rangevalue = this.value;

        document.getElementById("input_bars").style.background = 'linear-gradient(to right, #159895 0%, #159895 ' + (100/this.max*rangevalue-2) + '%, #002B5B ' + (100/this.max*rangevalue-2) + '%, #002B5B 100%)';
        document.getElementById("input_bars_value").innerHTML = "[" + rangevalue + "]";

        document.getElementById("div_bar").innerHTML = ""
        for (i = 0; i < rangevalue; i++) {
            document.getElementById("div_bar").innerHTML = document.getElementById("div_bar").innerHTML + '<div class="bar"></div>'
        }
        document.querySelectorAll('.bar').forEach(function(element) {
          element.style.width = (100/rangevalue/2) + "%";
        });
        chanegheight()
    });

    document.getElementById("input_sortspeed").addEventListener('input', function() {
        var rangevalue = this.value;

        document.getElementById("input_sortspeed").style.background = 'linear-gradient(to right, #159895 0%, #159895 ' + (100/this.max*rangevalue-2) + '%, #002B5B ' + (100/this.max*rangevalue-2) + '%, #002B5B 100%)';
        document.getElementById("input_sortspeed_value").innerHTML = "[" + rangevalue + "]";
    });
});

function chanegheight() {
    for (i = 0; i < document.querySelectorAll(".bar").length; i++) {
        document.getElementsByClassName("bar")[i].style.height = ((100/document.querySelectorAll(".bar").length)*i+1) + "%"
    }
}

function randomize() {
    var container = document.getElementById("div_bar");
    var boxes = Array.from(container.querySelectorAll(".bar"));
    boxes.sort(function() { return 0.5 - Math.random() });
    for (var i = 0; i < boxes.length; i++) {
      container.appendChild(boxes[i]);
    }
}

async function sortbars() {
    var stillsonthingbigger = true
    while (stillsonthingbigger) {
        stillsonthingbigger = false
        for (i = 0; i < document.querySelectorAll(".bar").length-1; i++) {
            if (parseInt(document.getElementsByClassName("bar")[i].style.height) > parseInt(document.getElementsByClassName("bar")[i+1].style.height)) {

                document.getElementById("div_bar").insertBefore(document.getElementsByClassName("bar")[i+1], document.getElementsByClassName("bar")[i])
                              
                stillsonthingbigger = true

//                 playFreq(20*i, 0.005)

                document.getElementsByClassName("bar")[i].style.background = "red"
                await sleep((11 - document.getElementById("input_sortspeed").value) ** 2);
                document.getElementsByClassName("bar")[i].style.background = ""

            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const audioCtx = new AudioContext();
// function playFreq(freq, duration) {
//   const oscillator = audioCtx.createOscillator();
//   oscillator.type = "sine";
//   oscillator.frequency.value = freq;
//   oscillator.connect(audioCtx.destination);
//   oscillator.start();
//   oscillator.stop(audioCtx.currentTime + duration);
// }
