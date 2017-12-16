"use strict";

var newColor = setInterval(colorGenerator, 2000);

function colorGenerator(){
    let color;
    color = '#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(color);
}