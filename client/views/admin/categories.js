Template.categories.helpers({
  categories: function(){
    return Categories.find();
  }
});

Template.categories.events({
  'click input[type=submit]': function(e){
    e.preventDefault();

    var name = $('#name').val();
    var parentCategory = $('#parentCategory').val();
    var isSubCategory = $('#isSubCategory').is(':checked');
    var slug = slugify(name);

    parentCategory = Categories.findOne({ 'name': parentCategory });

    if(!parentCategory && isSubCategory){
      throwError('All subtopics created must have a parent topic!');
    } else if(isSubCategory) {

      Meteor.call('category', {
        name: name,
        parentCategory: parentCategory,
        slug: slug
      }, function(error, categoryName) {
        if(error){
          console.log(error);
          throwError(error.reason);
          clearSeenErrors();
        }else{
          $('#name').val('');
        // throwError('New category "'+categoryName+'" created');
        }
      });

    } else {

      Meteor.call('category', {
        name: name,
        slug: slug
      }, function(error, categoryName) {
        if(error){
          console.log(error);
          throwError(error.reason);
          clearSeenErrors();
        }else{
          $('#name').val('');
        // throwError('New category "'+categoryName+'" created');
        }
      });
    }
  }
});
