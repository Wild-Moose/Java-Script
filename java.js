/**
 * This project generates random view of the stars and moon,
 * while avoiding over-lapping objects, and trying to keep it
 * coherent as possible.
 * 
 * Try changing the 'modifiable variables' to test this.
 * 
 * There's an infinite number of shooting stars that walk along 
 * an -of course- "random" path, ranging from a straight line
 * to a quadratic-bezier-curve-path; aka, shooting out of a
 * cannon -like.
 * 
 * Increase the "sn" variable to increase the frequency of
 * shooting stars
 * 
 * If Oh Noes says 'A for-loop is taking too long' minimize one
 * or more of the variables: "cn", "mnRd" and "strMxSz" in that
 * order.
 * 
 * More updates to the land will be done soon...
 * 
 * Any ideas for optimizing would be appreciated!
 */
 
/* Modifiable Variables */
/* Set 'fullMoon' to true for full moon, and false for random phase */
var fullMoon = false;
var mnRd = min(width,height)/8;          // Moon Radius
    mnRd = 92;
var cn = floor(min(width,height)/6);     // # Of Constant Stars
    cn = 100;
var sn = 3;    /* # Of Shooting Stars each 10 seconds */
var strMxSz = ceil(min(width,height)/40);// Stars Maximum Size
    strMxSz = 15;
var starStep = 0.03;                     // Shooting star speed
var bgClr = color(29, 40, 115);          // Background Color
var mnClr = color(230, 230, 230);        // Moon Color
var strClr = color(255, 242, 0);         // Star Color
var grsClr = color(13, 46, 13);          // Grass Color
var mntnClr = color(48, 9, 9);           // Mountains' Color

/* Un-modifiable Variables */
var start = millis();
var xMn = random(1.5*mnRd,width-1.5*mnRd);   // Moon's x
var yMn = random(1.5*mnRd,2*height/3 - 0.5*mnRd);// Moon's y
var phsRd = mnRd+1;                          // Phase Radius
var mnRot = random(-180);                    // Moon's Rotation
var tangLength = 4*(phsRd)/3;
  // Moon Shadow Color (darker moon color with alpha = 35)
var mnShdClr = lerpColor(mnClr,0,0.7) & 0x23FFFFFF;
/* Set the moon phase to be random between %(0-100), 
where (-tanglength) is %0 and (tanglength) is %100 */
if(fullMoon) {
    var mnPhs = tangLength;
} else {
    var mnPhs = random(-tangLength,tangLength);
}

/* Generate Stars Random Non-Overlapping Parameters. */
var xCntr = [], yCntr = [], i;
var strSz = [], strTght = [], strRot = [], j;

genCntr: /* Generate Parameters & Check Distance With Moon. */
for (i = 0; i < cn;) {
    /* Size, Tightness & Rotation */
    strSz[i] = round(random(4,strMxSz));
    strTght[i] = random(-0.5,1.5);
    strRot[i] = random(72);
    
    xCntr[i] = round(random(strSz[i], width - strSz[i]));
    yCntr[i] = round(random(strSz[i], height/1.5));
    if (dist(xCntr[i],yCntr[i],xMn,yMn) < phsRd + strSz[i])
        { continue genCntr; }
    
    //chckDst: /* Checks Distance Between Stars' Centres. */
    for (j = 0; j < i; j++) {
        if (dist(xCntr[i], yCntr[i], xCntr[j], yCntr[j]) <
        (strSz[i] + strSz[j])) { continue genCntr; }
    }
    i++;
}

