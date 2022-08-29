# Web-application-to-track-and-predict-Covid-19-cases
## Overview

Due to the wave of the Covid-19 epidemic and the many cases that are infected daily in various parts of the world, the need has arisen to track and predict the numbers of patients and cases of recovery as well and predict them to know when the waves of infection may occur and thus can be avoided.

## System Design
The pattern that will be used is the Model-view-controller pattern (MVC pattern).<br>
This is done to separate internal representations of information from the way’s information is presented to, and accepted from, the user. It decouples components and allows efficient code reuse. This pattern is mainly used in web applications as it supports the presentation of the same data in different ways with changes made in one representation shown in all of them.<br>

**Model**: will take the data from the official resources (such as WHO and CDC) and synchronized frequently.<br>

**View**: the system will view the results in many ways, it can be presented as statistical charts from the data given from the resources, we can also present the conclusions that given from the analysis of the data and the predictions as charts and numbers.<br>

**Controllers**: in the interface, it starts with two lists, one to choose a country and another to choose the data user want to show whether deaths, confirmed or recovered cases. When you select a country from the list, the statistics will turn to view what is related to this country starting from when the virus found in the country and calculate the updated spread rate R0.<br>
The following figure Shows the Design:<br>
<p align="center">
<img src="https://user-images.githubusercontent.com/61471857/187253049-19fb3dee-50e2-454f-af4e-907abe0b5cc0.jpg" />


### System Views:
A- **Logical view**:  the system should get data about coronavirus from external sources (such as WHO and CDC) via the internet and categorize it into countries; every country contains cases, deaths, recovery cases, etc... when a country is chosen, it visualizes its data like statistics<br>

B- **Process view**: during the process, the system will take the data from the sites and organize it as statistics; the data of each country is saved as tables in the backend. In the front end, the system will show total cases, deaths, etc., and view the curves of growth. When a specific country is chosen, the system will get its statistics and change it with the previously shown one.<br>

C- **Physical view**: as the application is a web application; it can be opened from any physical device; however, in the backend, we need big space provided by the data providers (it’s not strongly related to the system as the system will use only the data that required one by one, the system don’t need to store all the data as long there is an internet connection) <br>

D- **Development view**: the development can be in two ways:
Backend development: can increase the sources of data (to guarantee accuracy) and add new features. Make the website faster and make it more responsive and use more complicated mathematical models to make new conclusions as we did to calculate the spread rate.
 Frontend development: can make it more user-friendly and view more conclusions and suggest treatments in the future (visualization engines). Also, we can add new options such as offering a number of health intuitions in every country and a hotline and giving some advice about the case.<br>
 
 ## User Story
 1) The user enters the site and chooses the country he wants to search for, and then chooses the search criteria: such as the current injured, recovery cases, or deaths.<br>
 2) The wesite uses Live API  "https://api.covid19api.com/" That gets many information about corona status now. <br>
 3) A screen appears with a graphic showing the rate of the chosen criterion, and you can know the number specifically if you stand with the cursor over it on the drawing.<br>
 4) The website uses polynomial regression model to predict the behaviour of the trends in the in the coming period. <br>
 
 ## Tests
 Seeking functionality and a high degree of dependency on the platform ( web and android software ), we utilized a bunch of development testing techniques. The project is based on building distinct blocks together in order to reach the objective. For instance, the android application can be developed in one solid interface or source code. Instead, it is divided into multiple interfaces; each has its own function, front and back end designs, and codes. Thus, it is logical to implement the **Unit Testing** techniques to evaluate the performance of each and every section individually. Moreover, the project itself has some extended tasks to be implemented incrementally, that’s why unit testing shall be impactful at this stage. In addition, the software is prone to potential problems and crashes that can occur during development. In response to that, we had to test it states-wise (state model), in order to be assured that the application is not fragile or prone to potential runtime errors while functioning. <br>

The extension of the project (calculating the R0 and plotting the log of data) added by its means some other testing technique, which is **Partition Testing**. The reason for that is that some issues have occurred when trying to plot the logarithmic data, as some days in specific countries had 0 cases which is troublesome to deal with, and some cases had significantly large numbers, which had issues with the data retrieval as well. Thus, we had to try some inputs that share close characteristics relatively. If the software behaved likely in the same region of test cases, then it is functioning well. <br>

Following these testing techniques, we also implemented **Component Testing**. This method allowed us to widen our range of evaluating the validity and strength of our platform. As mentioned earlier, the project has multiple steps and multiple interfaces; with the unit and component testing, it shall reveal if the application is fragile and prone to crashes and non-functionalities once changing or adding any component. <br>

Indeed, after finishing the software, there was a crucial step that we had to go through **System Testing**. This technique is as simple as its word speaks. We had to test the whole thing as a whole system, including the components, for example, how these components interact, how they serve the functionality of the software, and whether or not they are prone to crashes if they are in interaction (an implementation of the use-case testing).<br>

**Test case design**: Being implemented alongside the other testing techniques, the test cases are one solid way to approve the validity and functionality of the software. Thus, we used many test cases in order to evaluate and test our system accurately and successfully. Since our data is delivered from an API that uses the WHO as a resource for its information, we had to compare our software statistics – daily and cumulative – with the data from the WHO and the country ministries of healthcare directly. If a mismatch is reborn, we track such differences to detect whether the problem exists in the API response or our analysis and use of the data. This method was vital since the platform does not use just one API and software. Thus, consistent data is required in order to maintain the functionality and reliability of the system. In addition, we used the graphs generated by some trusted sites like Google in order to compare them with ours to assure the correctness and validation of the data. After the validation of the API data and the project extension to include the R0, we used test cases of manually calculated values over confirmed countries and validated the values from the software. Moreover, since the log of the data is used to generate the R0 value, we used and plotted the fitting and regressing for such a model to make sure everything to going the way it must. <br>


 After the system testing, we initiated **Release Testing**; it may share similarities with the system testing, yet, the Release Testing is based on other people outside the team for the evaluation of the functionality, dependability, and validity of the software. <br>

The last station was **User Testing**. We shared our platform with many people who seek information and monitor the Realtime corona statistics updates. Indeed, we received feedback, whether for specific cases and individuals or a general hole in our software that needed to be filled reliably. The type of testing was Beta. <br>


