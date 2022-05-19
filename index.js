let colors = [
    '#ffffff',
    '#222222',
    '#8e8e8e',
    '#e4e4e4',
    '#a5714b',
    '#e50000',
    '#e59500',
    '#e5d900',
    '#94e044',
    '#02be01',
    '#00d3dd',
    '#0083c7',
    '#0000ea',
    '#820080',
    '#cf6ee4',
    '#ffa7d1'
]
function main() {
    let plane = document.getElementById('place');
    let ctx = plane.getContext('2d');
    let canBound = plane.getBoundingClientRect();

    let selColor = 0;

    let placeData = new Array(32);
    for (let i = 0; i < placeData.length; i++) {
        placeData[i] = new Array(32);
    };
    
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++ ) {
            placeData[i][j] = 0;

            if (placeData[i][j] === undefined) {
                placeData[i][j] = 0;
            }

        }
    }
    
    document.body.addEventListener('mouseup', function(e) {
        let x = e.clientX - canBound.left;
        let y = e.clientY - canBound.top;

        if (x > 0 && x < plane.width && y > 0 && y < plane.height) {

            if (e.button == 0) {
                placeData[Math.floor(y/16)][Math.floor(x/16)] = selColor;
            }

        }
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 512, 512);

        for (i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                ctx.fillStyle = colors[placeData[i][j]];
                ctx.fillRect(j*16, i*16, 16, 16)
            }
        }

    });

    
    let alf = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-",  "="];
    let output = document.getElementById('commands');

    document.getElementById('display').addEventListener('click', function() {
        output.innerText = "";
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                if (placeData[i][j] != 0) {
                    output.innerText += "r!pl " + (parseFloat(i)+1) + alf[j] + " " + colors[placeData[i][j]] + "\n";
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
        buttons[i].style.backgroundColor = colors[i+1];

        buttons[i].addEventListener('click', function(e) {
            selColor = i+1;
        })
    }

        
}

main();