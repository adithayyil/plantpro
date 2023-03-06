$(document).ready(function () {
    const KEY = "sk-adcL640359a57182a158";

    // Updates selected dropdown value
    $('.dropdown-item').click(function () {
        var value = $(this).data('value');
        var dropdown = $(this).closest('.dropdown').find('.dropdown-toggle');
        dropdown.text(value);
    });

    // Runs when form is submitted
    $("#search-form").submit(function (event) {
        var filterParam = "";

        // Prevents the form from submitting normally
        event.preventDefault();

        // Get the search query from the user input
        var query = $("#search-input").val();

        // Get all selected values from the dropdowns
        var locationSelection = $("#location-dropdown").text().trim();
        var toxicitySelection = $("#toxicity-dropdown").text().trim();
        var edibilitySelection = $("#edibility-dropdown").text().trim();

        // Create the filter parameter based on the selected dropdown values
        if (locationSelection === "Indoor") {
            filterParam += "&indoor=1";
        } else if (locationSelection === "Outdoor") {
            filterParam += "&indoor=0";
        }
        if (toxicitySelection === "Poisonous") {
            filterParam += "&poisonous=1";
        } else if (toxicitySelection === "Non-Poisonous") {
            filterParam += "&poisonous=0";
        }
        if (edibilitySelection === "Edible") {
            filterParam += "&edible=1";
        } else if (edibilitySelection === "Non-Edible") {
            filterParam += "&edible=0";
        }


        // Make the API request with the search query and filter parameter
        fetch(`https://perenual.com/api/species-list?&key=${KEY}&q=${query}${filterParam}`)
            .then(response => response.json())
            .then(response => {
                // Clear previous search results
                $("#results").empty();

                // Handle when no data is returned
                if (response.data.length == 0) {
                    $("#results").append("<p> No Results! :(" + "</p>");
                }

                // Searches for each value in all data keys
                Object.keys(response.data).forEach(function (key) {

                    // Gets image and embeds src link into html then appends into results imageContainer
                    const imageLink = response.data[key].default_image.small_url;
                    const imageContainer = $("<div></div>");
                    const image = $("<img></img>");
                    image.attr("src", imageLink);
                    imageContainer.append(image);

                    // Gets all other data and appends into the results div
                    $("#results").append("<h2>" + response.data[key].common_name + "</h2>");
                    $("#results").append(imageContainer);
                    $("#results").append("<p> Cycle: " + response.data[key].cycle + "</p>");
                    $("#results").append("<p> Watering: " + response.data[key].watering + "</p>");
                    $("#results").append("<p> Sunlight: " + response.data[key].sunlight[0] + "</p>");  // TODO: Loop through array

                    $("#results").append("<hr>");

                })
            });
    });
});