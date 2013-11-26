Template.playlist_add_item.created = function () {
  instance = this;
};

Template.playlist_add_item.helpers({
  playlist: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.playlist || this;
  }
});

Template.playlist_add_item.rendered = function(){
};

Template.playlist_add_item.events = {
};
