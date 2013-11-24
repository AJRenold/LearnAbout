Template.sidebar.helpers({
  categories : function() {
    return Categories.find();
  }, 
  isSubMenu : function() {
    var isSubMenu;
    if(Session.get('categorySlug')){
      isSubMenu = true;
    } else {
      isSubMenu = false;
    }
    return isSubMenu;
  },
  currentParent : function() {
    return Session.get('categorySlug');
  },
  postCategories : function(){
    parent = Session.get('categorySlug');
    var posts = Posts.find({ categories: { $elemMatch: { slug: parent } } });
    subCategories = [];
    posts.forEach(function(post){
      _.each(post.categories, function(cat){
        if(cat.slug !== parent)
          subCategories.push(cat);
      });
    });
    return subCategories;
  }

});

Template.sidebar.events({
	'click .sidebar-toggle': function(e){
    e.preventDefault();
		$('body').toggleClass('sidebar-open');
	},
  'keyup, search, .filter-field': function(e){
    e.preventDefault();
    var val = $(e.target).val();
    $("#categoryList > li.category-item").each(function() {
      if ($(this).text().search(val) > -1) {
          $(this).show();
      }
      else {
          $(this).hide();
      }
    });
  },
  'click .home a': function(e){
    Session.set('subCategories', []);
  },
  'click .category-link': function(e){

    var categoryName = $(e.target).text();
    subCategories = Session.get('subCategories');
    if(subCategories.length !== 0){
      e.preventDefault();
    }
    
    idx = _.indexOf(subCategories, categoryName);
    if(idx !== -1){
      subCategories.splice(idx, 1);
    } else {
      subCategories.push(categoryName);
    }
      //$(e.target).parent().toggleClass('category-selected');
    Session.set('subCategories', subCategories);

    // { tags: { $in: ["appliances", "school"] } }
  }
});
