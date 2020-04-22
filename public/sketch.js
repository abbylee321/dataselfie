window.addEventListener('load', () => {
        });
        var video;
    

        function setup() {
            createCanvas(640,400);
            pixelDensity(1);
            const video = createCapture(VIDEO);
          background(51);
        // particle = new Particle(320, 240); 
        // fill(255,0,0);
        // ellipse(200, 200, 100);
        // blendMode(LIGHTEST);
        // background(52);
        //taking video canvas and converting it to base64 and putting it in this variable image  
        video.size(320,240);
        const button = document.getElementById("location-button");
        button.onclick = async function fetchLocation() {
            if('geolocation' in navigator) {
            /* geolocation is available */
            console.log('geolocation available');
            //get current position. when it's ready. call this callback, pass in position and console log it 
            navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const vegetable = document.getElementById('vegetable').value;
                const timestamp = Date.now();
                // console.log(timestamp);
                // data.timestamp = timestamp;
                video.loadPixels(); 
                fill(255);
                const image64 = video.canvas.toDataURL();
                document.getElementById('latitude').textContent = lat;
                document.getElementById('longitude').textContent = lon;
                //send this data from client side
                const data = { lat, lon, vegetable, image64, timestamp};
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify(data)
                };
                //body is where I'm packaging up all my data 
                //take data and make into JSON string
                //useful to specify sending json data - specifiy that in a header 
                const response = await fetch('/api', options);
                const json = await response.json();
                console.log(json);
            });
        } else {
        /* geolocation IS NOT available */
            console.log('geolocation not available');
        }
        }
    } 
        function draw() {
            // image(video, 0, 0, 320, 240);
            fill(255,0,0);
            ellipse(100,100,50);
        }
    