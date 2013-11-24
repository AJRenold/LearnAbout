Template.sidebar_item.helpers({
  categoryLink: function () {
    return getCategoryUrl(this.slug);
  },
  categorySelected: function (){
    subCategories = Session.get('subCategories');
    if(_.indexOf(subCategories, this.name) !== -1 && subCategories.length > 1){
      return "category-selected";
    }
  }
});
