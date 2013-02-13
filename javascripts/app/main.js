var main = function () {
  var twitter = new ctwitter.CTwitter();
  twitter.stream("statuses/filter", { track:["node.js"] }, function (stream) { //getting the stream
    stream.on("data", function(tweet) { // dealing with specific tweet
      $(".content").append("<p class='tweet'>"+tweet.text+"<p>");
    });
  });
  
}

$(document).ready(main);