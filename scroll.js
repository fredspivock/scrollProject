
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

var scrollList = function(element, numberOfItems, imageArray, scrollHeight, heightOfText) {

    //sets element to height of window to take up full screen
    $(element + " > .fred-menu-wrapper").css("height", $(window).height());
    //
    var elementTop = $(element + " > .fred-menu-wrapper").offset().top;
    var elementHeight = $(element + " > .fred-menu-wrapper").height();
    var wrapper = $(element).css({"height" : (scrollHeight + elementHeight) + "px", "width": $(window).width()});
    $(element + " > .fred-menu-wrapper").css({"width" : $(element).width()})
    var activated = false;
    var sectionHeight = scrollHeight/numberOfItems;
    var section = 0;
    var previousSection = -1;

    //set first image
    $(element + " #fred-image").attr("src", imageArray[section]);
    //set first bar height
    $(element + " .fred-bar-wrapper").css("top", $(element + "  .fred-list :nth-child(" + (section + 1) + ") .fred-title").position().top);
    

    $(window).scroll(function() {

      //below element
      if($(window).scrollTop() < elementTop)  {
        activated = false;
        $(element + " > .fred-menu-wrapper").css({"position" : "absolute", "top": 0, "bottom": "auto"});
      }
      //between element and end of scroll height
      else if ($(window).scrollTop() > elementTop && 
        $(window).scrollTop() < elementTop + scrollHeight) {
        
        //sets the section
        section = Math.floor(($(window).scrollTop() - elementTop) / sectionHeight);

        //Locks the viewport to the top
        if(!activated){
          activated = true;
          $(element + " > .fred-menu-wrapper").css({"position" : "fixed", "top": 0});
        }

        //If the section changes
        //change image
        //move cursor
        //and reveal extra text
        if( section !== previousSection){
          //changes the image in the wrapper
          $(element + " #fred-image").attr("src", imageArray[section]);

          //makes text visible
          $(element + " .fred-list :nth-child(" + (section + 1) + ") .fred-subtext").addClass("activated");

          //remove previous text
          $(element + " .fred-list :nth-child(" + (previousSection + 1) + ") .fred-subtext").removeClass("activated");

          //moves the cursor 
          $(element + " .fred-bar-wrapper").css("top", $(element + "  .fred-list :nth-child(" + (section + 1) + ") .fred-title").position().top);

          //sets previous section
          previousSection = section;
          console.log(section + 1, $(element + "  .fred-list :nth-child(" + (section + 1) + ") .fred-title").html());
        }

      }
      //after scroll height
      else if( $(window).scrollTop() > elementTop + (scrollHeight - elementHeight)) {
        activated = false;
        $(element + " > .fred-menu-wrapper").css({"position" : "absolute", "bottom": 0, "top": "auto"});
      }
    });
}


$(document).ready(function() {

    /* Settings, these are passed to the function, the following is place holder*/

  //an array of image sources
  var imageArray = [
    "https://deshannonspeaks.files.wordpress.com/2015/01/img_1132.jpg",
    "http://img.ccrd.clearchannel.com/media/mlib/2135/2015/07/default/justin_bieber_main_0_1438172363.jpg",
    "http://3.bp.blogspot.com/-vh2KxwKn3Gc/VBLh_rwA1uI/AAAAAAAAUVU/wlBR6sohlcM/s1600/Should-You-Get-a-Roommate.png",
    "http://1.bp.blogspot.com/-ZIdi-_mvvd0/VZuu6uiFGYI/AAAAAAAAdQw/2-cTr-wGv2Y/s640/10-phone-designs-you-wont-believe-ever-sold.png"
  ];

  var element = "#firstMenu";
  var numberOfItems = 4;
  var scrollHeight = 1900;
  var heightOfText = 300;

  scrollList(element, numberOfItems, imageArray, scrollHeight, heightOfText);

});








