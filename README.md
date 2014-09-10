# angular-textarea-fit

A module containing a directive to automaticly resize a textarea to always fit the height of its content

The directive `textarea-fit` can be used on a textarea element to always set its 
height to the height of its content. This prevents the display of a vertical
scrollbar inside the textarea.

Note that the directive `ng-trim=0` should also be set on that textarea to 
prevent problems with angulars default trimming.

Just add both directives as attributes to your existing textarea:

  <textarea ng-model="yourModel" ng-trim="0" textarea-fit></textarea>

This directive requires jQuery to be loaded before angular.
