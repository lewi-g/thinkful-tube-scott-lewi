const YouTube_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

let RESULT_HTML_TEMPLATE = (`
  <div>
    <a class="js-result-name" href="">
      <img class="js-thumbnail" src="">
    </a>
  </div>
  `);

function getDataFromApi(searchTerm, callback) {
  var query = {
  	part: 'snippet',
  	key: 'AIzaSyAsg49O_ihb6En3k6NV0K-6e__l4XWZaBI',
    q: 'searchTerm',
    per_page: 5
  }
  $.getJSON(YouTube_SEARCH_URL, query, callback);
}

function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").attr("href", `http://youtube.com/watch?v=${result.id.videoId}`);
  template.find(".js-thumbnail").attr("src", `${result.snippet.thumbnais.medium.url}`)

  // template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);

  return template;
}

function displayYouTubeData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeData);
  });
}

$(watchSubmit);
