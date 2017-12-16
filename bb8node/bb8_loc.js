"use strict";

var sphero = require("sphero");
var keypress = require("keypress");

var orb = sphero("2716d1f08a5842b7ac37502a273772df");   // New - BB-A7A9 - from noble/examples/advertisement-discovery.js

// var orb = sphero("e97ce8e482b447bba79de212cad8b746");   // Old - BB-2751 - from noble/examples/advertisement-discovery.js
                

orb.connect(listen);

function listen() {
    orb.color("magenta");
    keypress(process.stdin);
    process.stdin.on("keypress", handle);

    // console.log(`Starting to listen for arrow key presses
    //     e: start calibration (manual spin)
    //     q: stop calibration
    //     f: 10 colors in sequence
    //     up || a : move forward
    //     right: move right
    //     left: move left
    //     down: move backward
    //     space || c: stop`);

     console.log(`BB8 command control active`);       

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

function handle(ch, key) {
    var stop = orb.roll.bind(orb, 0, 0),
        roll = orb.roll.bind(orb, 60);

    if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
    }

    if (key.name === "e") {
        // Manually turn bb8 to point blue light towards you
        orb.startCalibration(); 

        // Another way to aim, this time programmatically
        /*
        var heading = 90;
        orb.roll(1, heading, 2, function () {
            setTimeout(function () {
                orb.setHeading(0, function () {
                    orb.roll(0, 0, 1);
                });
            }, 300);
        });
        */


    }

    if (key.name === "q") {
        orb.finishCalibration();
    }

    if (key.name === "g") {
        orb.color("green");
    }

    if (key.name === "b") {
        orb.color("blue");
    }

    if (key.name === "f") {  // fun-mode, random color generation
        let i = 0;
        while (i < 10) {
            orb.color('#' + Math.floor(Math.random() * 16777215).toString(16));
            i++;
        }
    }

    if (key.name === "p") {
        orb.ping(function (err, data) {
            console.log(err || "data: " + JSON.stringify(data));
        })
    }

    if (key.name === "up" || key.name === "a") {
        roll(0);
    }

    if (key.name === "down") {
        roll(180);
    }

    if (key.name === "left") {
        roll(270);
    }

    if (key.name === "right") {
        roll(90);
    }

    if (key.name === "space" || key.name === "c") {
        stop();
    }
}