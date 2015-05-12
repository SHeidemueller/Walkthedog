var UI = require('ui');

// Reference to card we will show and update later
var errorCard;

function handleError(message, err) {

    // Show error message to user
    if (!errorCard) {
        errorCard = new UI.Card({
            title: ' Walk the Dog?',
            icon: 'images/paw.png',
            fullscreen: true,
            scrollable: true
        });
    }
    errorCard.body('Error: ' + message);
    errorCard.show();

    // Log the problem
    console.log('ERROR: ' + message + '; err = ' + JSON.stringify(err));
}

// Export a public function
module.exports = {
    show: function(message, err) {
        handleError(message, err);
    }
};