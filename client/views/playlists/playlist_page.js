Template.playlist_page.helpers({
  playlist: function () {
    return Playlists.findOne(this.playlistId);
  },
  posts : function () {
    if (this.resourceIds) {
      posts = Posts.find({
        _id: { $in: this.resourceIds }
      });
      return posts;
    } else {
      return [];
    }
  }
});

Template.playlist_page.rendered = function(){
  if((scrollToCommentId=Session.get('scrollToCommentId')) && !this.rendered && $('#'+scrollToCommentId).exists()){
    scrollPageTo('#'+scrollToCommentId);
    Session.set('scrollToCommentId', null);
    this.rendered=true;
  }
  document.title = this.data.headline;
}
