var ar
var bar
var viga
var massa

function setup() {
  var canvas =  createCanvas(750, 250);
  ar = []
  bar = 30
  canvas.parent('sketch-holder');
  createP('Tamanho da Barra:')
  let tamanho = createInput(bar,'number')
  createP('Massa da Barra:')
  massa = createInput(0,'number')
  massa.input(limitBar);
  createP('Número de Forças:')
  let inp = createInput(0,'number');
  inp.input(setNumberofForces);
  tamanho.input(setBarSize)
  createP()
}

class Force {
  constructor(intensity, distance, angle, sentido) {
    this.intensity = intensity;
    this.distance = distance;
    this.angle = angle;
    this.sentido = sentido;
    this.getFx = () => {
      return intensity*cos(toRadians(this.angle - 180))*(!this.sentido*-2 + 1) 
    }
    this.getFy = () => {
      return intensity*sin(toRadians(this.angle - 180))*(!this.sentido*2 - 1)
    }
    this.getTy = () => {
      return this.getFy()*this.distance
    }
  }  
}

class Viga {
  constructor(length, weight) {
    this.length = length
    this.weight = 9.8*weight
    this.forces = []
    this.getAx = () => {
      var s = 0
      this.forces.forEach(f=>{
        s += f.getFx()
      })
      return -s
    }
    this.getAy = () => {
      var s = 0
      this.forces.forEach(f=>{
        s += f.getFy()
      })
      return s - this.getFb()
    }
    this.getFb = () => {
      var s = 0
      this.forces.forEach(f=>{
        s += f.getTy()
      })
      return s/this.length
    }
  }
}

function setBarSize() {
  bar = parseInt(this.value())
}

function limitBar(){
  var v  = this.value()
  if(v < 0){
    this.value(0)
  }else if(v[0] == 0 && v.length > 1){
    this.value(v[1])
  }else if(v.length == 0){
    this.value(0)
  }
}

function limitIntensidade() {
  if(this.value()<0){
    this.value(0);
  }
}

function limitAngulo() {
  var v = this.value()
  if(v < 0){
    v=0
  }
  while(v > 360){
    v -= 360
  }
  this.value(v)
}

function limitPosicao() {
  var v = this.value()
  if (v > bar){
    this.value(bar)
  }else{
    if(v < 0){
      this.value(0)
    }else if(v[0] == 0 && v.length > 1){
      this.value(v[1])
    }
  }
}

function setNumberofForces() {
  var v = this.value()
  if(v < 0){
    this.value(0)
  }else if(v[0] == 0 && v.length > 1){
    this.value(v[1])
  }else if(v.length == 0){
    this.value(0)
  }
  let int = parseInt(this.value())
  while(ar.length > int){
    let temp = ar.pop()
    Object.values(temp).forEach(
      t => Object.values(t).forEach(
        a => a.remove()
      )
    )
  }

  for(var i = ar.length; i < int; i++){
    ar.push({
      id: {p:createDiv(i+1 +'º')},
      intensidade: {p:createP('Intensidade'), v:createInput('','number')},
      angulo: {p:createP('Angulo'), v:createInput('','number')},
      posicao: {p:createP('Posicao'), v:createInput('','number')},
      sentido: {p:createP('Sentido'), v:createCheckbox('Superior', true)}
    })
    ar[i].intensidade.v.input(limitIntensidade)
    ar[i].angulo.v.input(limitAngulo)
    ar[i].posicao.v.input(limitPosicao)
    ar[i].id.p.id(i)
    ar[i].id.p.class('elementos');
    var keys = Object.values(ar[i])
    keys.splice(0,1)
    console.log(keys)
    keys.forEach((k)=>{
      k.p.parent(ar[i].id.p)
      k.v.parent(ar[i].id.p)
    })

    createP()
  }
}


function scaleSize(pos, w){
  return w * pos/bar + 30
}

function scaleIntensity(arr, value){
  var intens = []
  arr.forEach(object => {
    intens.push(object.intensidade.v.value())
  })

  var max = Math.max(...intens)

  return 15 + 55*value/max

}

function draw() {
  viga = new Viga(bar, massa.value())
  viga.forces.push(new Force(viga.weight, viga.length/2, 90, true))
  ar.forEach(object => {
    viga.forces.push(new Force(object.intensidade.v.value(), object.posicao.v.value(), object.angulo.v.value(), object.sentido.v.checked()))
  })
  console.log('Ax: ' + viga.getAx() + ' Ay: ' + viga.getAy() + ' Fb: ' + viga.getFb())
  background('#fffff');
  fill('#5d75cd');
  x = 10;
  w = 350;
  h = 30;
  rect(30, 100, w, h);
  triangle(10+x, 150, 20+x, 130, 30+x, 150);
  circle(w+x+15, 141, 20);
  ar.forEach(object => {
    drawArrow(scaleSize(object.posicao.v.value(),w), object.sentido.v.checked() ? 100 : 100 + h, object.sentido.v.checked() ? toRadians(object.angulo.v.value()) : toRadians(object.angulo.v.value()-180), scaleIntensity(ar, object.intensidade.v.value()))
  })

  if(viga.weight > 0){
    console.log('eita')
    var x1 = scaleSize(bar/2, w)
    var y1 = 100 + h/2
    var y2 = 130 + h
    strokeWeight(3)
    line(scaleSize(bar/2, w), 100 +h/2, scaleSize(bar/2, w), 130+h)
    strokeWeight(1)
    triangle(x1-5, y2-10, x1, y2+3, x1+5, y2-10)
  }

  textSize(32)
  fill('#000000')
  let ax = viga.getAx().toFixed(2)
  if(ax == -0.00){
    ax = 0.0.toFixed(2)
  }
  text('Ax: ' + ax,480,100)
  text('Ay: ' + viga.getAy().toFixed(2),480,150)
  text('Fb: ' + viga.getFb().toFixed(2),480,200)
  
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
