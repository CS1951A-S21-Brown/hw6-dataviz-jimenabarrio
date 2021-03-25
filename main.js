// Add your JavaScript code here

const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 230};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH/2) -10, graph_1_height = 700;
let graph_2_width = (MAX_WIDTH/2) -10 , graph_2_height = 300;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 500;

let filename = "data/netflix.csv";

let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)  
    .attr("height", graph_1_height)  
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);  

let countRef = svg.append("g");

d3.csv(filename).then(function(data) {
    var dict = [];
    for (d in data){
        var genres = data[d]['listed_in'];
        if (typeof genres == "string"){
            var res = genres.split(", ");
            for (i in res){
                var value = res[i];
                if (value in dict){
                    dict[value]++
                }
                else {
                    dict[value] = 1;
                }   
            }   
        }
    }
    var data = []
    for (i in dict){
        element = {}
        element.genre = i;
        element.count = dict[i];
        data.push(element);
    }
    data.sort((a,b) => b.count - a.count)

     let x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.count; })])
        .range([0, graph_1_width - margin.left - margin.right]);

     let y = d3.scaleBand()
        .domain(data.map(function(d) {return d["genre"];}))
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);  // Improves readability

     svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
    
    let color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d["genre"] }))
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), data.length));

    let bars = svg.selectAll("rect").data(data);
    bars.enter()
        .append("rect")
        .merge(bars) 
        .transition()
        .duration(1000)
        .attr("fill", function(d) { return color(d["genre"]) })  
        .attr("x", x(0))
        .attr("y", function(d) { return y(d["genre"]); })             
        .attr("width", function(d) { return x(d.count); })
        .attr("height",  y.bandwidth());


    let counts = countRef.selectAll("text").data(data);
    counts.enter()
        .append("text")
        .merge(counts)
        .attr("x", function(d) { return x(d.count) + 10; })     
        .attr("y", function(d) { return y(d.genre) + 10; })      
        .style("text-anchor", "start")
        .style("font-size", 10)
        .text(function(d) {return d.count;});

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
                                        ${(graph_1_height - margin.top - margin.bottom) + 15})`)       
        .text("Count");

    svg.append("text")
        .attr("transform", `translate(-175, ${(graph_1_height - margin.top - margin.bottom) / 2})`)       
        .style("text-anchor", "middle")
        .text("Genre");

// Add chart title
    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2}, ${-10})`)    
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .style("font-weight", "bold")
        .text("Number of Titles in Each Genre");


    

});



let svg1 = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width)     
    .attr("height", graph_2_height)    
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);   

let tooltip = d3.select("#graph2")    
    .append("div")
    .attr("class", "tooltip")

d3.csv(filename).then(function(data) {
    var dict = [];
    for (d in data){
        if (data[d]['type'] == "Movie"){
            var runtime = parseInt(data[d]['duration'].split(" min"));
            var release_year = data[d]['release_year']
            if (release_year in dict){
                dict[release_year].push(runtime) 
            }
            else {
                dict[release_year] = [runtime]
            }
            }   
    }
    var data = []
    for (i in dict){
        element = {}
        element.year = parseInt(i);
        element.average = d3.mean(dict[i]);
        data.push(element);
    }
    let x1 = d3.scaleLinear()
        .domain([d3.min(data, function (d) {return d.year}), d3.max(data, function (d) {return d.year})])
        .range([0, graph_2_width - margin.left - margin.right]);

    let y1 = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {return d.average}))
        .rangeRound([graph_2_height - margin.top - margin.bottom, 0]);

    let x1_axis = d3.axisBottom().scale(x1).tickFormat(d3.format("d"));
    
    svg1.append("g")
        .call(d3.axisLeft().scale(y1));

    var xAxisTranslate = graph_2_height - margin.top - margin.bottom;

    svg1.append("g")
            .attr("transform", "translate(0, " + xAxisTranslate  +")")
            .call(x1_axis);

    svg1.append("path")
        .datum(data)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x1(d.year); })
            .y(function(d) { return y1(d.average); })
            );

    svg1.append("text")
    .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2},
                                    ${(graph_2_height - margin.top - margin.bottom) + 40})`)      
    .style("text-anchor", "middle")
    .text("Release Year");

    svg1.append("text")
    .attr("transform", `translate(-120, ${(graph_2_height - margin.top - margin.bottom) / 2})`)      
    .style("text-anchor", "middle")
    .text("Average Runtime in Minutes");

    svg1.append("text")
        .attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2}, ${-20})`)       
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .style("font-weight", "bold")
        .text("Average Runtime of Movies by Release Year");

    let mouseover = function(d) {
        let html = `Release year: ${d.year}, Average duration: ${d.average.toFixed(0)}`;
        tooltip.html(html)
            .style("left", `${(d3.event.pageX) - 220}px`)
            .style("top", `${(d3.event.pageY) - 30}px`)
            .style("box-shadow", `2px 2px 5px DarkMagenta`)
            .transition()
            .duration(200)
            .style("opacity", 0.9);
    };

    let mouseout = function(d) {
        // Set opacity back to 0 to hide
        tooltip.transition()
            .duration(200)
            .style("opacity", 0);
    };

    let dots = svg1.selectAll("dot").data(data);
    dots.enter()
        .append("circle")
        .attr("cx", function (d) { return x1(d.year); })      
        .attr("cy", function (d) { return y1(d.average); })  
        .style("fill", "DarkMagenta")   
        .attr("r", 3)      
        .on("mouseover", mouseover) 
        .on("mouseout", mouseout)

    
});

