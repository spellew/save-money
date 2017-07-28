
var sqoot_url;
var page_num = 1;

function user_location() {
    document.getElementById("location").disabled = false;    
    document.getElementById("location").value = "";
    document.getElementById("query").value = "";
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
        function showPosition(position) {
            document.getElementById("location").disabled = true;
            document.getElementById("location").value = $.param({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    	}
    }
}

function display_deals() {
    sqoot_url = {
                api_key: "yux7i8",
                page: page_num,
                per_page: "10",
                radius: "10",
                online: false,
                category_slugs: [ ],
                provider_slugs: [ ],
                updated_after: Date(),
                order: "updated_at_desc", 
            };
    sqoot_url.location = document.getElementById("location").value;
    sqoot_url.query = document.getElementById("query").value;
    sqoot_url = "https://api.sqoot.com/v2/deals?" + $.param(sqoot_url);
    console.log(sqoot_url);
    $.getJSON(sqoot_url, function() {}).done(function(sqoot) {      
    	document.getElementById("query_query").innerHTML = "Searched for: " + sqoot.query.query;
    	document.getElementById("query_total").innerHTML = "Total: " + sqoot.query.total;
        document.getElementById("query_perpage").innerHTML = "Results per page:" + sqoot.query.per_page;          
        document.getElementById("query_radius").innerHTML = "Radius:" + sqoot.query.radius;
        for (var i = 0; i < sqoot.query.per_page; i++) {
            $("#main").append(
                "<div class='row removable'>" +
                "<div class='cell removable'><a class='removable' href='" + sqoot.deals[i].deal.untracked_url +
                "'>" + sqoot.deals[i].deal.short_title + "</a></div>" +
                "<div class='cell removable'><p>" + sqoot.deals[i].deal.merchant.name + "</p></div>" +
                "<div class='cell removable'><p>" + "$" + sqoot.deals[i].deal.price + "</p></div>" +
                "</div>"
                );}
        $("#results").append("<div class='table removable'><div class='row removable'><div class='cell removable'><a class='removable' onclick='decrement_page();clear_results();display_deals();'> Back </a></div>"
            + "<div class='cell removable'><p class='removable' id='query_page'>Page: " + sqoot.query.page + "</p></div>" +
        "<div class='cell removable'><a class='removable' onclick='increment_page();clear_results();display_deals();'> Next </a></div></div>");
    }).fail(function() {}).always(function() {
    });
}

function slide_left() {
    $("#initial").animate({marginLeft:"-150%"},1050);
    $("#results").animate({marginRight:"0%"},1050, display_deals);
}

function slide_right() {
    $("#initial").animate({marginLeft:"0%"},1050);
    $("#results").animate({marginRight:"-150%"},1050);
    document.getElementById("query").value = "";
    sqoot_url = "";
    page_num = 1;
    clear_results();
}

function clear_results() {
    $( ".removable" ).remove();
}

function increment_page() {
    page_num++;
}

function decrement_page() {
    page_num--;
}