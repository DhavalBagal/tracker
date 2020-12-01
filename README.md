# Tracker

![](https://github.com/DhavalBagal/tracker/blob/main/tracker.png?raw=true)

This chrome extension allows you to monitor a particular tab for any regular expression pattern. Upon selecting the tab you can continue with your work, switch to other tabs, etc and the extension will do the rest for you. Whenever the text that matches the given pattern appears on the web page, the extension alerts you with a voice note.

### Tabs

The extension when opened, adds the currently active tab to its list. You can add the desired tabs to the extension in this manner. The gray area displays the list of tabs. 

### RegEx

This is where you enter the pattern that needs to be searched on the web page. By default the extension is set to monitor the text *'go'* on the webpage. 

### Refresh

This checkbox when checked refreshes the web page on the selected tab after every *'track-rate'* seconds. If unchecked, there will be no refreshes.

### Ignore Case

With this box checked, the extension ignores the case of the text. For e.g if the text is *'go'*, then it will detect any case of the text like Go, GO, go, etc.

### Timer

You cannot have the extension to monitor the selected tab for an indefinite time. So in the timer field you specify the number of seconds for which the extension will monitor the tab.

### Track Rate

This is the time interval in seconds for which the extension will monitor the tab. For e.g, if it's set to 10, then after every 10 seconds, the extension will look for the text that matches the pattern in the web page.

### Voice Alert

After the timer is timed out, the system will give a voice feedback, saying **Timed Out!**

If the text becomes available on the web page, the system will give a voice alert saying **Hey, It's Available!!**

#### DISCLAIMER

Please test the extension first before using since it hasn't been gone through a rigorous testing.
