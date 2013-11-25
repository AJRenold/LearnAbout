Template.playlist_submit.helpers({
  user_id: function(){
    return Meteor.user()._id;
  }
});

Template.playlist_submit.rendered = function(){
}

Template.playlist_submit.events = {
  'click input[type=submit]': function(e, instance){
    e.preventDefault();

    $(e.target).addClass('disabled');

    if(!Meteor.user()){
      throwError(i18n.t('You must be logged in.'));
      return false;
    }

    var name = $('#name').val();
    var userId = $('#postUser').val();

    var properties = {
        name: name,
        userId: userId
    };

    Meteor.call('add_playlist', properties, function(error, playlist) {
      if(error){
        throwError(error.reason);
        clearSeenErrors();
        $(e.target).removeClass('disabled');
        if(error.error == 603)
          Router.go('/playlists/'+error.details);
      }else{
        trackEvent("new playlist", {'playlistId': playlist.playlistId});
      }
    });
  }
};
