$(document).ready(function () {

    /*  the fadeScroll functions are handeled in the handler function below


        This one will make the down-pointing arrow in 
        the main page disappear
    */
    function fadeScroll() {
        $("header .arrow-down").addClass("scroll");
    }

    /*  This one will make the down-pointing arrow in 
        the main page appear
    */
    function fadeScrollOut() {
        $("header .arrow-down").removeClass("scroll");
    }

    function ingredientChecker() {
        var boxes = ["#ingredient2", "#ingredient4", "#ingredient7"];
        var count = 0;
        var ingredient = ""
        //console.log(ingredient + " is currently checked by the checker")
        /* checks, how many of the avaiable checkboxes are checked */
        boxes.forEach(e => {
            ingredient = $(e).attr("name");
            if ($(e).is(':checked')) {
                count++;
                $("#" + ingredient).removeClass("hide")
                //console.log();

            }
            else{
                $("#" + ingredient).addClass("hide")
            }
        });
       /*  only when the minimal value is reached the button is clickable*/
        if (count >= 2) {
            $("#create-muesli .center div").html('<a href="package.html"><button type="button" class="btn cereal-btn">WEITER!</button></a>')
            $("#create-muesli .center span").addClass("hide");
        }else{
            $("#create-muesli .center div").html('<button type="button" class="btn">WEITER!</button>')
            $("#create-muesli .center span").removeClass("hide");
        }

    }
    function packageChecker() {
        var boxes = ["classic", "black"];
        boxes.forEach(e => {
            if ($("#" + e).is(':checked')) {
                console.log(e);
                $("#packet").attr("src", "media/" + e + ".png");
                console.log(e);

            }
            if($("#classic").is(":checked") || $("#black").is(":checked")){
                $(".choose-package .center div").html('<a href="done.html"><button type="button" class="btn cereal-btn">WEITER!</button></a>')
                $(".choose-package .center span").addClass("hide");
            }else{
                $(".choose-package .center div").html('<button type="button" class="btn">WEITER!</button>')
                $(".choose-package .center span").removeClass("hide");
            }
        });
       

    }

    /* this one manages the collapses in the create-muesli section
    to allow only one collapsed info at a time */
    function ingredientToggle(e) { 
        var current = e.target.id;
        var currentName = e.target.name;
        var collapsables = [
            "#collapse1", "#collapse3",
            "#collapse5", "#collapse6",
            "#collapse8"
        ];
        
        //console.log(currentName);
        collapsables.forEach(i => {
            if (
                //checks, if collapse is active on an element
                $('.formular ' + i).hasClass("collapse show") &&
                i != current) {
                //if so, it will remove this 'collapse' class
                $('.formular ' + i).collapse('toggle');
            }
        });
        /* if (typeof currentName === "string" && currentName != undefined){
            console.log("Current name is a string!! LOOK: " + currentName);
            var ingredient = currentName;
        }
        //console.log(ingredient); */
        setTimeout(function() {
            ingredientChecker();
          }, 10);
        
    }

    /* works exactly like the ingredientToggle function */
    function packageToggle(e) {
        var current = e.target.id;
        var collapsables = [
            "#collapse-p1", "#collapse-p2",
            "#collapse-p3"
        ];
        collapsables.forEach(i => {
            if (
                //checks, if collapse is active on an element
                $('.formular ' + i).hasClass("collapse show") &&
                i != current) {
                //if so, it will remove this 'collapse' class
                $('.formular ' + i).collapse('toggle');
            }
        });
        setTimeout(function() {
            packageChecker();
          }, 10);
    }



    /* function mapResizer(){
        var mapWidth = $(".locations #map").width();
        $(".locations #map").height(mapWidth);
    } */

    /* THis is neccecary for the fadeScroll functions to work -
    declares the view port (kind of?) */
    jQuery.expr.filters.offscreen = function (el) {
        var rect = el.getBoundingClientRect();
        return (
            (rect.x + rect.width) < 0 ||
            (rect.y + rect.height) < 0 ||
            (rect.x > window.innerWidth ||
                rect.y > window.innerHeight)
        );
    };
    /* For smooth scrolling when clicking the a-tag */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    var timer;

    /* $( window ).on("load", function(){
        mapResizer();  
    })

    $( window ).resize(function() {
        mapResizer();
    }); */

    /* handlerfunction for the fadeScroll functions -
    When the user scrolls on the main page the arrow disappears for a amount
    of a half second.
    The arrow disappears completely whlie the user is in the "create-muesli" part of the page */

    $(window).scroll(function () {
        window.clearTimeout(timer);
        fadeScroll();
        var offScreen = $("#create-muesli").is(":offscreen");
        if (offScreen == true) {
            timer = window.setTimeout(function () { fadeScrollOut(); }, 500);
        }
    })
    /*   If one of the ingredients checkboxes the site doesn´t want you to chose is clicked
      the checkboxes attribute 'default' is set to 'TRUE' */
    $('#create-muesli .formular .wrong-ing').click(function (e) {
        var i = "";
        //console.log(e.target);
        if (e.target.tagName == "INPUT") {
            i = $("#" + e.target.id);
            i.attr('disabled', true);
        }
    });

    $("#create-muesli .formular").click(ingredientToggle);
    $(".choose-package .formular").click(packageToggle);

   ingredientChecker();
   packageChecker();
});

