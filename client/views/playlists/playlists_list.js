Template.playlists_list.helpers({
  playlists : function () {
    if (this.userId) {
      return Playlists.find({userId: this.userId});
    } else {
      return Playlists.find({userId: { $ne: Meteor.user()._id }});
    }
  },
  user_id : function() {
    return Meteor.user()._id;
  },
  hasMorePlaylists: function(){
    // as long as we ask for N posts and all N posts showed up, then keep showing the "load more" button
    return parseInt(Session.get('playlistsLimit')) == this.playlistsCount
  },
  loadMoreUrl: function () {
  }
});

Template.playlists_list.rendered = function(){
  var distanceFromTop = 0;
  $('.playlist').each(function(){
    distanceFromTop += $(this).height();
  });
  Session.set('distanceFromTop', distanceFromTop);
  $('body').css('min-height',distanceFromTop+160);
}

Template.playlists_list.events = {
  'click input[type=submit]': function(e, instance){
    e.preventDefault();

    $(e.target).addClass('disabled');

    if(!Meteor.user()){
      throwError(i18n.t('You must be logged in.'));
      return false;
    }

    var name = $('#name').val();

    var properties = {
        name: name
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
