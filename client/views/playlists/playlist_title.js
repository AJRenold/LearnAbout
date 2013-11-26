Template.playlist_title.created = function () {
  instance = this;
};

Template.playlist_title.helpers({
  playlist: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.playlist || this;
  }
});

Template.playlist_title.rendered = function(){
};

Template.playlist_title.events = {
};
