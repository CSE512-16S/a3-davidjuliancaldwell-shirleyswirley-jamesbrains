# a3-davidjuliancaldwell-shirleyswirley-jamesbrains
===============

## Team Members

1. David Caldwell (davidjuliancaldwell)
2. Shirley Leung (shirleyswirley)
3. James Wu (jamesbrains)

## Visualization of Cellular Features and Breast Cancer Prognoses

![Thumbnail](vispreview.jpg)

Cancer is a leading cause of death worldwide. The WHO estimates that 8.2 million deaths were caused by cancer worldwide in 2012 (http://www.who.int/mediacentre/factsheets/fs297/en/).  One method for both diagnosis and prognosis in solid tumors is the assessment of the histologic characteristics of cancer cells obtained by a biopsy.

Dr. Wolberg from the University of Wisconsin, and Professor Olvi Mangasarian from the University of Wisconsin collaborated and collected breast mass tissue from fine needle aspiration. (http://pages.cs.wisc.edu/~olvi/uwmp/cancer.html) Visual characteristics such as radius, area, and others were assessed. A dataset was compiled and curated for patients, with diagnostic data to assess new cases, as well as prognostic data (disease free survival time, recurrence) with metrics assessing these histological samples across time. The idea was for experts in machine learning approaches to be able apply their techniques to be able to more accurately diagnosis patients, as well as to predict long term survival and recurrence.

We decided that this would be a fun data set to visualize because of the possibilities for interesting pictorial representations of patients and cells, in addition to the fact that the data itself are very well-curated and complete.

Our final visualization has 3 components, which all talk to each other. At the top, we have a parallel coordinates chart with lines (each corresponding to a different patient) colored by z-score according to the selected axis as well as reorderable and brushable axes.
Brushed data is then sent to our second component, which is a pictorial representation of patient's cells (in particular, their area and fractal dimension).
In this idealized represntation of patient cells, the cell in the middle encodes the median cell area and fractal dimension of the brush-selected patients, while the cells on either side of it encode the median individual standard deviations of cell area and fractal dimension among the same brush-selected patients (minus 1 z-score on the left, plus 1 z-score on the right).     
The brushed data is also sent to our third component, which is a sortable, colorable by nominal boolean variables pictorial representation of brush-selected patients. These nominalvariables include whether the patient died or survived and whether they underwent chemo or not.   
Our 3 components together help us to understand how observed cell properties are related to one another as well as how they can help predict and diagnose breast cancer outcomes.  

## Running Instructions

Access our visualization at http://cse512-16s.github.io/a3-davidjuliancaldwell-shirleyswirley-jamesbrains/ or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

## Story Board

?????Put either your storyboard content or a [link to your storyboard pdf file](storyboard.pdf?raw=true) here. Just like A2, you can use any software to create a *reasonable* pdf storyboard.

### Changes between Storyboard and the Final Implementation

Our final implementation ended up being very close to our original storyboard. We stuck to our original plan of having 3 components all talking to each other via brushing on our parallel coordinates component.

Along the way, there was a period of time where we had abandoned this idea because getting the brushing on the parallel coordinates to send out the subselected data to our other components was proving somewhat challenging. Instead, we were going to have sliders for multiple variables where the user could select the ranges of data they wanted to see and have a function to pass this filtered data to all of the components, which would be static, based on the min and max of each slider.   

In the end, we persevered and figured out how to get parallel coordinates brushing able to send the brushed data to our other components, so we were able to stick to our original plan. 

## Development Process

* Breakdown of how work was split among group members:
  * **James** created the idealized cell representation component to visually represent the variance and mean cell areas and fractal dimensions of the selected patients, which involved ...?????. 
  * **David** created the sortable boolean patient characteristic component, which involved ...?????
  * **Shirley** applied different capabilties of the parallel coordinates library to create the re-ordable, colored, and interactive components of the parallel coordinates component.
  * **Shirley** got the brushing on the parallel coordinates to talk to the other components.
  * **James** integrated all of the code together into one final tidy html page.
  * All 3 of us put together this writeup. 

* Time spent developing our application:
  * All 3 of us spent a couple hours deciding on which dataset to use and doing data exploration in Tableau on the dataset we finally decided on. 
  * All 3 of us spent a couple hours coming up with visualization ideas and storyboarding together.
  * **James** spent about ????? 
  * **David** spent about ?????
  * **Shirley** spent a couple hours working with and understanding the parallel coordinates library. She spent another couple hours figuring out how to filter and select read-in csv files. She spent another couple hours figuring out how to deal with brushed data and sending that between components. 

* Aspects taking the most time included:
  * DEBUGGING
  * Learning JavaScript and D3 from scratch, in general
  * Getting our components to talk to each other
