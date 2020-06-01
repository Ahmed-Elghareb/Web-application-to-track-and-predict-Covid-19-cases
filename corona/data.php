<?php
error_reporting(E_ERROR | E_PARSE);

//Check if user selected country
	//If no, an error will appear
if(isset($_GET['country'])){
	//Get country name and code
	$country = $_GET['country'];
	//Save API url in var

	//Save API contents in var [JSON format]
	if($_GET['api'] == 'api1'){
		$url = 'https://api.covid19api.com/dayone/country/'.$country;
		$response = file_get_contents($url);
		//Check if there is a response from the API
			//If no, an error will appear
		if($response){
			//Convert from JSON to php array
			$response = json_decode($response, true);
			if(isset($_GET['chart_type'])){
				$chart_type = $_GET['chart_type'];
				//GET Y axes data and send it to the chart via AJAX request
				foreach($response as $key=>$value){
					if($chart_type == 'confirmed'){
						echo $value['Confirmed'].'.';
					}elseif($chart_type == 'death'){
						echo $value['Deaths'].'.';
					}elseif($chart_type == 'recovered'){
						echo $value['Recovered'].'.';
					}
		
				}
			}elseif(isset($_GET['date'])){
				//GET X axes data and send it to the chart via AJAX request
				foreach($response as $key=>$value){
					$date = $value['Date'];
					$date = substr($date, 0, strpos($date, "T"));
					echo $date.'.';
				}
			}
			
		}else{
			echo 'We have troubles right now, try again later...';
		}
	}elseif($_GET['api'] == 'api2'){
		$url = 'https://api.thevirustracker.com/free-api?countryTimeline='.$country;
		$response = file_get_contents($url);
		if($response){
			$response = json_decode($response, true);
			$first = $response['timelineitems'];

			foreach($first as $second){
				array_pop($second);
				foreach($second as $key=>$value){
					if(isset($_GET['chart_type'])){
						echo $value['new_daily_cases'].'.';
					}elseif(isset($_GET['date'])){
						echo $key.'.';
					}
				}
			}
		}
	}else{
		$url = null;
	}
	
}else{
	echo 'Error';
}