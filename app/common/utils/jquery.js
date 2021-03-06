/**
 * jQuery prototype extensions.
 */


/**
 * Shake animation.
 *
 * @param   intShakes   Number of times to shake.
 * @param   intDistance Distance to move the object.
 * @param   intDuration Duration of the animation.
 *
 * @return  The element it was applied one, for chaining.
 */
$.fn.shake = function (intShakes, intDistance, intDuration) {
    this.each(function () {
        $(this).css("position","relative");
        for (let x=1; x<=intShakes; x++) {
            $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
                .animate({left:intDistance}, ((intDuration/intShakes)/2))
                .animate({left:0}, (((intDuration/intShakes)/4)));
        }
    });
    return this;
};
