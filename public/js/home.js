$(document).ready(function () {
    const searchResults = $("#searchResults");
    const savedResults = $("#savedResults");

    
    const searchResultTemplate = Handlebars.compile(`
        {{#each searchResults}}
        <div class="six wide column draggable" draggable="true">
            <div class="ui segment">
                <h2>{{this}}</h2>
            </div>
        </div>
        {{/each}}
    `);

    
    const savedResultTemplate = Handlebars.compile(`
        {{#each savedResults}}
        <div class="six wide column draggable" draggable="true">
            <div class="ui segment">
                <h2>{{this}}</h2>
            </div>
        </div>
        {{/each}}
    `);

  
    const sampleSearchResults = ["Result 1", "Result 2", "Result 3", "Result 4", "Result 5", "Result 6"];
    const sampleSavedResults = [];

    
    renderSearchResults(sampleSearchResults);
    renderSavedResults(sampleSavedResults);

    
    $(".draggable").on("dragstart", function (event) {
       
        event.originalEvent.dataTransfer.setData("text/plain", event.target.textContent);
    });

    
    savedResults.on("dragover", function (event) {
        event.preventDefault(); // Prevent the default behavior (prevents opening the dropped data as a URL)
    });

    savedResults.on("drop", function (event) {
        event.preventDefault();

  
        const draggedData = event.originalEvent.dataTransfer.getData("text/plain");

       
        sampleSavedResults.push(draggedData);

     
        renderSavedResults(sampleSavedResults);
    });

    
    function renderSearchResults(results) {
        const html = searchResultTemplate({ searchResults: results });
        searchResults.html(html);
    }

    
    function renderSavedResults(results) {
        const html = savedResultTemplate({ savedResults: results });
        savedResults.html(html);
    }
});
