/**
 * The MIT License
 *
 * Copyright (c) 2014 Nikolas Schmidt-Voigt, http://nikolassv.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * module containing a directive to automaticly resize a textarea to always fit the height of its content
 *
 * the directive textarea-fit can be used on a textarea element to always set its 
 * height to the height of its content. This prevents the display of a vertical
 * scrollbar inside the textarea.
 *
 * note that the directive `ng-trim=0` should also be set on that textarea to 
 * prevent problems with angulars default trimming.
 *
 * this directive also requires you to load jQuery before angular
 *
 * @author Nikolas Schmidt-Voigt <nikolas.schmidt-voigt@posteo.de>
 * @module textarea-fit
 */
angular
  .module('textarea-fit',[])
  .directive('textareaFit', [
    '$log',
    function ($log) {
      var copyCssStyles = function (elSrc, elDest) {
            var stylesToCopy = [
                  'width',
                  'font-family',
                  'font-size',
                  'line-height',
                  'min-height',
                  'padding'
                ],
                destStyles = {};
            
            angular.forEach(stylesToCopy, function (style) {
              destStyles[style] = elSrc.css(style); 
            });

            elDest.css(destStyles); 
          };

      return {
        restrict: 'A',
        link : function ($scope, $element) {
          if (!angular.isFunction($element.height)) {
            $log.error('textareaFit directive only works when jQuery is loaded');
          } else if ($element.is('textarea')) {
            $log.info('textareaFit directive only works for elements of type "textarea"');
          } else {
            var elClone = angular.element('<div>'),
                setEqualHeight = function () {
                  var curText = $element.val();
                  if (/\n$/.test(curText)) {
                    curText += ' ';
                  }
                  copyCssStyles($element, elClone);
                  elClone.text(curText);
                  $element.height(elClone.height());
                };

            elClone
              .hide()
              .css({
                'white-space': 'pre-wrap',
                'word-wrap' : 'break-word'
              });
            $element.parent().append(elClone);
            $element.css('overflow', 'hidden');

            $scope.$watch(function () {
              return $element.val();
            }, setEqualHeight);

            $scope.$watch(function () {
              return $element.width();
            }, setEqualHeight);

            $scope.$on('destroy', function () {
              elClone.remove();
              elClone = null;
            });
          }
        }
      };
    }]
  );
