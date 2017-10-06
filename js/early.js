// early.js - JS that should run before content loads
////////////////////////////////////////////////////////////////////////////////
// Global variables
// var loadingNotification = document.createElement("h1");

////////////////////////////////////////////////////////////////////////////////

// Makes an XMLHttpRequest for a file, then runs a callback.
// example
// asyncGet('timeframe.json', true, useAsyncData, errorCallback);
// parameters: url of resource to request, json bool, function to call with asyncData
// isJson bool should be true if resource is json, else false and you'll get text
// callback function gets passed a json object if isJson===true, else text
// error callback gets passed the url that failed to load

// callback example
// function useAsyncData(data) {
//     console.log(data);
// }

// error callback example
// function requestFailure(url) {
//     alert('Failed to load ' + url);
// }

function asyncGet(url, isJson, cb, errcb) {
    var asyncData,      // var to contain async data
        asyncRequest,   // asyncRequest object accessible in entire function
        attempts = 0;   // init number of request attempts; will call errcb after several unsuccessful attempts

    // make async request
    makeRequest(url);

    function makeRequest(url) {
        asyncRequest = new XMLHttpRequest();
        // run prepdata when response received from server
        asyncRequest.onreadystatechange = prepData;
        // send request
        asyncRequest.open('GET', url, true);
        asyncRequest.send();
    }

    function prepData() {
        // readyState 4 means asyncRequest successful and response received from server
        // http status 200 means server OK'd response (200: "OK")
        // note that status should be 0 when retrieving from filesystem (without HTTP server)
        if (asyncRequest.readyState === 4 && asyncRequest.status === 200) {
            if (isJson === true) { // if json
                asyncData = JSON.parse(asyncRequest.responseText); // parse json
            } else if (isJson === false) { // if text
                asyncData = asyncRequest.responseText;
            } else console.log('Error in function [asyncGet]: argument [isJson] was not a bool');
            // call a function that uses the data
            cb(asyncData);
        } else {
            attempts++;
            console.log('asyncGet(' + url + '): No response received yet (attempt ' + attempts + '), retrying...');
            // after 4 failed requests
            if (attempts >= 4) {
                console.log('asyncGet(' + url + '): failed to load resource after ' + attempts + ' attempts. Will now call errcb if given.');
                // call error cb with url
                if (errcb && typeof(errcb) === "function") errcb(url);
            } else return;
        }
    }
}

// Inserts the specified [content] into the specified element/location [where]
// [where] should be a unique CSS selector
// [addOrReplace] determines whether to simply add the content or replace the destination content.
// [addOrReplace] should be a string of "add" or "replace". It defaults to add
// example: insertContent("main", "<h1>hello!</h1>"); // inserts an <h1> into the <main> element
function insertContent(where, content, addOrReplace) { // Safari 9 doesn't support default parameters
    if(addOrReplace === "replace") {
        document.querySelector(where).innerHTML = content;
    } else if(addOrReplace !== "replace" ) {
        document.querySelector(where).innerHTML += content;
    }
}

// Asynchronously retrieves content, loads into the given location, and calls cb when done.
function loadContentIntoElement(url, where, cb) {
    asyncGet(url, false, asyncGetCb);

    function asyncGetCb(content) {
        insertContent(where, content);
        if(cb) cb(url, where);
    }
}

// Loads the page
function loadPage() {

    
    // Displays loading notification. Not really needed while page downloads are so small.
        // ALSO bugs when user goes back in Firefox on Android. Notification is permanently displayed.
        // Could not reproduce bug in desktop browser or Chrome on Android.
    function displayLoadingNotification() {
        loadingNotification.classList = "u-loadingNotification";
        loadingNotification.innerHTML = "Loading...";
        document.body.appendChild(loadingNotification);
    };

    // Load template content in order of importance. Leading content first, then the rest.
    loadContentIntoElement("/template/header.html", "header");
    loadContentIntoElement("/template/footer.html", "footer");

    // If a hash with a slash (#/) is present in the url, attempt to load the content at the url in the hash.
    (function pickMainContent(content) {
        var hash = window.location.hash.substring(1);
        if(hash.length !== 0 && hash.substring(0,1) === "/") {
            loadContentIntoElement(hash, "main", runAfterMainLoads);
        } else {
            pageSpecificActions();
        }
    })();
}

////////////////////////////////////////////////////////////////////////////////
// code that runs

loadPage();