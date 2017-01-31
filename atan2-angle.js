/**
 * ang1 is the angle between the line joining the mouse to the origin and the +x axis.
 * ange2 is the angle between the line joining the mouse to the origin and the +x axis on
 * new matrix, that has been translated to the middle of the canvas.
 */

angleMode = "degrees";

draw = function() {
    background(255);
    
    var mx1 = mouseX, my1 = mouseY;
    var ang1 = atan2(my1, mx1);
    
    //draw point, line, text
    strokeWeight(5);
    point(mx1, my1);
    strokeWeight(1);
    line(0, 0, mx1, my1);
    fill(87, 87, 87);
    textAlign(CENTER);
    text("ang1 = " + ang1.toFixed(3), 200, 360);
    
    pushMatrix();
        translate(width/2, height/2);
        
        var mx2 = mouseX-width/2, my2 = mouseY-height/2;
        var ang2 = atan2(my2, mx2);
        
        //draw point, line text
        strokeWeight(5);
        point(mx2, my2);
        strokeWeight(1);
        line(0, 0, mx2, my2);
        fill(87, 87, 87);
        text("ang2 = " + ang2.toFixed(3), 0, 180);
    popMatrix();
};
