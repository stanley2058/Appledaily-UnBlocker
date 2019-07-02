// ==UserScript==
// @name         Appledaily UnBlocker
// @namespace    STW
// @version      1.0.2
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
    let html = $(data).find('.ndArticle_leftColumn').html();
    let article = $(data).find('.ndArticle_margin').html();

    if (html == undefined || article == undefined) return;
    let token = article.split('document.createElement("')[1].split('");')[0];
    article = article.replace(`<${token}>`, '').replace(`</${token}/>`, '');
    html = html
        .replace('userLogin = OMOSDK.auth().getUserInfo().isLoggedIn || false;', 'userLogin = true;')
        .replace(' || omoUserType != 2', '')
        .replace('visibility: hidden;', '')
        .replace('document.createElement', 'document.createElement("placeholder"); //')
        .replace('<div class="ndAritcle_headPic" style="visibility: hidden;">', '<div class="cp_ndAritcle_headPic" style="overflow: hidden; text-align: center; background-color: #f7f7f7;">');

    $('.ndArticle_leftColumn').html(html);
    $('.ndArticle_margin').hide();

    let newDiv = document.createElement('div');
    newDiv.style.marginTop = "25px";
    let newP = document.createElement('p');
    newP.style.fontSize = "20px";
    newP.style.lineHeight = "35px";
    newP.style.marginBottom = "25px";
    newP.innerHTML = article;
    newDiv.appendChild(newP);
    document.querySelector('.ndArticle_content').appendChild(newDiv);

    let img = document.querySelector('.cp_ndAritcle_headPic img');
    if (img) {
        img.style.display = "inline-block";
        img.style.maxWidth = "100%";
    }
    let videoTag = $('#videobox script:not(script[type="text/javascript"])');
    if (videoTag.length > 0 && $('#video_player').length === 0) {
        let videoURL = videoTag[0].innerText.split('videoUrl = ')[1].split(';')[0].replace(/[']/g, '').replace(/["]/g, '');
        console.log(videoURL);

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
});