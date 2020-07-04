var workDay = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};


 $(document).ready(function() {
   if (!localStorage.getItem('workday')) {
        updateCalendarTasks('workDay');
   } else {
        updateCalendarTask(JSON.parse(localStorage.getItem('workday')));
    }
 })

var counter= 1;

for (var property in workDay){
    var textEntry ="#text-entry"+ counter;
    $(textEntry).text(workDay[property]);
    var timeID = `#time${counter}`;
    var presentHour = moment().hour();
    var timeString = $(timeID).text();
    var timeNumber = checkHours(timeString);
    if (timeNumber < presentHour) {
        $(textEntry).addClass("past");
    } else if (timeNumber > presentHour){
        $(textEntry).addClass("future");

    } else {  
        $(textEntry).addClass("present");
  }
    counter ++;
}   

    console.log($("#date-today"));
    $("#date-today").text(moment().format("dddd, MMM Do YYYY"));
    

    $("button").click(function() {
        value = $(this).siblings("textarea").val();  
    hourValue = $(this).siblings("div").data("time");  
    console.log(hourValue);
    console.log(checkHours(hourValue));

    saveSchedule ( hourValue,value);

    });

    function checkHours (hour){
    switch(true) {
        case hour < moment().hour() :return "past";
        break;
        case hour === moment().hour() :return "present";
        break;
        case hour > moment().hour() :return "future";
        break;
    

     }
    }

     function loadCorrectDataset() {
        result = localStorage.getItem('workDay')
        return (result ? result : workDay);
}


   function initializeLocalStorage() {
        localStorage.setItem('workDay', JSON.stringify(workDay));
   };

     function savetToLocalStorage(dayObj) {
         localStorage.setItem('workDay', JSON.stringify(dayObj));
     };

    

    function saveSchedule(hour, val) {
        if(!localStorage.getItem('workDay')) {
        initializeLocalStorage();
  }

    var workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hour] = val
        

   savetToLocalStorage(workHours);
}
    
function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function(index) {
    var res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}
   