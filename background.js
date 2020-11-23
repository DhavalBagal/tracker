
const DEFAULT_REGEX = "(go )|(go<)"
const DEFAULT_DO_REFRESH = false
const DEFAULT_TO_LOWER = false
const DEFAULT_TIMER = 10
const DEFAULT_REFRESH_RATE = 2

chrome.storage.local.set({regexPattern: DEFAULT_REGEX, 
    doRefresh: DEFAULT_DO_REFRESH,
    toLower: DEFAULT_TO_LOWER,
    timer: DEFAULT_TIMER,
    refreshRate: DEFAULT_REFRESH_RATE
})

var TIMER, REFRESH_RATE, doRefresh, toLower, pattern
var counter;

function check(text){
    var match = pattern.exec(text);
    if(match!=null){
        return true;
    }
    else{
        return false;
    }
}

function playTone(fname){
    var tone = new Audio(chrome.runtime.getURL(fname));
    tone.play();
}

chrome.runtime.onMessage.addListener( request => {
    if( request.message === "start-tracking" ) {

        chrome.storage.local.get(['regexPattern', 'doRefresh', 'toLower', 'timer', 'refreshRate'], function(data) {
            TIMER = data.timer;
            counter = parseInt(TIMER);
            
            REFRESH_RATE = parseInt(data.refreshRate)*1000;
            doRefresh = data.doRefresh;
            toLower = data.toLower;
            pattern = new RegExp(data.regexPattern);
        
            var timetracker = setInterval(function(){
                chrome.tabs.executeScript(parseInt(request.tabId), {code:'document.body.innerHTML;'}, results =>{
                    var text = (toLower)?results[0].toLowerCase():results[0]
                    res = check(text)
                    
                    if(res){
                        playTone("tone.mp3")
                        clearInterval(timetracker);
                        counter = TIMER;
                    }
                    else{
                        counter-=parseInt(REFRESH_RATE/1000);
                        console.log(counter)
                        
                        if(doRefresh){
                            chrome.tabs.executeScript(parseInt(request.tabId),{ code: 'window.location.reload();' })
                        }
                        
                        if(counter<=0){
                            playTone("timeout.mp3")
                            clearInterval(timetracker);
                            counter = TIMER;
                        }
                    }
                
                });
            }, REFRESH_RATE); 
        
        });
        
    }
});




