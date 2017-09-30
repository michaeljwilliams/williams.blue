// core.js - JS that can run after content is loaded
////////////////////////////////////////////////////////////////////////////////

function onpageLinks() {
var links = document.querySelectorAll(".u-onpageLink");     // Get array of onpage links
links.forEach(function(link) {                              // Add event listener to each link
    link.addEventListener("click", linkWasClicked);         // Run linkWasClicked when clicked
});

    function linkWasClicked() {
        // Get the destination element via the data of the clicked element.
        var element = document.querySelector(this.getAttribute("data-onpageLink"));
        element.scrollIntoView();                                       // Scroll element into view
        element.classList.add("u-_lookAtMe");                           // Make element noticeable
        window.setTimeout(function() {                                  // Remove noticeable class after 4s
            element.classList.remove("u-_lookAtMe");
        }, 1500);
    }
}

////////////////////////////////////////////////////////////////////////////////
// code that runs

// Runs after page is loaded
function runAfterMainLoadsCore() {
    onpageLinks();
}