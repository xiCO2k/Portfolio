Albums.allow({
      insert: function(userId) {
        return isAdminById(userId);
      },
      update: function(userId) {
        return isAdminById(userId);
      },
      remove: function(userId) {
        return isAdminById(userId);
      },
      fetch: []
    });

Meteor.publish("album", function (id, options) {
    // if (!isAdminById(this.userId)) 
    //     throw new Meteor.Error(403, 'Permission denied'); 
    if (!! options && !! id) 
        return Albums.find({ _id: id }, options);
    if (!! id)
        return Albums.find({ _id: id });
});

Meteor.publish("albums", function(options) {
    // if (!isAdminById(this.userId)) 
    //       throw new Meteor.Error(403, 'Permission denied'); 
    return Albums.find({}, options);
});

Meteor.methods({
    removeAlbums: function (albums) {
      if (!isAdmin()) 
          throw new Meteor.Error(403, 'Permission denied'); 
      Albums.remove({_id: { $in: albums }});
    },
    createAlbum: function (content) {
        if (!isAdmin()) 
            throw new Meteor.Error(403, 'Permission denied'); 
        var dataObj = { 
                        'description': '',
                        'slug': '',
                        'title': '',
                        'isVisible': 1,
                        'lastModified': null
                        };
        if (!! content)
            dataObj.content = content;
        var albumId = Albums.insert(dataObj); 
        if (albumId) 
            return albumId;
                
    },
    updateAlbum: function (album) {
        if (!isAdmin()) 
            throw new Meteor.Error(403, 'Permission denied');

        var slug = album.slug;
        if (! slug) { // if a slug was not provided, create one from the title
          slug = albumFuncs.slugify(album.title); 
        }

        slug = albumFuncs.getUniqueSlug(album.id, slug); // this makes sure the slug is unique, increments if it is not

        var dataObj = { 
                      'content': album.content,
                      'description': album.description,
                      'slug': slug,
                      'title': album.title,
                      'isVisible': album.isVisible,
                      'lastModified': (new Date()).getTime()
                      };

        try {
              Albums.update({ _id: album.id },  
                  { $set: dataObj}
              );
              // _.each(album.content, function (c) {
              //     c.id, search and update metadata.albums
              //     Media.update({_id: c.id}, { $push: { "metadata.albums": album.id }}); 
              // });
        } catch (err) {
            mongoError (err);
        }

    },
    removeFromAlbums: function (itemId) {
        if (!isAdmin()) 
            throw new Meteor.Error(403, 'Permission denied'); 
        Albums.update({ 'content.id': itemId },  
                         { $pull: { content: {'id': itemId} }}
        );
    },
    removeUnusedAlbums: function () {
        if (!isAdmin()) 
            throw new Meteor.Error(403, 'Permission denied'); 
        Albums.remove({ slug: "" });
    }
});