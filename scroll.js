
//Debouncing function for scroll event
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

//the function

/* NOTES

MAYBE A DIV WITH FOXED POSTION LIKE AN OVERLAY WOULD BE THE WAY FORWARD?!

*/

var scrollList = function(elementTop, elementHeight, numberOfItems, imageArray) {
    
    //console.log(count++);
    //console.log(elementTop, elementHeight)
    //console.log($(window).scrollTop() > elementTop);
    //console.log($(window).scrollTop() < elementTop + elementHeight)


    var sectionHeight = elementHeight/numberOfItems;

    if($(window).scrollTop() > elementTop && $(window).scrollTop() < elementTop + elementHeight) {
      console.log( ($(window).scrollTop() - elementTop) % sectionHeight);
      $("body").css({ "height" : ($(window).height() - 1) + 'px', "overflow": "hidden" });
    }
    else {
      $("body").removeClass('activated');
    }
}

  /* Settings, these are passed to the function, the following is place holder*/

  //an array of image sources
var imageArray = [
  "https://deshannonspeaks.files.wordpress.com/2015/01/img_1132.jpg",
  "http://img.ccrd.clearchannel.com/media/mlib/2135/2015/07/default/justin_bieber_main_0_1438172363.jpg",
  "http://3.bp.blogspot.com/-vh2KxwKn3Gc/VBLh_rwA1uI/AAAAAAAAUVU/wlBR6sohlcM/s1600/Should-You-Get-a-Roommate.png",
  "http://1.bp.blogspot.com/-ZIdi-_mvvd0/VZuu6uiFGYI/AAAAAAAAdQw/2-cTr-wGv2Y/s640/10-phone-designs-you-wont-believe-ever-sold.png"


];

var elementTop = $('#firstMenu').offset().top;

//this can also be a scroll height
var elementHeight = $('#firstMenu').height();
var numberOfItems = 4;


$(document).ready(function() {
  $(window).scroll(function() {
    debounce(scrollList(elementTop, elementHeight, numberOfItems, imageArray), 250);
  });
});








