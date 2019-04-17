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
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://code.jquery.com/jquery-migrate-3.0.1.js
// ==/UserScript==

(function () {
    $.ajax({
        url: window.location.href,
        type:'GET',
        success: function(data){
            $('.ndArticle_leftColumn').html($(data).find('.ndArticle_leftColumn').html());
            unblock();
        }
    });
})();

function unblock() {
    let bodyEle = document.getElementsByTagName('body')[0];
    let txt = bodyEle.innerHTML;
    while (txt.indexOf('display:none') !== -1) txt = txt.replace('display:none', '');
    bodyEle.innerHTML = txt;
    document.getElementsByClassName('ndPaywall')[0].style.display = "none";

    let videoTag = $('#videobox script:not(script[type="text/javascript"])');
    if (videoTag.length > 0 && $('#video_player').length === 0) {
        let videoURL = videoTag[0].innerText.split('videoUrl = ')[1].split(';')[0].replace(/[']/g, '').replace(/["]/g, '');

        let player = document.createElement('video');
        let vidSrc = document.createElement('source');

        player.height = 400;
        player.width = 711;
        player.controls = true;

        vidSrc.src = videoURL;
        vidSrc.type = 'video/mp4';

        player.appendChild(vidSrc);
        document.getElementById('videobox').appendChild(player);
        document.getElementById('videobox').style.paddingLeft = '30px';
    }
}