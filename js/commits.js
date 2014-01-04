jQuery(document).ready(function($) {
    updateNewsFeed('xxfracxx', 'PBA-WebSite', 'websiteCommits');
    updateNewsFeed('xxfracxx', 'PBA', 'commits');
});

function updateNewsFeed(user, repo, div) {
    var feed = $("#"+div);
    var maxLength = 20;

    feed.html("Loading commits...");
    $.get("https://api.github.com/repos/"+user+"/"+repo+"/commits", function(data) {
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

        feed.html(html+"</tbody></table>");
    });

}