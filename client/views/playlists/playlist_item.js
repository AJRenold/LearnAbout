Template.playlist_item.created = function () {
  instance = this;
};

Template.playlist_item.helpers({
  playlist: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.playlist || this;
  },
  pointsUnitDisplayText: function(){
    return this.votes == 1 ? i18n.t('point') : i18n.t('points');
  }
});

Template.playlist_item.rendered = function(){
};

Template.playlist_item.events = {
};
