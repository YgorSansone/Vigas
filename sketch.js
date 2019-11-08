function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(222,222,222);
  x = 10;
  rect(30, 100, 350, 30);
  triangle(10+x, 150, 20+x, 130, 30+x, 150);
  circle(365+x, 141, 20);
  drawArrow(325,100,toRadians(110),60);
  drawArrow(200,130,toRadians(250),40);
  //arc(360, 100, 50, 50, 0, HALF_PI/2);
}

function toRadians(grades) {
  return TWO_PI*grades/360
}

function drawArrow(x1, y1, angle,N){
  size = N;
  t = 12;
  v = 5;
  
  x2 = size*cos(angle) + x1
  y2 = -size*sin(angle) + y1
  
  x3 = t*cos(angle) + x1
  y3 = -t*sin(angle) + y1
  
  _x1 = 5*cos(angle) + x1
  _y1 = -5*sin(angle) + y1
  
  x4 = v*cos(toRadians(90)-angle) + x3
  y4 = v*sin(toRadians(90)-angle) + y3
  
  x5 = -v*cos(toRadians(90)-angle) + x3
  y5 = -v*sin(toRadians(90)-angle) + y3
  
  strokeWeight(3);
  line(_x1, _y1, x2, y2);
  strokeWeight(1);
  triangle(x4,y4, x1, y1, x5, y5);
}