//GRAPH 3

let svg2 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)     
    .attr("height", graph_3_height)    
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);    

let x = d3.scaleLinear()
    .range([0, graph_3_width - margin.left - margin.right]);

let y = d3.scaleBand()
    .range([0, graph_3_height - margin.top - margin.bottom])
    .padding(0.1);  

let countRef2 = svg2.append("g");

let y_axis_label = svg2.append("g");

svg2.append("text")
            .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2},
                                            ${(graph_3_height - margin.top - margin.bottom) + 15})`)       
            .style("text-anchor", "middle")
            .text("Number of Movies Working Together");

let y_axis_text = svg2.append("text")
    .style("text-anchor", "middle")
    .text("Director-Actor Pairs")
    .attr("transform", function() {return `translate(-175, ${(graph_3_height - margin.top - margin.bottom) / 2}),` + 'rotate(-90)';});

    
let title = svg2.append("text")
    .attr("transform", `translate(${(graph_3_width - margin.left - margin.right) / 2}, ${-10})`)       
    .style("text-anchor", "middle")
    .style("font-size", 18)
    .style("font-weight", "bold")

function SetData(num_examples){
    d3.csv(filename).then(function(data) {
        var dict = [];
        for (d in data){
            var directors = data[d]['director'];
            var cast = data[d]["cast"];
            if (data[d]["type"] == "Movie" && directors != [""] && cast != [""] && typeof cast == "string" && typeof directors == "string"){
                var director_array = directors.split(", ");
                var cast_array = cast.split(", ");
                for (i in director_array){
                    var director = director_array[i];
                    for (j in cast_array){
                        var pair = [director, " " + cast_array[j]];
                        if (pair in dict){
                            dict[pair]++;
                        }
                        else {
                            dict[pair] = 1;
                        }
                    }
            }
            }
        }

        var data = []
        for (i in dict){
            element = {}
            element.cast = i;
            element.count = dict[i];
            data.push(element);
        }
        data = data.sort((a,b) => b.count - a.count).slice(0,num_examples);
        console.log(data)
        let color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d["cast"] }))
        .range(d3.quantize(d3.interpolateHcl('#8562a3', "#d4a0a7"), data.length));

        x.domain([0, d3.max(data, function(d) { return d.count; })]);
        

        y.domain(data.map(function(d) {return d["cast"];}))
            

        y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        
        
        
        let bars = svg2.selectAll("rect").data(data);
        bars.enter()
            .append("rect")
            .merge(bars) 
            .transition()
            .duration(1000)
            .attr("fill", function(d) { return color(d["cast"]) })  
            .attr("x", x(0))
            .attr("y", function(d) { return y(d["cast"]); })           
            .attr("width", function(d) { return x(d.count); })
            .attr("height",  y.bandwidth());

        let counts = countRef2.selectAll("text").data(data);
        counts.enter()
            .append("text")
            .merge(counts)
            .attr("x", function(d) { return x(d.count) + 10; })       
            .attr("y", function(d) { return y(d.cast) + 15; })       
            .style("text-anchor", "start")
            .text(function(d) {return d.count;});

        
        
        
        title.text("Top " + num_examples + " Director-Actor Pairs");

        bars.exit().remove();
        counts.exit().remove();

    });

}

SetData(20);

