Template.playlists_list.helpers({
  playlists : function () {
    return Playlists.find();
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

