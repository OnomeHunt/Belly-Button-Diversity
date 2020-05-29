const json_url = "../../samples.json";

const bio_data = d3.json(json_url);

// console.log(bio_data);

var data = bio_data;

function InitDashboard() {
    console.log("Initializing Dashboard");
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((instanceID) =>
            selector.append("option")
                .text(instanceID)
                .property("value", instanceID));

        var instanceID = sampleNames[0];

        Bargraph(instanceID);
        BubbleChart(instanceID);
        Guage(instanceID);
        ShowMetadata(instanceID);
    });
}

InitDashboard();

function BubbleChart(instanceID) {

    console.log(`Calling BubbleChart ${instanceID}`);
 

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == instanceID);

        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var bubbleData = {
            x: otu_ids.slice(0, 10).reverse(),
            y: sample_values.slice(0, 10).reverse(),
            type: "scattergl",
            mode: "markers",
            marker: {
                size: sample_values.slice(0, 10).reverse(),
                 color: otu_ids.slice(0, 10).reverse()
                
            },
            text: otu_labels.slice(0, 10).reverse()
        };

        bubbleArray = [bubbleData];

        var bubbleLayout = {
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });

}

function Bargraph(instanceID) {

    console.log(`Calling Bargraph ${instanceID}`);

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == instanceID);

        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h",
            marker: {
                color: 'rgb(142,124,195,195,195,195,195,195,195,195)'
              }
        };

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
            
        };

        Plotly.newPlot("bar", barArray, barLayout);


    });

}

function ShowMetadata(instanceID) {

    console.log(`Calling ShowMetadata ${instanceID}`);

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == instanceID);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `${key}: ${value}`;
            PANEL.append("h6").text(textToShow);
        });
    });

}

function Guage(instanceID) {
    console.log(`Calling Guage ${instanceID}`);
}

function optionChanged(newinstanceID) {
    console.log(`User selected ${newinstanceID}`);

    BubbleChart(newinstanceID);
    Bargraph(newinstanceID);
    ShowMetadata(newinstanceID);
    Guage(newinstanceID);
}


