//1. stateObject = results
//2. state manipulation functions
//3. render functions
//4. event listener

const stateObject = {
	items: []
}

// state manipulation functions
//const YouTube_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

let RESULT_HTML_TEMPLATE = (`
  <div>
    <a class="js-result-name" href="">
      <img class="js-thumbnail" src="">
      <h2 class="title"> </h2>
    </a>
  </div>`)
 

// function to add to state before displaying it 



function displayYouTubeData(data)/* find data from state*/ {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}



// 3 render functions
function renderResult(result) {
	let videoId = `http://youtube.com/watch?v=${result.id.videoId}`;
	let thumbnail =  `${result.snippet.thumbnails.medium.url}`;
	let title = `${result.snippet.title}`
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").attr("href", videoId );
  template.find(".js-thumbnail").attr("src", thumbnail);
  template.find('.title').text(title);
  // template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);

  return template;
}


// 4 Event listener functions
function getDataFromApi(searchTerm, callback, endpointUrl) {
  var query = {
  	part: 'snippet',
  	key: 'AIzaSyAsg49O_ihb6En3k6NV0K-6e__l4XWZaBI',
    q: searchTerm,
    per_page: 5
  }
  $.getJSON(endpointUrl, query, callback);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    const youTubeUrl = $(event.currentTarget).attr('action')
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeData, youTubeUrl);
  });
}

$(watchSubmit);
