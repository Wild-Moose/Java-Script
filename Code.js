let x = 0;
let y = 0;
let spacing = 10;
function setup() {
	createCanvas(1000, 800);
	background(100);

}


function draw() {
	fill(250,0,0)
	ellipse(mouseX, mouseY, 20, 20);
fill(random(2,203,0),random(1323));
	ellipse(mouseX, mouseY, 20, 20);
stroke(random(8),random(23));
	if (random(1) <0.4){
		fill(random(35),random(65),random(45),random(90),random(5),random(259));
		rect(x,y,spacing,spacing)
		line(x,y,x + spacing,y + spacing);
		ellipse(x,y,spacing,spacing)
	line(x,y + spacing,x+ spacing,y) 		
} else {
	line(x,y + spacing, x+ spacing,y)
}
	x = x + spacing;
	if(x > width){ 
	x = 0;
		y = y + spacing; }}
