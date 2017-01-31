var rotated = 1;
angleMode = "degrees";

var drawCoord = function() {
    fill(0);
    line(-width, 0, width, 0);
    line(0, -height, 0, height);
    
    textAlign(CENTER);
    text("0", 190, 0);
    text("90", 0, 190);
    text("180", -190, 0);
    text("-90", 0, -190);
};

draw = function() {
    background(255);
    if (!rotated) {
        pushMatrix();
            translate(width/2, height/2);
            drawCoord();
        popMatrix();
    } else {
        pushMatrix();
            translate(width/2, height/2);
            rotate(-90);
            drawCoord();
        popMatrix();
    }    
};
