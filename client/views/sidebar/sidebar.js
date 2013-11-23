Template.sidebar.helpers({
  categories : function() {
    return Categories.find();
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
    console.log(val);
    $("#categoryList > li").each(function() {
      if ($(this).text().search(val) > -1) {
          $(this).show();
      }
      else {
          $(this).hide();
      }
    });
  },
  'click .category-link': function(e){
    var parentCategory = $(e.target).text();
    var resCursor = Posts.find({ 'categories': { $in: [ parentCategory ] } });

    // { tags: { $in: ["appliances", "school"] } }
  }
});
