var main = function () {

    var twitter = new ctwitter.CTwitter();
	var numTweets = 0;
    var tweetTopic = "hello";

    //$("#user_input_button").click(function() {
        // add input to result div
        //tweetTopic = ("#user_input").val();
        //console.log(("#user_input").val());
    //}

	twitter.stream("statuses/filter", { lang:"en", track:[tweetTopic] }, function (stream) {
		stream.on("data", function (tweet) {
  		numTweets += 1;
			$("<p>" + numTweets + ". " + tweet.text + "</p>").prependTo("#tweets").hide().fadeIn(400);

    	// making sure there are only ten tweets on page
    	if(numTweets > 10) {
    		// yo dawg, I heard you like $()
    		$($("#tweets").children()[10]).fadeOut(function() {
    			$(this).remove();
    		});
    	}
	  });
	});
}

$(document).ready(main);