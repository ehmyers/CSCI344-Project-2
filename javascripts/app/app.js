/* globals: $ */
var $ = window.$,
    jQuery = window.jQuery;

var main = function () {
    "use strict";

    var ctwitter = window.ctwitter,
        twitter = new ctwitter.CTwitter(),
        numTweets = 0,
        tweetTopic = "",
        tweetTotal = 0,
        tweetLength = 0,
        tweetAverage = 0;

    $("#user_input_button").click(function () {
        $("#tweets").hide();
        $("#tracked_info").hide();
        // add input to result div
        tweetTopic = ($("#user_input").val());
        //console.log(tweetTopic);

        twitter.stream("statuses/filter", { lang: "en", track: [tweetTopic] }, function (stream) {
            stream.on("data", function (tweet) {
                numTweets = numTweets + 1;
                $("<p>" + tweet.text + "</p>").prependTo("#tweets").hide().fadeIn(400);
                //
                // tracked information!
                // calculates average characters
                tweetLength = (tweet.text).length;
                tweetTotal = tweetTotal + tweetLength;
                tweetAverage = Math.round((tweetTotal + tweetLength) / numTweets);
                // actually adds number to page
                $("#tracked_info").html("<p>average characters per tweet: " + tweetAverage + "</p>");
                //
                // making sure there are only ten tweets on page
                if (numTweets > 10) {
                    // yo dawg, I heard you like $()
                    $($("#tweets").children()[10]).fadeOut(function () {
                        $(this).remove();
                    });
                } // ends the if loop
              //
            }); // ends the stream.on section
            $("<h2>" + tweetTopic + "</h2>").appendTo("header").hide().fadeIn(400);
        }); // ends twitter stream function

        // on submit, switch screens
        // hide first screen
        $("#interface_div").fadeOut();
        // show second screen
        $("#tweets").fadeIn();
        $("#tracked_info").fadeIn();

    }); // ends user input button click function

    // submits form on enter key?
    $("#user_input").keypress(function (e) {
        if (e.keyCode === 13) {    // 13 is the enter key
            $("#user_input_button").click();
        }
    });

    // uses jquery plugin, resizes h1 
    jQuery("h1").fitText();
};

$(document).ready(main);