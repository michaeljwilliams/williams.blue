// core.js - JS that can run after content is loaded
////////////////////////////////////////////////////////////////////////////////

function onpageLinks(highlight) {
var links = document.querySelectorAll(".u-onpageLink");     // Get array of onpage links
links.forEach(function(link) {                              // Add event listener to each link
    link.addEventListener("click", linkWasClicked);         // Run linkWasClicked when clicked
});

    function linkWasClicked() {
        var previousElement = this; // The link that was clicked
        var element = document.querySelector(this.getAttribute("data-onpageLink")); // Destination element
        // Get the destination element via the data of the clicked element.

        element.classList.add("u-positionRelative");        // So we can position the button next to it
        scrollIntoViewAndHighlight(element);
        
        // Creates a button that will take the user back to the previous element they were looking at.
        // The button is displayed adjacent to the new element.
        var backButton = document.createElement("button");  // Create back button
        backButton.classList = "u-simpleButton u-onpageLinkBackButton";
        backButton.innerHTML = "Go back";
        element.appendChild(backButton);

        var distanceToTop = window.scrollY;
        window.addEventListener("scroll", runOnScroll);

        backButton.addEventListener("click", function() {
            scrollIntoViewAndHighlight(previousElement);    // Scroll back to previous element when clicked
            removeBackButton();                             // Remove the back button and other stuff we used
        });

        function scrollIntoViewAndHighlight(element) {
            element.scrollIntoView();                       // Scroll element into view
            element.classList.add("u-_lookAtMe");           // Make element noticeable

            window.setTimeout(function() {                  // Remove noticeable class after 1.5s
                element.classList.remove("u-_lookAtMe");
            }, 1500);
        }

        function runOnScroll() {
            var d = window.scrollY - distanceToTop;         // Get distance scrolled (delta distanceToTop)
            d = Math.abs(d);                                // Make sure it's positive
            var threshold = 300;                            // Threshold to remove the back button (in px)

            // Back button disappears as user scrolls away. It's completely gone when threshold is reached.
            backButton.style.opacity = (threshold - d) / threshold;

            // If user scrolls past the threshold, remove the back button etc
            if( d > threshold) {
                removeBackButton();
            }
        }

        function removeBackButton() {
            backButton.parentElement.removeChild(backButton);   // Remove back button
            element.classList.remove("u-positionRelative");     // and other stuff we used.
            window.removeEventListener("scroll", runOnScroll);
        }
    }
}

function hideLoadingNotification(){
    loadingNotification.classList += " u-_isAbsent";
};

////////////////////////////////////////////////////////////////////////////////
// code that runs

// Runs after page is loaded
function runAfterMainLoadsCore() {
    // hideLoadingNotification();
    onpageLinks();
}