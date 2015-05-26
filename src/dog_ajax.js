var ajax = require('ajax');
var errorView = require('./error_view');

//insert your own wistle Auth Token
var whiste_Auth_Token = 'YOUR AUTH TOKEN';


var dogs = [];

function getDog(callback) {
    ajax({
        url: 'https://app.whistle.com/api/dogs.json',
        method: 'get',
        type: 'json',
        headers: {
            'X-Whistle-AuthToken': whiste_Auth_Token
        }
    }, function(json) {

        // get dog ID and name
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var id = json[key].id;
                var name = json[key].name;
                var whistle = json[key].device_id;

                // Add json Info to menu items array
                // menus in pebble need the field "title", there for dog name will be called title  
                dogs.push({
                    dogId: id,
                    title: name,
                    whistle: whistle
                });


                // logs 
                if (dogs.dogId !== '' && dogs.title !== '' && dogs.whistle !== '')
                    console.log("Push successful" + "\n" + dogs[key].dogId + "\n" + dogs[key].title + "\n" + dogs[key].whistle);
                else
                    console.log("Push unsuccessful");
            }
        }


        callback(null, dogs);
    }, function(error) {

        var msg;
        if (error) {
            if (error.message) {
                msg = error.message;
            } else {
                msg = 'An unknown error occurred.';
            }
        } else {
            // This seems to happen when there is a timeout
            msg = 'Timeout occurred. Please try again.';
        }
        errorView.show(msg, error);
        callback("Error", null);
    });
    // end
}


function getInfo(dog, callback) {
    ajax({
            url: 'https://app.whistle.com/api/dogs/' + dog + '/dailies',
            method: 'get',
            type: 'json',
            headers: {
                'X-Whistle-AuthToken': whiste_Auth_Token
            }
        },

        function(json) {
            // get latest dog activity and goal
            var activity = json[0].minutes_active;
            var goal = json[0].activity_goal;
            var lastSync = json[0].updated_at;

                      
            if (activity !== '' && goal !== '' && lastSync !== '')
                console.log("Get successful" + "\n" + activity + "\n" + goal + "/" + lastSync);
            else
                console.log("Get unsuccessful");
          callback(null, {activity:activity,goal:goal,lastSync:lastSync});
        }, 
        function(error) {

        var msg;
        if (error) {
            if (error.message) {
                msg = error.message;
            } else {
                msg = 'An unknown error occurred.';
            }
        } else {
            // This seems to happen when there is a timeout
            msg = 'Timeout occurred. Please try again.';
        }
        errorView.show(msg, error);
        callback("Error", null);
    }
    );
}

function getBattery(id, callback) {
    ajax({
            url: 'https://app.whistle.com/api/devices/' + id + '.json',
            method: 'get',
            type: 'json',
            headers: {
                'X-Whistle-AuthToken': whiste_Auth_Token
            }
        },

        function(json) {
            // get battery status of dog's whistle
            var battery = json.battery_level;
                      
            if (battery !== '')
                console.log("Get successful" + "\n" + battery);
            else
                console.log("Get unsuccessful");
          callback(null, battery);
          return battery;
        }, 
        function(error) {

        var msg;
        if (error) {
            if (error.message) {
                msg = error.message;
            } else {
                msg = 'An unknown error occurred.';
            }
        } else {
            // This seems to happen when there is a timeout
            msg = 'Timeout occurred. Please try again.';
        }
        errorView.show(msg, error);
        callback("Error", null);
    }
    );
}

// Export a public function
module.exports = {
    getDog: getDog,
    getInfo: getInfo,
    getBattery: getBattery
};
