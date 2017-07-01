$(document).ready(function(){
    
    // Initialize settings
    var circleClick = "off";
    var sessionCounter = 60*25;
    var breakCounter = 60*5;
    var resumeMessage = "Click Again to Resume";
    var pauseSetting = "off";
    
    $(".sessionTime").html(counterConvertor(sessionCounter));
    $(".breakTime").html(counterConvertor(breakCounter));
    
    
    
    // Fire startTimer function
    function startTimer() {
        
        circleClick = "on";
        $(".breakPod").removeClass("highlight");
        $(".workPod").addClass("highlight");
        $("#display").html("Work Mode");
        
        var timerInterval = setInterval(function(){
            
            if (sessionCounter >= 0) {
                $("#timer").html(counterConvertor(sessionCounter));
                sessionCounter--;
            }
            else {
                $("#timer").html("Break!");
                $("#display").html("Break Mode");
				var breakSound = new Audio("https://www.myinstants.com/media/sounds/lbpnotification.mp3");
            	breakSound.play();
                clearInterval(timerInterval);
				var breakView = ($(".breakTime").html()).split(":");
                breakCounter = breakView[0] * 60;
                breakTimer();
            }
        }, 1000);
        
        $(".pause").click(function(){
            circleClick = "off";
            pauseSetting = "off"
            clearInterval(timerInterval);
            $("#display").html(resumeMessage);
        });
    } //End startTimer function
            
  
  
    // Fire BreakTimer function
    function breakTimer() {
        circleClick = "on";
        $(".workPod").removeClass("highlight");
        $(".breakPod").addClass("highlight");
        $("#display").html("Break Mode");
        var breakInterval = setInterval(function() {
        
            if(breakCounter >= 0) {
                $("#timer").html(counterConvertor(breakCounter));
                breakCounter--;
            }
            else {
                $("#timer").html("Work!");
                $("#display").html("Work Mode");
                var sessionSound = new Audio("https://www.myinstants.com/media/sounds/lbpnotification.mp3");
            	sessionSound.play();
                clearInterval(breakInterval);
                var sessionView = ($(".sessionTime").html()).split(":");
                sessionCounter = sessionView[0] * 60;
                startTimer();
            } 
        }, 1000);
        
		// Include pause click function inside of timer function
        $(".pause").click(function() {
            circleClick = "off";
            pauseSetting = "on";
            clearInterval(breakInterval);
            $("#display").html(resumeMessage);
        });
    }; // Close breakTimer
  

  
    // Universal click function
    $(".timerPod").click(function() {
        
        if(pauseSetting === "off" && circleClick === "off") {
            startTimer();
        }
        if (pauseSetting === "on" && circleClick === "off") {
            breakTimer();
        }
        
    }); // End universal click function 
  
    
    
    // Convertor to change seconds into MM:SS format
    function counterConvertor(secs) {
		
        var h = Math.floor(secs / (60 * 60));
        var minConvertor = secs % (60 * 60);
        var m = Math.floor(minConvertor / 60);
        var secConvertor = minConvertor % 60;
        var s = Math.ceil(secConvertor);
		if (s < 10) {
			return m + ":0" + s;
		} else return m + ":" + s;
		
    }; // End counterConvertor function
    
	

    
    // Click events for changing settings
    $(".moreSession").click(function() {
        if(circleClick === "off") {
            // Ensure that the number incremented has type number
            sessionCounter += Number(60);
            sessionCounter = Math.floor(sessionCounter/60);
            sessionCounter = sessionCounter*60;
            
            $(".sessionTime").html(counterConvertor(sessionCounter));
            $("#timer").html(counterConvertor(sessionCounter));
            
        }
    });

	
    $(".lessSession").click(function() {
        if(circleClick === "off") {
            if (sessionCounter >= 60) {
				// Ensure that the number incremented has type number
                sessionCounter -= Number(60);
                sessionCounter = Math.floor(sessionCounter/60);
                sessionCounter = sessionCounter*60;
                $(".sessionTime").html(counterConvertor(sessionCounter));
                $("#timer").html(counterConvertor(sessionCounter));
            }
        }
    });
    
	
    $(".moreBreak").click(function() {
        if(circleClick === "off") {
			// Ensure that the number incremented has type number
            breakCounter += Number(60);
            breakCounter = Math.floor(breakCounter/60);
            breakCounter = breakCounter*60;
            $(".breakTime").html(counterConvertor(breakCounter));
            $("#timer").html(counterConvertor(breakCounter));
        }
    });

	
    $(".lessBreak").click(function() {
        if(circleClick === "off") {
            if (breakCounter >= 60) {
				// Ensure that the number incremented has type number
                breakCounter -= Number(60);
                breakCounter = Math.floor(breakCounter/60);
                breakCounter = breakCounter*60;
                $(".breakTime").html(counterConvertor(breakCounter));
                $("#timer").html(counterConvertor(breakCounter));
            }
        }
    });
 
	
 
    
}); //End doc ready function