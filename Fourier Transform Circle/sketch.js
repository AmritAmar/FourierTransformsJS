// Set up
let time = 0;
let path = [];

//DFT
let signalX = [];
let signalY = [];
let fourierX;
let fourierY;

function setup() {
  frameRate(30);
  createCanvas(700, 400);
  
  for (let i = 0; i < 100; i++) {
    let angle = map(i, 0, 100, 0, TWO_PI);
    
    signalX[i] = 50 * cos(angle);
    signalY[i] = 50 * sin(angle);
  }

  fourierX = dft(signalX);
  fourierY = dft(signalY);
  
  fourierX.sort((a,b) => b.amp - a.amp);
  fourierY.sort((a,b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    
    // Square Curve 
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase + rotation;
    x += radius * cos(freq * time + phase);
    y += radius * sin(freq * time + phase);
  
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
  
    fill(200);
    stroke(255);
    ellipse(x, y, 1);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  
  vx = epicycles(width/2, 75, 0, fourierX);
  vy = epicycles(75, height/2, HALF_PI, fourierY);
  
  let v = createVector(vx.x, vy.y);
  
  // Add final point to the array
  path.unshift(v);
  
  // Draw the wave on the side
  //translate(200,0)
  line(vx.x, vx.y, path[0].x, path[0].y); 
  line(vy.x, vy.y, path[0].x, path[0].y); 
  
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();
  
  // Increment Time
  const dt = TWO_PI / fourierY.length;
  time += dt;
  
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
  
  // Remove any extra points 
  //if (path.length > 95) {
  //  path.pop();
  //}
}