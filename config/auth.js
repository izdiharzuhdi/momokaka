// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '374373629574497', // your App ID
        'clientSecret'  : '9006880dae7f34330e81c37078ccc226', // your App Secret
        'callbackURL': 'https://momokaka.herokuapp.com/auth/facebook/callback'
        // 'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'https://momokaka.herokuapp.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'https://momokaka.herokuapp.com/auth/google/callback'
    }

};