var moon = function() {

    /* Moon Shadow Size */
    var shdSz = 7*mnRd*(mnPhs+tangLength)/(24*tangLength);
    
    noStroke();
    fill(mnClr);
    ellipseMode(RADIUS);
    pushMatrix();
    translate(xMn,yMn);
    rotate(mnRot);
    ellipse(0,0,mnRd,mnRd);   //The Moon
    
    //Moon Holes
    var h = hue(mnClr), s = saturation(mnClr),
        b = brightness(mnClr);
    colorMode(HSB);
    fill(h,s,b*43/46);   //Same Moon Color With Less Brightness
    colorMode(RGB);
    ellipse(mnRd/4,-3*mnRd/5,mnRd/6,mnRd/6);
    ellipse(mnRd/3,mnRd/2,mnRd/4,mnRd/4);
    ellipse(-mnRd/2,-mnRd/3,mnRd/6,mnRd/6);
    ellipse(7*mnRd/12,-mnRd/12,mnRd/3,mnRd/3);
    ellipse(-mnRd/6,mnRd/12,mnRd/4,mnRd/4);
    ellipse(0,-11*mnRd/30,2*mnRd/15,2*mnRd/15);
    ellipse(-0.7*mnRd,mnRd/12,mnRd/5,mnRd/5);
    ellipse(-mnRd/6,-2*mnRd/3,mnRd/5,mnRd/5);
    ellipse(-13*mnRd/30,8*mnRd/15,mnRd/4,mnRd/4);
    ellipse(-mnRd/30,2*mnRd/3,2*mnRd/15,2*mnRd/15);
    
    //Moon Phase separator
    fill(bgClr);
    beginShape();
    vertex(0,-phsRd);
    bezierVertex(tangLength,-phsRd,tangLength,phsRd,0,phsRd);
    bezierVertex(mnPhs,phsRd,mnPhs,-phsRd,0,-phsRd);
    endShape();
    
    //Moon Shadow
    fill(mnShdClr);
    beginShape();
    vertex(0,phsRd);
    bezierVertex(mnPhs,phsRd,mnPhs,-phsRd,0,-phsRd);
    bezierVertex(mnPhs-shdSz,-phsRd,mnPhs-shdSz,phsRd,0,phsRd);
    endShape();
    popMatrix();
}; 

var stars = function(i,color) {
    noStroke();
    fill(color);
    curveTightness(strTght[i]);
    pushMatrix();
    translate(xCntr[i],yCntr[i]);
    rotate(strRot[i]);
    beginShape();
    curveVertex(0,-strSz[i]);
    curveVertex(-strSz[i]*sin(36),strSz[i]*cos(36));
    curveVertex(strSz[i]*sin(72),-strSz[i]*cos(72));
    curveVertex(-strSz[i]*sin(72),-strSz[i]*cos(72));
    curveVertex(strSz[i]*sin(36),strSz[i]*cos(36));
    curveVertex(0,-strSz[i]);
    curveVertex(-strSz[i]*sin(36),strSz[i]*cos(36));
    curveVertex(strSz[i]*sin(72),-strSz[i]*cos(72));
    endShape();
    popMatrix();
};

var mainLand = function() {
    pushMatrix();
    scale(width/600,height/600);
    noStroke();
    fill(grsClr);
    rect(0,400,600,200);          // Grass
    
    /* Mountains' Base */
    fill(mntnClr);
    beginShape();
    vertex(0, 450);
    bezierVertex(125, 475, 200, 470, 250, 455);
    bezierVertex(300, 400, -50, 400, 0, 450);
    endShape();
    beginShape();
    vertex(250, 455);
    bezierVertex(350, 425, 450, 435, 600, 450);
    bezierVertex(700, 400, 150, 400, 250, 455);
    endShape();

    rect(500,400,100,32);
    
    /* Mountains (ordered from left to right) */
    bezier(-25,445,5,320,40,315,100,460);
    bezier(15,445,65,265,90,315,180,463);
    bezier(125,455,65,275,300,400,600,410);
    bezier(135,465,205,250,225,350,275,440);
    bezier(180,455,215,240,250,375,305,440);
    bezier(175,400,450,350,320,330,600,410);
    bezier(450,420,570,350,575,370,600,400);
    
    fill(lerpColor(mntnClr,0,0.5));
    beginShape();
    vertex(255,366);
    bezierVertex(263,367,277,368,305,374);
    bezierVertex(285,378,272,380,266,382);
    endShape();
    
    /* Mountains' Shadows (ordered from left to right) */
    var mSh = [
    [-25,445,-8,374,15,333,43,361,23,371,0,420,0,450],
    [43,361,3,462,22,452,8,450,22,385,36,361,28,352],
    [13,451,44,339,68,300,108,353,77,385,67,451,71,460],
    [126,377,135,368,144,363,167,360,155,368,136,380,152,415],
    [177,360,168,375,157,400,152,415,144,404,158,380,159,361],
    [135,466,176,340,204,310,231,360,215,390,193,428,206,464],
    [217,341,220,339,225,337,232,341,238,355,283,428,295,443],
    [266,382,367,357,380,352,424,361,375,370,280,385,305,442],
    [514,385,406,440,435,435,414,435,461,405,490,390,493,379],
    [425,435,490,397,562,352,585,383,550,390,509,400,493,438],
    ];
    
    /* Draw The Shadows For Each Mountain */ 
    for (var j = 0; j < mSh.length; j++) {
        for (var k = 0; k <= 1; k += 0.1) {
            noStroke();
            fill(lerpColor(mntnClr, 0, k * 0.3));
            
            if (j === 1 || j === 4 || j === 8) {
                fill(lerpColor(mntnClr, 0, k * 0.4));
            }
            
            beginShape();
            vertex(mSh[j][0], mSh[j][1]);
            bezierVertex(mSh[j][2], mSh[j][3], mSh[j][4],
            mSh[j][5], mSh[j][6], mSh[j][7]);
            bezierVertex(lerp(mSh[j][8],mSh[j][4],k),                       lerp(mSh[j][9], mSh[j][5],k),lerp(mSh[j][10],                   mSh[j][2],k),lerp(mSh[j][11],mSh[j][3],k),                      lerp(mSh[j][12],mSh[j][0],k),lerp(mSh[j][13],                   mSh[j][1],k));
            endShape();
        }
    }
    popMatrix();
};

