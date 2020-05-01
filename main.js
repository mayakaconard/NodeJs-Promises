var request = require("request");

var userDetails;

function initialize ()
{
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/mayakaconard',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function (resolve, reject)
    {
        // Do async job  ========makes a GET request to the Github API
        request.get(options, function (err, resp, body)
        {
            if (err)
            {
                reject(err);
            } else
            {
                //implements then on the promise
                resolve(JSON.parse(body));
            }
        })
    })
}


//  main function where we get the Promise for above function and attach a function callback in the then function.
function main ()
{
    var initializePromise = initialize();
    initializePromise.then(function (result)
    {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here

       // console.log(userDetails)
        return userDetails;
    }, function (err)
    {
        console.log(err);
    }).then(function (result)
    {
        // Print the code activity. Prints 47
        console.log(result.public_gists + result.public_repos);
    })
}

main();