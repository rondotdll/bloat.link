function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copy").focus()
}

$(document).ready(() => {
    $("[data-toggle=popover]").popover({
        "placement": "bottom",
        "content": "URL Copied!",
        "trigger": "focus"
    })

    $("#back").click(() => {
        window.location.href = "https://bloat.link/"
    })

    $("#copy").click(() => {
        copyToClipboard("https://bloat.link/" + url_code)
    })
    
    $(this).delay(500).queue(function() { 
        $(".pb-loading").attr("style", "width: 15%");
        $(this).dequeue();       
    }).delay(1250).queue(function() { 
        $(".pb-loading").attr("style", "width: 40%");
        $("#line-1").removeClass("current").addClass("loaded")
        $("#line-2").addClass("current")
        $(this).dequeue();       
    }).delay(1500).queue(function() { 
        $(".pb-loading").attr("style", "width: 85%");
        $("#line-2").removeClass("current").addClass("loaded")
        $("#line-3").addClass("current")
        $(this).dequeue();       
    }).delay(1000).queue(function() { 
        $(".pb-loading").attr("style", "width: 99%");
        $("#line-3").removeClass("current").addClass("loaded")
        $("#line-4").addClass("current")
        $(this).dequeue();       
    }).delay(750).queue(function() { 
        $(".pb-loading").attr("style", "width: 100%");
        $("#line-4").removeClass("current").addClass("loaded")
        $(this).dequeue();       
    }).delay(100).queue(function() {
        $(".header-text").fadeOut()
        $(".loading-text").fadeOut()
        $(".progress").fadeOut()
        $(this).dequeue() 
    }).delay(1000).queue(function() {
        $(".header-text").removeClass("display-4").removeClass("fw-bold").addClass("display-6").html("Your Brand New URL").fadeIn()
        $(this).dequeue()
    }).delay(250).queue(function() {
        $(".url-display").fadeIn()
        $(this).dequeue()
    }).delay(250).queue(function() {
        $(".footer-buttons").fadeIn()
        
        var WriteTitle = new Typewriter($(".url-display span").get(0), {
            cursor: '',
            delay: 30
        });

        WriteTitle.typeString(url_code).start()
        $(this).dequeue()
    });
})