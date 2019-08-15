// Set up
let time = 0;
let wave = [];

// UI
let slider;
let select;

// Mode
let mode = 1;

function setup() {
  createCanvas(600, 400);
  slider = createSlider(1,20,1);
  select = createSelect();
  select.position(10, 10);
  select.option('Square Wave');
  select.option('Sawtooth Wave');
  select.changed(mySelectEvent);
}

function mySelectEvent() {
  var item = select.value();
  if (item == 'Square Wave') {
    mode = 1;
  } else {
    mode = 2;
  }
}

function getCurve(i) {
  let n, r, x, y = 0;
  if (mode == 1) {
    n = i * 2 + 1;
    r = 75 * (4 / (n * PI));
    x = r * cos(n * time);
    y = r * sin(n * time);
    return [r, x, y];
  } else {
    n = i + 1;// * 2 + 1
    r = 150 * (2 / (-n * PI));
    x = r * cos(n * time);
    y = r * sin(n * time);
    return [r, x, y];
  }
}

function draw() {
  background(0);
  translate(175,200)
  
  // Create a circles and points
  let x = 0;
  let y = 0;
  let radius = 0;
  
  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;
    
    // Get 
    var values = getCurve(i);
    radius = values[0];
    x += values[1];
    y += values[2];
  
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
  
    fill(200);
    stroke(255);
    //ellipse(x, y, 4);
    line(prevx, prevy, x, y);
  }
  
  // Add final point to the array
  wave.unshift(y);
  
  // Draw the wave on the side
  translate(200,0)
  line(x - 200, y, 0, wave[0]); 
  
  noFill();
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  
  // Increment Time
  time += 0.05;
  
  // Remove any extra points 
  if (wave.length > 175) {
    wave.pop();
    wave.pop();
  }
}