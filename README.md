# loadBackgroundImages

A simple plugin for loading the background images of the elements passed.  The plugin can also be used to load individual images.

## Usage

You must include jQuery and the plugin on the page.  

### Loading background images

Make a selection containing the elements with background images you would like to load and call: 

`$(selection).loadBackgroundImages(finalCallback, eachCallback)`

  - `finalCallback`: a callback function that will execute when all background images in the selection have been loaded.  In the callback function `this` refers to the jQuery selection of all the elements that were loaded.
  - `eachCallback`: a callback function that will execute for each background image that is loaded. In this callback, `this` refers to the single jQuery element that has just finished loading.

**Example:**

```javascript
  $('.background1, .background2, .background3').loadBackgroundImages(
    function() {
      console.log("all of the images have been loaded", this);
    },
    function() {
      console.log("one of the images has loaded", this);
    }
  );
```

### Loading an image

The plugin also adds the `loadImage` function which can be used to load an individual image and execute a callback when it's complete.

`$.loadImage(imageSrc, callback)`

  - `imageSrc`: this is the url to the image to load
  - `callback`: a function to execute once the image has loaded. In the callback `this` refers to an image element that has been created (but not yet added to the DOM)

**Example:**

```javascript
  $.loadImage("http://www.placeholder.it/800x800", function() {
    console.log("the image has finished loading", this);
  });
```

## Support

This plugin is supported on Chrome, Safari, IE9+, Firefox 1.5+, Opera.  Support for IE < 9 can be added by adding an `indexOf` [polyfill](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill) to your website or application.
