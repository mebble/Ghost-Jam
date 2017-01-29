var distance = function(obj1, obj2) {
    return dist(obj1.x, obj1.y, obj2.x, obj2.y);
};
var isWithin = function(obj1, obj2) {
    return distance(obj1, obj2) < obj2.radius ? true : false;
};
var printRel = function(obj1, obj2) {
    println("obj1 = (" + obj1.x + ", " + obj1.y + ")");
    println("obj2 = (" + obj2.x + ", " + obj2.y + ")");
    println("obj1 is within obj2: " + isWithin(obj1, obj2));
};

var SensePt = function(x, y) {
    this.x = x;
    this.y = y;
};
SensePt.prototype.draw = function() {
    strokeWeight(3);
    point(this.x, this.y);
};

var Region = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
};
Region.prototype.draw = function() {
    noFill();
    stroke(0);
    ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
};

var area = new Region(200, 200, 100);
var pt = new SensePt(random(0, width), random(0, height));

area.draw();
pt.draw();

printRel(pt, area);
