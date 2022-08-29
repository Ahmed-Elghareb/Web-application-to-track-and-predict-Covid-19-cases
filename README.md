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
<!-- <p align="center">
<img src="https://user-images.githubusercontent.com/61229902/170965290-d462820d-0c0d-465b-8615-b68893f27bbb.png" width="200" height="300" />
</p> -->


We used Live API  "https://api.covid19api.com/" That gets 
