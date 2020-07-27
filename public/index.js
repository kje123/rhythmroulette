"use strict";

(function() {

    window.addEventListener("load", init);

    function init() {
        let randoButton = id("randomize");
        randoButton.addEventListener("click", fetchLinks);
    }

    function fetchLinks() {
        let url = "/links"
        fetch(url)
            .then(checkStatus)
            .then(resp => resp.text())
            .then(addVideo)
            .catch(videoHandler);
    }

    function addVideo(links) {
        let linksArray = links.split("\n");
        let container = id("video-container");
        // clear videos if user is rerandomizing
        container.innerHTML = "";
        for(let i = 0; i < linksArray.length-1; i++) {
            let newVideo = gen("iframe");
            newVideo.classList.add("video");
            newVideo.width = "420";
            newVideo.height = "315";
            newVideo.src = linksArray[i];
            container.appendChild(newVideo);
        }
    }

    function videoHandler() {

    }

    /**
    * checks status of page and returns response as text if it passes,
    * else throws error
    * @param {Response} response - the given page
    * @returns {Response} if given page is valid returns itself
    * @throws {Error} if response is not ok
    */
    function checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            throw Error("Error in request: " + response.statusText);
        }
    }


    /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
    function id(idName) {
        return document.getElementById(idName);
    }

    /**
    * Returns a new ceated element of given type
    * @param {string} elType - element type
    * @returns {object} new element of given type
    */
    function gen(elType) {
        return document.createElement(elType);
    }



})();
