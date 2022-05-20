let colors = {
    'white': '#ffffff',
    'black': '#222222',
    'gray': '#8e8e8e',
    'lightgray': '#e4e4e4',
    'brown': '#a5714b',
    'red': '#e50000',
    'orange': '#e59500',
    'yellow': '#e5d900',
    'lime': '#94e044',
    'green': '#02be01',
    'lightblue': '#00d3dd',
    'teal': '#0083c7',
    'blue': '#0000ea',
    'purple': '#820080',
    'magenta': '#cf6ee4',
    'pink': '#ffa7d1'
}

let plane = document.getElementById('place');
let ctx = plane.getContext('2d');
let canBound = plane.getBoundingClientRect();

// Selected color (default: black)
let selColor = 0;

// Initialize the plane
let placeData = new Array(32);
for (let i = 0; i < placeData.length; i++) {
    placeData[i] = new Array(32);
    for (let j = 0; j < 32; j++ ) {
        placeData[i][j] = 0;
    }
};

let x, y;
document.body.addEventListener('mousemove', function(e) {
    x = e.clientX - canBound.left;
    y = e.clientY - canBound.top;

    if (x > 0 && x < plane.width && y > 0 && y < plane.height && e.buttons === 1) {
    
        if (e.button == 0) {
            placeData[Math.floor(y/16)][Math.floor(x/16)] = selColor;
        }
    
    }
    render();
});

function render() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 512, 512);

    for (i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            ctx.fillStyle = Object.values(colors)[placeData[i][j]];
            ctx.fillRect(j*16, i*16, 16, 16)
        }
    }

    ctx.fillStyle = '#ffff0088';
    ctx.fillRect(Math.floor(x/16)*16, Math.floor(y/16)*16, 16, 16);
}


let alf = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-",  "="];
let output = document.getElementById('commands');

document.getElementById('display').addEventListener('click', function() {
    output.innerText = "";
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            if (placeData[i][j] != 0) {
                let colorName = Object.keys(colors)[placeData[i][j]];
                output.innerText += "r!pl " + (parseFloat(i)+1) + alf[j] + " " + colorName + "\n";
            }
        }
    } 
});

document.getElementById('clear').addEventListener('click', function() {
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            placeData[i][j] = 0;
        }
    }
});

let buttons = document.getElementsByClassName('color-btn');
for (let i = 0; i < buttons.length; i++) {

    buttons[i].style.backgroundColor = Object.values(colors)[i];
    buttons[i].addEventListener('click', function(e) {
        selColor = i;
    })
}