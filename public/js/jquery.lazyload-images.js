/**
 * jQuery Lazyload-images
 * A very lightweight jQuery plugin to lazy load images
 *
 */

(function($) {

    $.fn.lazyLoadImages = function(threshold, callback) {

        var ATTRIBUTE = "data-src",
            images = this,
            loaded,
            DEBUG = false;

        // If threshold is not set, use 0.
        threshold = threshold || 0,

        this.one("lazyLoadImages", function() {
            var source = this.getAttribute(ATTRIBUTE);
            if (source) {
                // Set the src attribute to the real source.
                this.setAttribute("src", source);

                // If its a function, do a callback.
                if (typeof callback === "function") {
                    callback.call(this);
                }
            } else {
                console.log("Missing " + ATTRIBUTE + " on <img>");
            }
        });


        function lazyLoadImages() {
            var imagesInView = images.filter(function() {
                var scrollTopPos = $(window).scrollTop(),
                    windowB = scrollTopPos + $(window).height(), // browser viewport height + scrollTopPos
                    elementTopPos = $(this).offset().top,
                    elementB = elementTopPos + $(this).height();

                if (DEBUG) {
                    // THE CALCULATION
                    if (elementB >= (scrollTopPos - threshold) && elementTopPos <= (windowB + threshold)) {
                        console.log("scrollTopPos", scrollTopPos);
                        console.log("windowB: ", windowB);
                        console.log("elementTopPos: ", elementTopPos);
                        console.log("elementB: ", elementB);
                        console.log("THIS.height()", $(this).height());
                        console.log("elementB >= (scrollTopPos - threshold) && elementTopPos <= (windowB + threshold)", elementB >= (scrollTopPos - threshold) && elementTopPos <= (windowB + threshold));
                        return true;
                    }
                    return false;
                }

                return elementB >= (scrollTopPos - threshold) && elementTopPos <= (windowB + threshold);
            });

            loaded = imagesInView.trigger("lazyLoadImages");
            images = images.not(loaded);
        }

        /* Run lazyload on scroll, resize and lookup */
        $(window).on("scroll.lazyLoadImages resize.lazyLoadImages lookup.lazyLoadImages", lazyLoadImages);

        lazyLoadImages();

        return this;
    };

})(jQuery);