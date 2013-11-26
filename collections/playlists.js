Playlists = new Meteor.Collection('playlists');

Playlists.deny({
  update: function(userId, playlist, fieldNames) {
    if(isAdminById(userId))
      return false;
    // deny the update if it contains something other than the following fields
    return (_.without(fieldNames, 'postId', 'name').length > 0);
  }
});

Playlists.allow({
    insert: canPostById
  , update: canEditById
  , remove: canEditById
});

Meteor.methods({
  add_playlist: function(playlist){
    var user = Meteor.user(),
        userId = user._id,
        name = cleanUp(playlist.name),
        playlistId = '';

    // only let admins post as another user
//    if(isAdmin(Meteor.user()))
//      userId = post.userId || user._id;

    // check that user can post
    if (!user || !canPost(user))
      throw new Meteor.Error(601, i18n.t('You need to login or be invited to add new playlists.'));

    playlist = _.extend(playlist, {
      name: name,
      userId: userId
    });

    playlistId = Playlists.insert(playlist);

    // increment playlists count
    Meteor.users.update({_id: userId}, {$inc: {playlistCount: 1}});

    playlist = _.extend(playlist, {_id: playlistId});

    // var postAuthor =  Meteor.users.findOne(post.userId);

    // add the playlist's own ID to the playlist object and return it to the client
    playlist.playlistId = playlistId;
    return playlist;
  },
  update_playlist: function(playlist){
    var user = Meteor.user(),
        userId = user._id,
        resourceId = playlist.resourceId,
        playlistId = playlist.playlistId;

    // check that user can post
    if (!user || !canPost(user))
      throw new Meteor.Error(601, i18n.t('You need to login or be invited to add new playlists.'));

    //console.log(playlistId, resourceId);
    Playlists.update(
      {_id: playlistId},
      {$addToSet : { resourceIds : resourceId  }},
      {upsert: true});

    //console.log(playlistId);

    // add the playlist's own ID to the playlist object and return it to the client
    playlist.playlistId = playlistId;

    return playlist;
  },
  playlist_edit: function(post){
    // TODO: make post_edit server-side?
  },
  deletePlaylistById: function(postId) {
    // remove post comments
    // if(!this.isSimulation) {
    //   Comments.remove({post: postId});
    // }
    // NOTE: actually, keep comments afer all

    // decrement playlistt count
    var playlist = Playlists.findOne({_id: playlistId});
    if(!Meteor.userId() || !canEditById(Meteor.userId(), playlist)) throw new Meteor.Error(606, 'You need permission to edit or delete a post');
    
    Meteor.users.update({_id: playlist.userId}, {$inc: {playlistCount: -1}});
    Playlists.remove(playlistId);
  }
});
