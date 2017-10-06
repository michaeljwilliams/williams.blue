// core.js - JS that can run after content is loaded
////////////////////////////////////////////////////////////////////////////////

var onpageLinkHandler = {

    link: {}
    ,element: {}
    ,backButton: {
        distanceToTop: 0
    }

    ,linkWasClicked: function(link) {
        // The link that was clicked. Make it accessible by other functions.
        this.link = link;

        // The destination element
        // Get the destination element via the data of the clicked element.
        var element = document.querySelector(link.getAttribute("data-link-onpage"));
        this.element = element; // Make it accessible by other functions.

        element.classList.add("u-position-relative");  // So we can position the button next to it

        this.scrollIntoViewAndHighlight(element);
        
        // Check if back button already exists. Remove if it does.
        var oldBackButton = document.querySelector(".u-backbutton-link-onpage");
        if(oldBackButton) this.removeBackButton(oldBackButton);

        // Creates a button that will take the user back to the previous element they were looking at.
        // The button is displayed adjacent to the new element.
        this.backButton = document.createElement("button");     // Create back button
        var backButton = this.backButton;                       // Less typing
        backButton.distanceToTop = window.scrollY;              // Get current distance from top of page
        backButton.classList.add("u-button-simple", "u-backbutton-link-onpage");
        backButton.innerHTML = "Go back";

        // Back button appears after highlight disappears (1.5s). Scroll event listener is attached
        window.setTimeout(function(){
            element.appendChild(backButton);  // Back button appears after element highlighted

            // Back button will fade away on scroll. Event listener is attached after highlight disappears.
            // Function needs to know where on the page we started and what button we're looking at.
            window.addEventListener("scroll", onpageLinkHandler.runOnScroll);
        }, 1500);
    }

    ,backButtonWasClicked: function() {
        this.scrollIntoViewAndHighlight(this.link);     // Scroll back to previous element when clicked
        this.removeBackButton(this.backButton);         // Remove the back button and scroll listener
    }

    ,scrollIntoViewAndHighlight: function(element) {
        element.scrollIntoView();                       // Scroll element into view
        element.classList.add("u-_lookatme");           // Make element noticeable

        window.setTimeout(function() {                  // Remove noticeable class after 1.5s
            element.classList.remove("u-_lookatme");
        }, 1500);
    }

    ,runOnScroll: function() {
        var backButton = onpageLinkHandler.backButton; // Less typing

        // Get distance scrolled away from back button
        var d = window.scrollY - backButton.distanceToTop;

        d = Math.abs(d);                                // Make sure value is positive (distance)
        var threshold = 300;                            // Threshold to remove the button (in px)

        // Back button disappears as user scrolls away. It's completely gone when threshold is reached.
        backButton.style.opacity = (threshold - d) / threshold;

        // If user scrolls past the threshold, remove the back button etc
        if( d > threshold) {
            onpageLinkHandler.removeBackButton();
        }
    }

    // Remove back button and other stuff we used.
    ,removeBackButton: function() {
        this.backButton.parentElement.classList.remove("u-position-relative");
        this.backButton.parentElement.removeChild(this.backButton);
        window.removeEventListener("scroll", onpageLinkHandler.runOnScroll);
    }
};

function hideLoadingNotification(){
    loadingNotification.classList += " u-_is-absent";
};

////////////////////////////////////////////////////////////////////////////////
// code that runs

// Runs after page is loaded
function runAfterPageLoadsCore() {
    // hideLoadingNotification();
}