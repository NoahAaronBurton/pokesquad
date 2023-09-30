$(document).ready(function() {
    var content = [
      { title: 'Clefairy' },
      { title: 'Pikachu' }
    ];
  
    $('.ui.search')
      .search({
        source: content,
      });
  });
  