
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    const URL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=';

    // var street =  $('#form-container').children('input')[0];
    // var city =  $('#form-container').children('input')[1];
    var valOfStreet = $('#street').val();
    var valOfCity = $('#city').val();
    if (!valOfStreet || !valOfCity) {
        $('h2').text('Hey, You need to type something!');
    } else {
        const url = `${URL}${valOfStreet}, ${valOfCity}`;
        // console.log(valOfStreet, valOfCity);
        $('body').append('<img />');
        $('img').addClass('bgimg').attr('src', url);
        $('h2').text(`So, you want to live at ${valOfStreet}, ${valOfCity}?`);
    }

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
