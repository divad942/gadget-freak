$('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
    }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
});

$('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$( "#login-form" ).submit(function( event ) {
    if ( $( "input:first" ).val() != "admin"  ) {
        $( "#username-login" ).text( "Wrong username!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }

    if ( $( "input:eq(1)" ).val() != "admin"  ) {
        $( "#password-login" ).text( "Wrong password!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
});

$( "#recover-form" ).submit(function( event ) {
    if ( $( "#emailRecover").val().indexOf("@") == -1  ) {
        $( "#email-recover" ).text( "Wrong email!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
});

$( "#register-form" ).submit(function( event ) {
    if ( $( "#usernameRegister" ).val().length < 2  ) {
        $( "#username-register" ).text( "At least 3 symbols!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
    if ( $( "#emailRegister").val().indexOf("@") == -1  ) {
        $( "#email-register" ).text( "Wrong email!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
    if ( $( "#passwordRegister" ).val().length < 6  ) {
        $( "#password-register" ).text( "At least 6 symbols!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
    if ( $( "#confirm-passwordRegister" ).val() != $("#passwordRegister").val() ) {
        $( "#password-confirm-register" ).text( "Passwords do not match!").show().delay(5000).fadeOut(500);
        event.preventDefault();
    }
});

$("#submitPost").click(function () {
    var title = $('#newTitle').val();
    var image = $('#newImage').val();
    var text = $('#newMessageBody').val();

    if( title.length == 0 || image.length == 0 || text.length == 0 ){
        $('#postHelper').text('Missing data');
    }else {
        $('#new-blog-post-helper').after(" <div class=\'row blog-post\'  style=\' padding-top: 20px\'>        <!-- First Blog Post -->        <div class=\'container\'>            <div class=\'col-lg-12\' style=\'background-color: #ffffff\'>            <h3>                <a href=\'#\' class=\'blog-title\'>"+ title + "</a>            </h3>            <p><i class=\'fa fa-clock-o\'></i> Posted on November 19, 2015 at 10:00 PM</p>            <hr>            <a href=\'blog-post1.html\'>                <img class=\'img-responsive img-hover\' src=\'"+image+"' alt=\'\'>            </a>            <br>            <p>"+ text +"</p>            <a class=\'btn btn-read-more\' href=\'#'>Read More <i class=\'fa fa-angle-right\'></i></a><a class=\'btn btn-remove pull-right deletePost\' href=\'#\' style=\'height: 30px;\'><i class=\'fa fa-trash-o fa-lg\'></i></a></div></div></div>");
        $('#addPost').modal('hide');
        $(".deletePost").click(function (e){
            console.log("tst");
            var tmp = $(this).parent().parent().parent();
            console.log(tmp);
            tmp.remove();
            if($("body").find(".blog-post").length == 0){
                $(".pager").remove();
            }
        });
    }
});

$(".deletePost").click(function (e){
    console.log("tst");
    var tmp = $(this).parent().parent().parent();
    console.log(tmp);
    tmp.remove();
    if($("body").find(".blog-post").length == 0){
        $(".pager").remove();
    }
});

$('#add-comment').click(function () {
    var text = $('#comment-text').val();
   if( text != 0){
       console.log(text);
       $('#comment-list').append('<li>    <div class=\'commenterImage\'>        <img src=\'http://lorempixel.com/50/50/people/2\' />    </div>    <div class=\'commentText\'>        <p class=\'\'>'+ text +"</p> <span class='date sub-text'>on March 20th, 2015</span>    </div></li>")
       $('#comment-text').val("");
   }
});

/* google maps */
var map;
var infowindow;
function initMap() {
    navigator.geolocation.getCurrentPosition(function(position){
        var myLocation = {lat: position.coords.latitude, lng: position.coords.longitude};

        map = new google.maps.Map(document.getElementById('map'), {
            center: myLocation,
            zoom: 13
        });

        infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: myLocation,
            radius: 10000,
            types: ['electronics_store']
        }, callback);
    });
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}