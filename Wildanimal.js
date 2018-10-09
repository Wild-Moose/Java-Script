var bodyX = 203;
var bodyY = 161;
var bodyW = 142;
var bodyH = bodyW/2;
var noseX = 202;
var noseY = noseX/2;
var noseW = noseY/6;
var noseH = noseW-1;
var nosegrow = 1.2;

draw = function() {
    
    background(207, 254, 255);
    fill(255, 255, 255);
    ellipse(bodyX, bodyY, bodyW, 106); // body?
    ellipse(bodyX, bodyY-70, bodyH, 47); // face?
// draw the arc without fill
arc(219, 87, 19, 19, 183, 362);

ellipse(186,84,19,19);
fill(250, 0, 0);
//nose
ellipse(noseX,noseY,noseW,noseH);


ellipse(noseX,113,105,3);
fill(0, 0, 0);
ellipse(185,83,5,5);
rect(177,23,47,44);
rect(164,65,77,6);
fill(199, 76, 82);                                      
rect(mouseX, mouseY, 20, 20);

noseH = noseH *nosegrow;
noseW = noseW *nosegrow;

if(noseH>241){
    nosegrow=1;
}

};