/* Generate constant image of the view */
background(bgClr);
/* Draw 'n' rectangles that have the background color but with more brightness increasing from top to bottom*/
for (var n = 100, j = 0; j <= n; j++) {
    colorMode(HSB);
    noStroke();
    var h = hue(bgClr), s = saturation(bgClr),
        b = brightness(bgClr);
    fill(h, s, lerp(b, 255, j / n));
    rect(0, height/2 + j*100/n, width, 100/n);
}

moon();
for (i = 0; i < cn; i++) { stars(i,strClr); }
var ttlImg = get(0, 0, width, height);

var B = [], T = [], Q = [];

draw = function() {
    image(ttlImg, 0, 0);

    if (millis() - start > 10000 * T.length / sn) {

        /* Shooting Stars Parameters */
        strSz[i] = round(random(4,strMxSz/1.5));
        strTght[i] = random(-0.5,1.5);
        strRot[i] = random(72);
        
        /* An array 'Q' of booleans to determine the bezier path         of the shooting star */
        Q = [round(random()), round(random()), round(random())];
        
        var k = T.length;
        
        /*An array 'B' of bezier parameters of each shooting            Star's path*/
        B[8*k] = Q[0] ? (Q[1] ? 0 : width) :
        (Q[2] ? random(width/2) : random(width/2, width));
        B[8*k+1] = Q[0] ? random(height/4) : 0;
        B[8*k+6] = (Q[0] & Q[1]) | (!Q[0] & Q[2]) ? width : 0;
        B[8*k+7] = random(height/3, height/1.5);
        
        var xP = (B[8*k]   + B[8*k+6]) / 2,
            yP = (B[8*k+1] + B[8*k+7]) / 2,
            m  = (B[8*k]   - B[8*k+6]) / (B[8*k+7] - B[8*k+1]),
            yD = (B[8*k+7] - B[8*k+1]) / 2,
            xD = abs((B[8*k] - xP) * m),
            D  = min(xD, yD);
        
        var yC = random(yP - Q[0] * D, yP + D),
            xC = (yC - yP) / m + xP;
        
        B[8*k+2] = lerp(B[8*k+0], xC, 2/3);
        B[8*k+3] = lerp(B[8*k+1], yC, 2/3);
        B[8*k+4] = lerp(B[8*k+6], xC, 2/3);
        B[8*k+5] = lerp(B[8*k+7], yC, 2/3);
        
        i++;
        /* 'T' is an array of the t parameters of each bezier            point */
        T.push(0);
    }
    
    /* Draw the bezier points of each star path */
    for (j = cn; j < i; j++) {
        xCntr[j] = bezierPoint(B[8*(j-cn)+0], B[8*(j-cn)+2],
        B[8*(j-cn)+4], B[8*(j-cn)+6], T[j-cn]);
        yCntr[j] = bezierPoint(B[8*(j-cn)+1], B[8*(j-cn)+3],
        B[8*(j-cn)+5],B[8*(j-cn)+7], T[j-cn]);
        
        /* Draw the stars if they're not behind moon or                 mountains, and color them with a shadow otherwise */
        if (dist(xCntr[j],yCntr[j],xMn,yMn) < mnRd + strSz[j]) {
            stars(j, mnShdClr);
        } else {
            stars(j, strClr);
        }
    }
    mainLand();
    
    /* Increment the t parameters of each bezier point */
    T = T.map(function(t) { return t + starStep; });
};

frameRate(30);
