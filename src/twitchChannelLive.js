$.ajaxSetup({
    async: true
});

//reload page on press of most buttons
window.addEventListener('keydown', function(e) {
    //if key pressed is TAB, CTRL, 'E', 'T', enter
    if (e.keyCode == 9 || e.keyCode == 17 || e.keyCode == 69 || e.keyCode == 84 || e.keyCode == 13) {
        //pass
    } else {
        window.location.reload();
    }
});

var onlineChannels = [];
var i = 0;

//channelNames is an array taken from file 'channelList.js'; client_id is identification code to access twitch api
var twitchDotTvString = 'https://www.twitch.tv/';
finalString = '<br>';
while (i < channelNames.length) {

    $.getJSON('https://api.twitch.tv/kraken/streams/' + channelNames[i] + '?client_id=' + client_id + '&callback=?', function(channel) {

		if (channel["stream"] == null) {
			//console.log("not online:"+channelNames[i]);
		} else {
			var name = channel["_links"].self.replace('https://api.twitch.tv/kraken/streams/', '');
			onlineChannels = onlineChannels.concat(name);

			//display all channels from file channelList.js
			var numberOfLinksInRow = 4;
			var numberOfLinksInRowCounter = numberOfLinksInRow;
			i = 0;
			allChannels = '<p>';
			while (i < channelNames.length) {
				if (numberOfLinksInRowCounter == 0) {
					numberOfLinksInRowCounter = numberOfLinksInRow;
					allChannels = allChannels.concat('<a href=\"http://www.twitch.tv/' + channelNames[i] + '\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + channelNames[i] + '</a><br>');
				} else {
					numberOfLinksInRowCounter--;
					allChannels = allChannels.concat('<a href=\"http://www.twitch.tv/' + channelNames[i] + '\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + channelNames[i] + '</a>');
				}
				i++;
			}
			allChannels = '<font size = \"5\" color=\"#2515EE\"><id = \"das\" link=\"color:#5314EE;\" link=\"text-decoration:none;\">' + allChannels;
			allChannels = allChannels + '</font>';
			document.getElementById('loading').innerHTML = '<font size = "20">-----------------</font>';
			document.getElementById('loading').innerHTML += allChannels;
		}

	})
	.done(function(data) {
		
		if (i == channelNames.length) {
			if (onlineChannels.length > 3) {
				document.body.style.backgroundColor = "purple";
			} else if (onlineChannels.length > 0) {
				document.body.style.backgroundColor = "Indigo";
			} else {}
			finalString2 = ''
			$.each(data, function(index, value) {
				if (index != null && value != null) {
					try {
						if (value.preview.medium != null) {
							name = value.channel.display_name;
							//https://static-cdn.jtvnw.net/previews-ttv/live_user_custom_mods-640x360.jpg
							finalString2 += '<div align="left">' + ('<img src=\"' + value.preview.large + '\">' + '</img>') +
								'<a href=\"http://www.twitch.tv/' + name + '\">' + name + '</a>' +
								'<img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_' +
								name + '-320x180.jpg" alt="title" style="width:320px;height:180px;">' + '</div>';
						} else {
							return;
						}
					} catch (err) {
						return true;
					}
				} else {
					return;
				}
			});
			finalString2 = '<font size = \"20\" style=\"color:#231112;\">' + finalString2;
			finalString2 = finalString2 + '</font>';
			document.getElementById('listClass').innerHTML += finalString2;
		}
		
	}).fail(function(data) {
		
		console.log("fail:" + onlineChannels.join('') + ", i=" + i + ", data=" + data);
		showLive();
		
	})

    i++;

}