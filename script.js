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
    $("#commands").focus();

    $("form").on("submit", function(e){
        e.preventDefault();
        window.location.href = CONF.search_engine + $("#commands").val();
    })
});
