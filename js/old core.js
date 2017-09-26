// core.js /////////////////////////////////////////////////////////////////////

function loadTemplate(whichPage = window.location) { // load some content into <main>
// pick content based on [whichPage] parameter if given, otherwise default to using URL hash to pick content

    if(!whichPage) { // default to home page if URL does not contain a hash and [whichPage] is not given
        loadHome();
    } else if(whichPage === "posts") {
        loadPostList();
    } else if(whichPage.indexOf("post-") !== -1) {
        loadPost();
    } else if (whichPage === "test") {
        loadTestPage();
    } else { // fall back to 404 error if URL hash doesn't match a page
        document.querySelector(".mainContent").innerHTML = "<h1>Error 404: page not found</h1>";
    }

    function loadHome() {
        asyncGet("posts/index.html", false, addRecentPosts);
        function addRecentPosts(content) { // retrieve the 3 most recent posts from the post index
            let parser = new DOMParser(); // create a parser to parse the content we just retrieved
            content = parser.parseFromString(content,"text/xml") // parse content to create an xml object
            let listItems = content.getElementsByTagName("li"); // collect <li> elements
            document.querySelector(".mainContent").appendChild(listItems[0]); // append first <li>
            // use the same index [0] because the previous element has been moved out of the original xml object
            document.querySelector(".mainContent").appendChild(listItems[0]); // append second <li>
            document.querySelector(".mainContent").appendChild(listItems[0]);
        }
    }

    function loadPostList() {
        asyncGet("posts/index.html", false, insertContent);
    }

    function loadPost() {
        whichPost = whichPage.substring(5); // extract post filename by removing the "post-" prefix
        asyncGet("posts/" + whichPost, false, insertContent);
    }

////////////////////////////////////////////////////////////////////////////////


