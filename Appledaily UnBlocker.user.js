// ==UserScript==
// @name         Appledaily UnBlocker
// @namespace    STW
// @version      1.0.1
// @description  unblock appledaily login
// @author       STW
// @match        http://*.appledaily.com/*
// @match        https://*.appledaily.com/*
// @grant        none
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://code.jquery.com/jquery-migrate-3.0.1.js
// ==/UserScript==

$.get(window.location.href, function(data) {
    $('.ndArticle_leftColumn').html($(data).find('.ndArticle_leftColumn').html().replace('userLogin = OMOSDK.auth().getUserInfo().isLoggedIn || false;', 'userLogin = true;'));
    unblock();
});

function unblock() {
    $('.ndPaywall').remove();
    $('.ndArticle_margin').show();
    $('.mediabox').show();

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