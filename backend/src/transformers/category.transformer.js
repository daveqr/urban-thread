function transformCategory(category) {
    return {
      name: category.name,
      description: category.description,
      editionName: category.edition ? category.edition.name : null
    };
  }
  
  module.exports = {
    transformCategory
  };
  