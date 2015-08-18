/** 
loadBackgroundImages
---------------------------------------------------------------------
Author:         Lane Olson
Version:        1.0
Date:           August 17, 2015
Description:    Executes a callback once background images are loaded.
---------------------------------------------------------------------
**/

;(function ($) {

    // get the background URL from a jQuery element
    function getBackgroundUrl(el) {

      bgProp = el.css('background-image');
      if (bgProp !== "none") {
        return el.css('background-image').match(/\((.*?)\)/)[1].replace(/('|")/g,'');
      } else {
        console.warn("element passed has no background-image to load", el[0]);
        return null;
      }
      
    };

    // load an image from a url and execute a callback once it's loaded
    $.loadImage = function ( url, callback ) {

        var cb = callback;

        var img = new Image();
        img.onload = function() {
          // apply the image to the callback function
          cb.apply(this)
        }
        img.src = url;
        if (img.complete) img.onload();

    };
    
    // load the background images from a series of selected elements
    $.fn.loadBackgroundImages = function( finishedCb, individualCb ) {

      var imagesLoaded = []; // contains a list of images loaded
      var imagesLoading = []; // contains a list of images to load
      var cb = finishedCb; // callback for when all assets are loaded
      var icb = individualCb; // callback for when each individual asset loads

      var selection = this;

      // get the jQuery element that was passed, based on the image source
      function getElFromSrc(src) {
        for(var i = 0; i < selection.length; i++) {
          var url = getBackgroundUrl($(selection[i]));
          if (url === src) {
            return selection[i];
          }
        }
        return null;
      };

      // executes every time one of the images is loaded
      function imageLoaded() {
        var imgIndex = imagesLoaded.indexOf(this.src);
        if (imgIndex < 0) {
          imagesLoaded.push(this.src);
        }
        if ((typeof icb) === "function") {
          var el = getElFromSrc(this.src);
          if (el == null)
            el = this;
          icb.apply($(el));
        }
      };

      // checks if all of the images are loaded and executes the
      // final callback if they are
      function isLoaded() {
        if (imagesLoading.length === imagesLoaded.length) {
          clearInterval(interval);
          if((typeof cb) === "function")
            cb.apply(selection);
        }
      };

      // create an interval to poll and see if all the assets have loaded yet
      var interval = setInterval(isLoaded, 200);

      return this.each(function () {
        imageUrl = getBackgroundUrl($(this));
        if (imageUrl !== null) {
          imagesLoading.push(imageUrl);
          (new $.loadImage(imageUrl, imageLoaded));
        }
      });
    };
    
})( jQuery );
