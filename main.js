var XOFF = width/2;
var YOFF = height/2;
angleMode = "degrees";

var distance = function(a, b) {
	return dist(a.x, a.y, b.x, b.y);
};

draw = function() {
	background(255);
	pushMatrix();
		translate(XOFF, YOFF);
	popMatrix();
}
