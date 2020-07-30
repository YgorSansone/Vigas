function setup() {
  function sum(total, num) {
    return total + num;
  }

  class Force {
    constructor(intensity, distance, angle) {
      this.intensity = intensity;
      this.distance = distance;
      this.angle = radians(angle);
      if (angle == 90 || angle == 270) {
        this.x = 0;
      } else {
        this.x = Math.cos(this.angle);
      }
      if (angle == 0 || angle == 180) {
        this.y = 0;
      } else {
        this.y = Math.sin(this.angle);
      }
    }
  }

  class Viga {
    constructor(massa, comprimento) {
      this.peso = massa * 9.8;
      this.comprimento = comprimento;
    }
  }
  n = 5;
  forces = [];
  fx = [];
  fy = [];
  by = [];
  for (i = 0; i < n; i++) {
    intensity = 100;
    distance = 3;
    angle = 90;
    var v = new Force(intensity, distance, angle);
    forces[i] = v;
    fy[i] = v.y * v.intensity;
    fx[i] = v.x * v.intensity;
    by[i] = (v.y * v.intensity) * v.distance;
  }
  
  massa = 0;
  comprimento = 5;
  const viga = new Viga(massa, comprimento);
  
  for (i = 0; i < fx.length; i++) {
    if (fx[i] != 0) {
      fx[i] *= -1;
    } else {
      fx[i] *= -1;
    }
  }
  
  fb = ((by.reduce(sum)) + (viga.peso * (viga.comprimento / 2))) / viga.comprimento;
  ay = fy.reduce(sum) - fb;
  ax = -fx.reduce(sum);
  
  console.log("A forca Fb é ("+fb+")N");
  console.log("A forca Ay é ("+ay+")N");
  console.log("A forca Ax é ("+ax+")N");

}