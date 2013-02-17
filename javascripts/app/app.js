var main = function () {

  var twitter = new ctwitter.CTwitter();
  var numTweets = 0;
  var tweetTopic = "";
  // tracking something variables
  var tweetGender = "";
  var maleTweets = "";
  var femaleTweets = "";

  $("#user_input_button").click(function () {
    $("#tweets").hide();
    $("#tracked_info").hide();
    // add input to result div
    tweetTopic = ($("#user_input").val());
    console.log(tweetTopic);

    twitter.stream("statuses/filter", { lang: "en", track: [tweetTopic] }, function (stream) {
      stream.on("data", function (tweet) {
        numTweets += 1;
        $("<p>" + tweet.text + "</p>").prependTo("#tweets").hide().fadeIn(400);
        
        // tracked information
        // console.log(tweetGender);
        // if (tweetGender === "m") {
        //	 maleTweets += 1;
        // }
        // else if (tweetGender === "f") {
        //	 femaleTweets += 1;
        // }
        // $("<p>Male tweeters: " + maleTweets + " Female tweeters: " + femaleTweets + 
        //	"</p>").appendTo("#tracked_info").hide().fadeIn(400);

        // making sure there are only ten tweets on page
        if (numTweets > 10) {
          // yo dawg, I heard you like $()
          $($("#tweets").children()[10]).fadeOut(function () {
            $(this).remove();
          });
        } // ends the if loop
        
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

  // submits form on enter key?  figure out how to make this work.
  function keydownHandler(e) {
    if (e.keyCode == 13) {  // 13 is the enter key
    }
  }

  // uses jquery plugin, resizes h1 
  jQuery("h1").fitText();
}

$(document).ready(main);