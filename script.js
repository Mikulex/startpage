$(document).ready(function() {
    var DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var CONF;


    // function definitions

    function updateClock(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        h = checkTime(h);
        m = checkTime(m);
        $('#time').html(h + ":" + m);
        setTimeout(updateClock, 500);
    }
    function checkTime(i){
        if(i < 10) {i = "0" + i}; // add zero for numbers < 10
        return i;
    }
    function updateDate(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth();
        var y = today.getFullYear();

        d = checkTime(d);
        m = checkTime(m);

        var dn = DAY[today.getDay()]; // getDay returns week day, 0 being Sunday
        $("#date").html(dn + ", " + d + "." + m + "." + y);
        setTimeout(updateDate, 500);
    }


    // functions to be valled after page finished loading
    $.getJSON("commands.json", function(json) {
        CONF = json;
        for(let fav of CONF.links){
            $("#favs").append('<li><span class="favkey">' + fav.key + '</span><span class="favlink">' + fav.url + '</span></l>');
        }    });

    updateClock();
    updateDate();
    $("#commands").focus(); // focus command bar on load

    $("form").on("submit", function(e){
        e.preventDefault();
        var input = $("#commands").val().trim();

        if(input.indexOf(':') == 0){
            for(let fav of CONF.links){
                if(fav.key == input) {
                    window.location.href = fav.url;
                }
            }
        } else {
            window.location.href = CONF.search_engine + $("#commands").val();

        }
    })

    $("#commands").keyup(function(e){
        var input = $(this).val().trim();

        if(input.length == 0){ // hide commandlist when bar is emtpy
            $("#favs").slideUp();
        } else {
            $("#favs").slideDown();
        }
        if(input.indexOf(':') == 0) { //only hide options with leading ':'

            $(".favkey").each(function(){
                if($(this).html().indexOf(input) < 0){
                    $(this).parent().fadeOut(200);
                } else {
                    $(this).parent().fadeIn(200);
                }
            })
        }

    })
});
