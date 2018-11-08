var DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function start(){
    updateClock();
    updateDate();
}

function updateClock(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
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
    document.getElementById('date').innerHTML = dn + ", " + d + "." + m + "." + y;
    setTimeout(updateDate, 500);
}
