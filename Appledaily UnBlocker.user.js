// ==UserScript==
// @name         Appledaily UnBlocker
// @namespace    STW
// @version      1
// @description  unblock appledaily login
// @author       STW
// @match        http://*.appledaily.com/*
// @match        https://*.appledaily.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    $('.ndPaywall').hide();
    $('.mediabox').show();
    $('.ndAritcle_headPic').show();
    $('.ndArticle_margin').show();

    let videoTag = $('#videobox script:not(script[type="text/javascript"])');
    if (videoTag.length > 0 && $('#video_player').length === 0) {
        let videoURL = videoTag[0].innerText.split('videoUrl = ')[1].split(';')[0].replace(/[']/g, '').replace(/["]/g, '');

        let player = document.createElement('video');
        let vidSrc = document.createElement('source');

        player.height = 444;
        player.width = 790;
        player.controls = true;

        vidSrc.src = videoURL;
        vidSrc.type = 'video/mp4';

        player.appendChild(vidSrc);
        $('#videobox')[0].appendChild(player);
    }
})();