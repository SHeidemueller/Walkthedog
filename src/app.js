var UI = require('ui');
var Vector2 = require('vector2');
var dog_ajax = require('./dog_ajax');
var dogs;
var main;

// Create the Windows - splash, main and  Dog Stats
var info = new UI.Window({
    fullscreen: true
});

var splashCard = new UI.Card({
    title: "Please Wait",
    body: "Playing fetch at the moment"
});


// Show loading screen
splashCard.show();

//get list of dogs
dog_ajax.getDog(function(error, result) {

    if (error === null)
        console.log("Errors found during callback: NONE");
    else
        console.log(error);

    console.log("Result has been successfully transferred to app.js\n" + result[0].dogId + "\n" + result[0].title + "\n" + result[0].whistle);
    //reasign into global variable
    dogs = result;
    console.log("Result has been successfully transferred to new array" + dogs[0].dogId + "\n" + dogs[0].title + "\n" + dogs[0].whistle);

    main = new UI.Menu({
        sections: [{
            title: 'Select Dog',
            items: dogs,
        }]
    });
    main.show();



//display list of dog in selection menu


// Add a click listener for select button click
main.on('select', function(event) {

  //get dog stats
    dog_ajax.getInfo(dogs[event.itemIndex].dogId, function(error, result) {

        if (error === null)
            console.log("Errors found during callback: NONE");
        else
            console.log(error);

        console.log("Result has been successfully transferred to app.js\n" + result.activity + "\n" + result.goal + "\n" + result.lastSync);



        //write active minutes, goal and Sync into textboxes
        var minutes = new UI.Text({
            position: new Vector2(0, 32),
            size: new Vector2(144, 28),
            text: result.activity + " min",
            font: 'Gothic-28-Bold',
            color: 'white',
            textAlign: 'center'
        });
        info.add(minutes);

        var goal = new UI.Text({
            position: new Vector2(0, 78),
            size: new Vector2(144, 28),
            text: result.goal + " min",
            font: 'Gothic-28-Bold',
            color: 'white',
            textAlign: 'center'
        });
        info.add(goal);

        var sync = new UI.Text({
            position: new Vector2(0, 16),
            size: new Vector2(144, 16),
            text: "Last Synch at " + result.lastSync.substring(11, 16),
            font: 'Gothic-14',
            color: 'white',
            textAlign: 'center'
        });
        info.add(sync);

    });

//get battery status 
    dog_ajax.getBattery(dogs[event.itemIndex].whistle, function(error, result) {

        if (error === null)
            console.log("Errors found during callback: NONE");
        else
            console.log(error);

        console.log("Result has been successfully transferred to app.js\n" + result);

        //add battery to the info window
        var battery = new UI.Text({
            position: new Vector2(0, 120),
            size: new Vector2(144, 28),
            text: result.toPrecision(2) + " %",
            font: 'Gothic-28-Bold',
            color: 'white',
            textAlign: 'center'
        });
        info.add(battery);
    });



    //fill info screen with discription of values

    //Fill in Dog Name in First Box
    var name = new UI.Text({
        position: new Vector2(0, 0),
        size: new Vector2(144, 16),
        text: dogs[event.itemIndex].title + " Overview",
        font: 'Gothic-14-Bold',
        color: 'white',
        textAlign: 'center'
    });

    //line for first box

    var line1 = new UI.Rect({
        position: new Vector2(0, 34),
        size: new Vector2(144, 2),
        backgroundColor: 'white',
    });

    //fill in description on UI for activity
    var minutesText = new UI.Text({
        position: new Vector2(0, 61),
        size: new Vector2(144, 14),
        text: "Active Minutes Today",
        font: 'Gothic-14',
        color: 'white',
        textAlign: 'center'
    });

    //line for second box

    var line2 = new UI.Rect({
        position: new Vector2(0, 80),
        size: new Vector2(144, 2),
        backgroundColor: 'white',
    });

    //write activity goal description in third box

    var goalText = new UI.Text({
        position: new Vector2(0, 106),
        size: new Vector2(144, 14),
        text: "Activity Goal",
        font: 'Gothic-14',
        color: 'white',
        textAlign: 'center'
    });

    //line for thrid box
    var line3 = new UI.Rect({
        position: new Vector2(0, 124),
        size: new Vector2(144, 2),
        backgroundColor: 'white',
    });

    //write battery description in fourth box

    var batteryText = new UI.Text({
        position: new Vector2(0, 150),
        size: new Vector2(144, 14),
        text: "Whistle Battery Left",
        font: 'Gothic-14',
        color: 'white',
        textAlign: 'center'
    });


    info.add(name);
    info.add(minutesText);
    info.add(goalText);
    info.add(batteryText);
    info.add(line1);
    info.add(line2);
    info.add(line3);
    info.show();




});
});