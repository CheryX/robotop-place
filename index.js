let colors = ['red', 'blue', 'green']

function main() {
    let plane = document.getElementById('place');
    let ctx = plane.getContext('2d');
    let canBound = plane.getBoundingClientRect();

    let selColor = 1;
    let x = 0;
    let y = 0;

    // Get the mouse position on canvas
    document.body.addEventListener('mousemove', function(e) {
        x = e.clientX - canBound.left;
        y = e.clientY - canBound.top;
    })

    document.body.addEventListener('mouseup', function(e) {

        if (Math.floor(y/32) < 0 || Math.floor(y/32) > 15 || Math.floor(x/32) < 0 || Math.floor(x/32) > 15) {
            return;
        }
        
        if (e.button == 0) {

            placeData[Math.floor(y/32)][Math.floor(x/32)] = selColor;

        }

    });

    let placeData = new Array(16);
    for (let i = 0; i < placeData.length; i++) {
        placeData[i] = new Array(16);
    };

    // Placing bombs
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++ ) {
            placeData[i][j] = 0;

            if (placeData[i][j] === undefined) {
                placeData[i][j] = 0;
            }

        }
    }

    window.requestAnimationFrame(renderPlane);

    // Render the board
    function renderPlane() {

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 512, 512);

        // Draw bombs
        for (i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                ctx.fillStyle = colors[placeData[i][j]];
                ctx.fillRect(j*32, i*32, 32, 32)
            }
        }

        ctx.fillStyle = 'rgba(255,255,0,0.5)';
        ctx.fillRect(Math.floor(x/32)*32, Math.floor(y/32)*32, 32, 32)
        window.requestAnimationFrame(renderPlane);

    }

    // Change colors
    document.getElementById('red').addEventListener('click', function() {
        selColor = 0;
    });

    document.getElementById('blue').addEventListener('click', function() {
        selColor = 1;
    });

    document.getElementById('green').addEventListener('click', function() {
        selColor = 2;
    });

}

main();