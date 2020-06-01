<!DOCTYPE html>
<html>
	<head>
		<title>Coronavirus Meter</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/show_country.css">
	</head>
	<body>
		<?php
		error_reporting(E_ERROR | E_PARSE);
		// read from api 
		$url  = 'https://api.covid19api.com/summary';
		// use contry name for search 
		if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['country'])){ 	

			$country = $_GET['country'];
			$country_name = strtok( $country, '_' );
			$country_code = strtok( '' ); 

			$response = file_get_contents($url);
			// loop to select a country  
			if($response){
				$response = json_decode($response, true);
				foreach($response as $first){
					foreach($first as $last){
						if($last['Country'] == $country_name){
							if($_GET['type'] == 'stat'){
								$url2 = 'https://api.covid19api.com/dayone/country/'.$country_name;
								$response2 = file_get_contents($url2);
								$response2 = json_decode($response2, true);
								?>
								<div class="stats">
									<h1><?php echo $last['Country'] ?></h1>
									<hr>
									<!-- html structure to show statistics data  -->
									<div class="right">
										<p>New Confirmed: <?php echo $last['NewConfirmed'] ?></p>
										<p>New Deaths: <?php echo $last['NewDeaths'] ?></p>
										<p>New Recovered: <?php echo $last['NewRecovered'] ?></p>
									</div>
									<div class="left">
										<p>Total Confirmed: <?php echo $last['TotalConfirmed'] ?></p>
										<p>Total Deaths: <?php echo $last['TotalDeaths'] ?></p>
										<p>Total Recovered: <?php echo $last['TotalRecovered'] ?></p>
									</div>
									<?php
										$first_day_confirmed = $response2[0]['Confirmed'];
										$last_day_confirmed  = end($response2)['Confirmed'];

										$first_day_date = $response2[0]['Date'];
										$first_day_date = substr($first_day_date, 0, strpos($first_day_date, "T"));

										$last_day_date = end($response2)['Date'];
										$last_day_date = substr($last_day_date, 0, strpos($last_day_date, "T"));

										// Declare two dates 
										$first_day_date = strtotime($first_day_date); 
										$last_day_date = strtotime($last_day_date); 
										
										// total no. seconds 60/60/24 to get  
										// number of days 
										$days = ceil(($last_day_date - $first_day_date)/60/60/24);

										$spread_rate = (6*(log($last_day_confirmed, 10)-log($first_day_confirmed, 10)))/$days;
										$spread_rate = pow(10, $spread_rate);	
									?>
									<p class="rate">Spread rate: <?php echo round($spread_rate, 5) ?></p>
								</div>
								<?php	
							}elseif($_GET['type']){
								$chart_type = $_GET['type'];
								if($_GET['type'] == 'daily'){
									?>
									<input id="country_code" type="hidden" name="country_code" value="<?php echo $country_code ?>">
									<?php
								}else{
									?>
									<input id="country_name" type="hidden" name="country_name" value="<?php echo $country_name ?>">
									<?php
								}
								?>
								<!-- the input user choose that will be used in scipt  -->
								
								
								<input id="chart_type" type="hidden" name="chart_type" value="<?php echo $chart_type ?>">
								<canvas id="myChart"></canvas>
								<div id="curve_data"></div>
								<?php
							}
							
						}
					}
				}
			}else{
				echo 'API does not response, try again later...';
			}
			// show error if the is no return country from user 
		}else{
			echo 'Error, please choose a country';
		}

		?>
		<script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
        <script src="js/script.js"></script>
	</body>
</html>