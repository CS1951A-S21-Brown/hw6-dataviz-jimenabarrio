1. Describe how your dashboard answers the questions presented. You don't have to address every question directly, but should at a high level address the main questions. (10 points)
2. List 3 reasons why D3 was helpful and improved your visualization (6 points)
3. List 3 reasons why D3 would not be the best tool for creating a visualization (6 points)

I did the dashboard for the Netflix Collection. 
1. For the first question, I went through the genre of each title, split it into it's corresponding titles and then added the titles with a count to a dictionary. I then transformed the dictionary to an array and used a bar chart to represent all the different genres with the count corresponding to it. 
For the second graph, I used a line graph to represent the average runtime of movies grouped by release year. To do this, I went through the movies and stored all of the runtimes for a certain year in a dictionary. I then took an average and plotted a line graph. I added a tooltip for this graph so that when you hover over a point, the release year and average runtime will show up in a box next to the point. 
For the last graph I represented the top director-actor pairs. This graph shows the top 10 and top 20 director-actor pairs where the count is the number of movies where they worked together. For this graph I added two buttons to show either 10 or 20 top pairs. 

2. i. The different options D3 has to use color was very useful to make the graphs more appealing to the user. 
    ii. The tooltip is also very convenient if you want to look at the data in more detail you can access the values at all the different points. 
    iii. D3 is vary useful in the way it scales the bars so that when users look at them they can intuitively see the proportions between the different bars. 

3.  i. D3 is not the best tool because if you have to parse the data a lot before you can create a visualization it might difficult and not very efficient to use D3. 
    ii. From what I have used D3 I haven't seen anyways of making the graphs intuitive for blind people for example. So I think it might not be the best way to make accessible visualizations for all. 
    iii. Since D3 is not a graphics tool or a data processing library it can be confusing to use at first. Furthermore, a lot of lines of code are required to create a visualization so that can cause more trouble when creating a visualization. 


4. Evaluate the accessibility of your dashboard based on the readings in the “Before you begin” section. What kinds of users might find this dashboard accessible and who might have more difficulty? What additional actions might you take to make this dashboard more accessible to all audiences? Your response should refer to at least one of the readings and be about 1 paragraph.

This dashboard would not be accessible for blind people. I think that some color blind people could have some problems even though I check the colors to be okay for most types of color blindness. Something that could be done to make this dashboard more accessible is writing alt text for the different visualizations. This way, a blind person could have the screen reader read the alt text and understand what is being shown in the different graphs. Another way to improve the dashboard would be to add an svg markup so that the blind users can tab through the data points. 

5. Reflect on the stages of your design and implementation process when you could have taken steps to make your dashboard more accessible to all audiences. What are some factors that kept you from taking these steps? (a few sentences)
Some steps I could have taken to make my dashboard more accessible is to add an svg markup so that users with blindness or low vision can tab through the different data points. I could have also added a tooltip for every graph. This could be useful for people that find it hard to read graphs. Lastly, something I could have done is chose the colors so that all types of color blindness will distinguish the different colors. Some factors that kept me from taking these steps are the following:
Firstly, I am not comfortable at all with javascript, css, html or D3 and hence creating the basic visualizations was already a challenge for me. Thus, creating the svg markup was really complicated. I think that D3 has a lot of advantages but at the beginning it is difficult to use. Secondly, with respect to the colors, it was difficult to pick colors that would provide harmony but at the same time were visible by all types of color blindness.

