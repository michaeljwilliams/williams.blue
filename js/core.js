// core.js - JS that can run after content is loaded
////////////////////////////////////////////////////////////////////////////////

function onpageLinks() {
var links = document.querySelectorAll(".u-onpageLink");     // Get array of onpage links
links.forEach(function(link) {                              // Add event listener to each link
    link.addEventListener("click", linkWasClicked);         // Run linkWasClicked when clicked
});

    function linkWasClicked() {
        var previousElement = this; // The link that was clicked
        // Get the destination element via the data of the clicked element.
        var element = document.querySelector(this.getAttribute("data-onpageLink"));
        element.scrollIntoView();                           // Scroll element into view
        element.classList.add("u-_lookAtMe");               // Make element noticeable
        element.classList.add("u-positionRelative");
        window.setTimeout(function() {                      // Remove noticeable class after 1.5s
            element.classList.remove("u-_lookAtMe");
        }, 1500);
        /* 
        // Creates a button that will take the user back to the previous element they were looking at.
        // The button is displayed adjacent to the new element.
        var backButton = document.createElement("button");  // Create back button
        backButton.classList = "u-simpleButton u-onpageLinkBackButton";
        backButton.innerHTML = "Go back";
        element.appendChild(backButton);
        backButton.addEventListener("click", function() {
            previousElement.scrollIntoView();               // Scroll back to previous element when clicked
            backButton.parentElement.removeChild(backButton);
        });
        */
    }
}

function hideLoadingNotification(){
    loadingNotification.classList += " u-_isAbsent";
};

////////////////////////////////////////////////////////////////////////////////
// code that runs

// Runs after page is loaded
function runAfterMainLoadsCore() {
    hideLoadingNotification();
    onpageLinks();
}