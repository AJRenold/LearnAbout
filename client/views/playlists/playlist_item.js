Template.playlist_item.created = function () {
  instance = this;
};

Template.playlist_item.helpers({
  playlist: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.playlist || this;
  },
  user_name: function() {
    return this.userName;
  }
});

Template.playlist_item.rendered = function(){
};

Template.playlist_item.events = {
  'click .clone-playlist': function(e){
    // using stopPropagation otherwise event is called twice
    e.stopPropagation();
    e.preventDefault();

    var playlistId = $(e.target).attr('id');
    var clickedPlaylist = Playlists.findOne({ '_id': playlistId });

    var properties = {
      name: clickedPlaylist.name,
      resourceIds: clickedPlaylist.resourceIds
    }

    Meteor.call('add_playlist', properties, function(error, playlist) {
      if(error) {
        throwError(error.reason);
        clearSeenErrors();
        if(error.error == 603)
          Router.go('/playlists/'+error.details);
      } else {
        trackEvent("cloned playlist", {'playlistId': playlist.playlistId});
      }
    });

  }
};
