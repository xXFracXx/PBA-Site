var loading = false;

jQuery(document).ready(function($) {
    window.setInterval(updateNewsFeed, 30 * 1000);

    updateNewsFeed();
});

function updateNewsFeed() {
    if (loading) {
        return;
    }

    loading = true;
    var feed = $("#commits");
    var maxLength = 20;

    feed.html("Loading...");

    $.get("https://api.github.com/repos/xXFracXx/PBA/commits", function(data) {
        loading = false;
        var html = "<table class='table table-rounded table-striped table-bordered' style='width: 100%'>";

        for (var index = 0; index < data.length; index++) {
            commit = data[index];
            message = commit.commit.message;

            html += "<tr style='width: 20%'>";
            html += ("<td><img src='http://www.gravatar.com/avatar/" + commit.author.gravatar_id + "?s=16&d=mm'> "+commit.author.login +"</td>");
            html += "<td style='width: 60%'><a href='"+commit.html_url+"'>"+message+"</a></td>";
            html += "<td style='width: 20%'>"+jQuery.timeago(commit.commit.author.date)+"</td>";
            html += "</tr>";
        }

        feed.html(html+"</table>");
    });
}