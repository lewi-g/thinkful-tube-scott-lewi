//1. stateObject = results
//2. state manipulation functions
//3. render functions
//4. event listener

const stateObject = {
	items: []
}

// state manipulation functions
//const YouTube_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";




// function to add to state before displaying it
function storeData(state, data) {
	state.items = data.items
	displayYouTubeData(state)
	console.log(stateObject);
}

// 3 render functions
function displayYouTubeData(state)/* find data from state*/ {
  var results = state.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

let RESULT_HTML_TEMPLATE = (`
  <div>
    <a class="js-result-name" href="">
      <img class="js-thumbnail" src="">
      <h2 class="title"> </h2>
    </a>
		<a class="channel-url" href="">
			<h4 class="channel-name"></h4>
		</a>
  </div>`);

function renderResult(result) {
	let channelName = `${result.snippet.channelTitle}`;
	let channelId = `http://youtube.com/channel/${result.snippet.channelId}`
	let videoId = `http://youtube.com/watch?v=${result.id.videoId}`;
	let thumbnail =  `${result.snippet.thumbnails.medium.url}`;
	let title = `${result.snippet.title}`
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").attr("href", videoId );
  template.find(".js-thumbnail").attr("src", thumbnail);
  template.find('.title').text(title);
	template.find('.channel-url').attr("href", channelId);
	template.find('.channel-name').text(channelName);

  // template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);

  return template;
}


// 4 Event listener functions
function getDataFromApi(searchTerm, callback, endpointUrl) {
  var query = {
  	part: 'snippet',
  	key: 'insert your key here',
    q: searchTerm,
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
