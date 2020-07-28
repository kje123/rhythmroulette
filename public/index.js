"use strict";

(function() {

    window.addEventListener("load", init);

    function init() {
        let randoButton = id("randomize");
        randoButton.addEventListener("click", fetchLinks);
    }

    function fetchLinks() {
        let url = "/links"
        loadingCircle();
        fetch(url)
            .then(checkStatus)
            .then(resp => resp.text())
            .then(addVideo)
            .catch(videoHandler);
    }

    function loadingCircle(links) {
        let circle = gen("div");
        let container = id("video-container");
        container.innerHTML = "";
        circle.classList.add("lds-dual-ring");
        container.appendChild(circle);
    }

    function addVideo(links) {
        let linksArray = links.split("\n");
        let container = id("video-container");
        container.innerHTML = "";
        for(let i = 0; i < linksArray.length-1; i++) {
            let vidContainer = gen("div");
            let newVideo = gen("iframe");
            let dwnldButton = gen("button");
            vidContainer.classList.add("video");
            newVideo.width = "420";
            newVideo.height = "315";
            newVideo.src = linksArray[i];
            dwnldButton.textContent = "Download";
            dwnldButton.addEventListener("click", () => { getDownload(linksArray[i]) });
            vidContainer.appendChild(newVideo);
            vidContainer.appendChild(dwnldButton);
            container.appendChild(vidContainer);
        }
    }

    function getDownload(link) {
        console.log(link);
        let url = "/download?link=" + link;
        window.location.href = url;
    }

    function videoHandler() {
        console.log("something went wrong");
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
