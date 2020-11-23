

$(document).ready(function(){

    chrome.storage.local.get(['regexPattern', 'doRefresh', 'toLower', 'timer', 'refreshRate'], function(data) {
        
        $("#regex-pattern").val(data.regexPattern);

        if(data.doRefresh) $("#do-refresh").toggle(true)
        else $("#do-refresh").toggle(false)

        if(data.toLower) $("#to-lowercase").toggle(true)
        else $("#to-lowercase").toggle(false)

        $("#timer").val(data.timer);
        $("#refresh-rate").val(data.refreshRate);

    });

    $(document).on("change", "#regex-pattern", function(){
        chrome.storage.local.set({regexPattern: $("#regex-pattern").val()})
    })

    $(document).on("change", "#timer", function(){
        chrome.storage.local.set({timer: $("#timer").val()})
    })

    $(document).on("change", "#refresh-rate", function(){
        chrome.storage.local.set({refreshRate: $("#refresh-rate").val()})
    })

    $(document).on("click", "#do-refresh-holder", function(){
        $("#do-refresh").toggle();
        if($("#do-refresh").is(':visible')) chrome.storage.local.set({doRefresh: true})
        else chrome.storage.local.set({doRefresh: false})
    })

    $(document).on("click", "#to-lowercase-holder", function(){
        $("#to-lowercase").toggle();
        if($("#to-lowercase").is(':visible')) chrome.storage.local.set({toLower: true})
        else chrome.storage.local.set({toLower: false})
    })

    chrome.tabs.query({}, function(tabs){
        tabs.forEach(tb => {
            if(tb!==undefined && tb.url!==undefined){
                if (!tb.url.startsWith("chrome://"))
                $("<span/>", { text: "\xa0\xa0\xa0"+tb.title.slice(0,25)+" . . .", id: tb.id, class: "tab-row"}).appendTo("#tab-holder");
            }
        });
    });

    $(document).on("click", ".tab-row", function(e){
        var id = e.target.id;
        chrome.runtime.sendMessage({message: "start-tracking", tabId:id})
        window.close();
    })

})