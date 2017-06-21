const YouTube_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

let RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +// thumbnail
    '<a> href="http://youtube.com/watch?v=${videoId}"> +
    '<img link> </a>' +
    '<a class="js-result-name" href="" target="_blank"></a>' //by 
   	// '<a class="js-title" href="" target="_blank"></a></h2>' +
   	// '<p>Number of watchers: <span class="js-watchers-count"></span></p>' + 
    //'<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  '</div>'
);
let vidoeId = object.id.videoId
let videoThumbnail = object.snippet.thumbnais.medium.url
function getDataFromApi(searchTerm, callback) {
  var query = {
  	part: 'snippet',
  	key: 'AIzaSyAsg49O_ihb6En3k6NV0K-6e__l4XWZaBI',
    q: 'searchTerm',
    per_page: 5
  }
  $.getJSON(YouTube_SEARCH_URL, query, function(data) {console.log(data);});
}

