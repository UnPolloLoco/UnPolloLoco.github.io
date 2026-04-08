function clickHandler(e){
    const mouseX = e.offsetX, mouseY = e.offsetY;
    for(const j of junk) {
        junk_min_x = j.x - 12*j.size;
        junk_max_x = j.x + 12*j.size;
        junk_min_y = j.y - 12*j.size;
        junk_max_y = j.y + 12*j.size;

        //TODO: write some code here that checks whether
        //(mouseX, mouseY) is inside j

        if (junk_min_x < mouseX && mouseX < junk_max_x
            && junk_min_y < mouseY && mouseY < junk_max_y) {

            j.alive = false;
        }
    }
  }
  
  canvas.addEventListener('click', clickHandler);
  
function checkCollisions(){
    //todo - loop through all junk/ship pairs
    //check to see whether they're colliding.
    //If so, set both of their alive to false
    for(const j of junk) {
        for(const s of ships){
            if(j.alive && s.alive){
                junk_min_x = j.x - 5*j.size;
                junk_max_x = j.x + 7*j.size;
                junk_min_y = j.y - 5*j.size;
                junk_max_y = j.y + 7*j.size;

                ship_min_x = s.x - 9*s.size;
                ship_max_x = s.x + 9*s.size;
                ship_min_y = s.y - 9*s.size;
                ship_max_y = s.y + 9*s.size;

                // ctx.fillStyle = 'white';
                // ctx.fillRect(junk_min_x, junk_min_y, 2, 2);
                // ctx.fillRect(junk_max_x, junk_max_y, 2, 2);
                // ctx.fillRect(ship_min_x, ship_min_y, 2, 2);
                // ctx.fillRect(ship_max_x, ship_max_y, 2, 2);

                if (ship_max_x > junk_min_x && ship_min_x < junk_max_x
                    && ship_max_y > junk_min_y && ship_min_y < junk_max_y) {

                    j.alive = false;
                    s.alive = false;
                }

            }
        }
    }
}