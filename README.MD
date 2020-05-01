# NodeJs Promises Walthrough
A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers to an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of the final value, the asynchronous method returns a promise for the value at some point in the future

In simple words “A promise is a word taken for some action, the other party who gave the promise might fulfill it or deny it”. In the case of fulfilling, the promise gets resolved, and in another case, it gets rejected.    

![Promise creation and usage](/resources/promise.png)

As the picture depicts, these are the steps for creating and using promises

A promise can be created in our JavaScript code. Or else it can be returned from an external node package
Any promise that performs async operations should call any one of the two methods resolve or reject. 
The code logic should take care of when and where to call these functions. If the operation is successful, pass that data to the code that uses that promise, otherwise pass error
The code which uses a promise should call then function on that promise. It takes two anonymous functions as parameters. The first function executes if the promise is resolved and the second function executes if promise is rejected.

What happens if you try to access the value from promise before it is resolved or rejected. Then promise will be in the pending state.

# Creating a Promise
In NodeJs, a Promise is created using the new constructor. the syntax is as below.
    
    var myPromise = new Promise(function(resolve, reject){
    ....
    })

myPromise is a Promise type object which allows us to use it for later.

In my Case, I consumed Github API which is a REST API by provided by Github to fetch the details about Users, Repositories etc.
I used the users API with the link below:

    https://api.github.com/users/mayakaconard

If you make an HTTP GET request for this URL, you will be returned a JSON with all stats about myself like repos, followers, following, stars etc.

For making an HTTP request from our Node app, let us install a small package which make things clear.

    sudo npm install request -g

request package removes the boilerplate code of inbuilt http package.

    ```node
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
    ```