const USER = 0;
const FOURIER = 1;

// Set up
let time = 0;
let path = [];
let state = -1;
let drawing = [];
let speedMod = 1.00;

//DFT
let signal = [];
let fourier = [];
let removedFourier = [];

function setup() {
  frameRate(30);
  createCanvas(700, 400);
}

function mousePressed() {
  state = USER;
  drawing = [];
  signal = [];
  fourier = [];
  time = 0;
  path = [];
  
}

function mouseReleased() {
  state = FOURIER;
  const skip = 1;
  for (let i = 0; i < drawing.length; i+=skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    signal.push(c);
  }

  fourier = dft(signal);
  
  fourier.sort((a,b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase + rotation;
    x += radius * cos(freq * time + phase);
    y += radius * sin(freq * time + phase);
  
    stroke(255, 50);
    noFill();
    ellipse(prevx, prevy, radius * 2);
  
    fill(200);
    stroke(200);
    ellipse(x, y, 1);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(31);
  
  if (state == USER) {
    let point = createVector(mouseX - width/2, mouseY - height/2);
    drawing.push(point);
    
    stroke(255);
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + width/2, v.y + height/2);
    }
    endShape();
    
  } else if (state == FOURIER) {
    //Draw the drawing in faint color
    stroke(115);
    noFill();
    beginShape();
    for (let v of drawing) {
      vertex(v.x + width/2, v.y + height/2);
    }
    endShape();
    
    v = epicycles(width/2, height/2, 0, fourier);
  
    // Add final point to the array
    path.unshift(v);

    noFill();
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].x, path[i].y);
    }
    endShape();
  
    // Increment Time
    const dt = (TWO_PI / fourier.length) * speedMod;
    time += dt;
  
    if (time > TWO_PI) {
      time = 0;
      path = [];
    }
    
    fill(255);
    textSize(18);
    text("Epicycles used: " + fourier.length, 10, 20);
    text("Current  Speed: " + speedMod, 10, 40);
    
    // Remove any extra points 
    if (path.length > 600) {
      path.pop();
    }
  }
  
    
}

function keyPressed() {
  path = [];
  time = 0;
  if (keyCode == 65) {
	if (fourier.length === 1) return;
    removedFourier.push(fourier.pop());
  }
  else if (keyCode == 68) {
	if (removedFourier.length == 0) return;
    fourier.push(removedFourier.pop());
  }
  else if (keyCode == 87) {
	speedMod += 0.05;
  }
  else if (keyCode == 83) {
	speedMod -= 0.05;
  }
}