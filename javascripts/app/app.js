/* globals: $ */

var main = function () {
    "use strict";

    var twitter = new ctwitter.CTwitter();
    var numTweets = 0;
    var tweetTopic = "";
    // tracking something variables
    var tweetLength = "";
    var tweetAverage = "";

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
                // tracked information
                // calculates average characters
                tweetLength = ("" + tweet.text).length;
                //console.log(tweetLength);
                tweetAverage = Math.round((tweetAverage + tweetLength) / numTweets);
                //console.log(tweetAverage);
                console.log(tweet);
                // actually adds number to page
                $("<p>average characters per tweet: " + tweetAverage + "</p>").html("#tracked_info");
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
}

$(document).ready(main);