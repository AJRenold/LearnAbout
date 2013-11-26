Template.playlist_item.created = function () {
  instance = this;
};

Template.playlist_item.helpers({
  playlist: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.playlist || this;
  },
  user_name: function() {
    return getDisplayNameById(this.userId);
  }
});

Template.playlist_item.rendered = function(){
};

Template.playlist_item.events = {
};
