
Template.videos.rendered = function() {
  $(function(){

    ///Initialize Youtube videos
    let videoElements = this.querySelectorAll(".video");
    console.log(videoElements);

    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = () => {
      //Vader ->  HMHieEjBjws

      function initPlayer(video, id) {
        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        return new YT.Player(id, {
          height: "300",
          width: "100%",

          // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
          videoId: video,

          // Events like ready, state change,
          events: {
            onReady: function (event) {
              // Play video when player ready.

              //  event.target.playVideo();
            }
          }
        });
      }

      for (let index in this.videoElements) {
        let video = this.videoElements[index];
        console.log(video);
        initPlayer(video.id, video.id);
      }

      // initPlayer("HMHieEjBjws", "player-1");
      // initPlayer("4JdUY6AyOeY", "player-2");
      // initPlayer("jnWExnEre1Y", "player-3");

    };

    YT.load();

  });
}

Template.videos.helpers({
  videoTags: function() {
    return ["HMHieEjBjws", "4JdUY6AyOeY", "jnWExnEre1Y", "UXhfQZQ3N4c","yaS_BbRY0gU","iCcNj2YmFiI", "eXYdHroGaZY", "1lIdiKEW0b8", "tXIBjJkc4J8"];
  }
});