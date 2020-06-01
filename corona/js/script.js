$(document).ready(function(){
    if($('#country_name').length){
        var number_response; //global var
        var date_response; //global var

        // take the return of the index page input
        var country_name = $('#country_name').val(); 
        var chart_type = $('#chart_type').val();

        // AJAX request to get Y axes from data.php page 
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();


        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 & xmlhttp.status == 200){

                // edit the returned list of the data 
                number_response = xmlhttp.responseText
                number_response = number_response.split('.');
                number_response = number_response.map(Number);
                number_response.splice(number_response.length - 1);
                // console.log(number_response);
            }
        }

        xmlhttp.open("GET", "data.php?api=api1&chart_type="+chart_type+"&country="+country_name, true);
        xmlhttp.send();
        //================================================================================================
        var xmlhttp2;
        xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange = function(){
            if(xmlhttp2.readyState == 4 & xmlhttp2.status == 200){
                // edit the returned list of the date

                date_response = xmlhttp2.responseText
                date_response = date_response.split('.');
                date_response.splice(date_response.length - 1);
                // console.log(date_response);

                
            }
        }

        xmlhttp2.open("GET", "data.php?api=api1&date&country="+country_name, true);
        xmlhttp2.send();

        // chart style 
        setTimeout(function() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date_response,
                    datasets: [{
                        label: 'Number of '+chart_type+' cases',
                        data: number_response,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(231, 76, 60, 1)'
                        ],
                    }]
                }
            });
        }, 500);
    }else if($('#country_code').length){
        var number_response; //global var
        var date_response; //global var
        var x_axes = [];
        var pairs = [];

        // take the return of the index page input
        var country_code = $('#country_code').val(); 
        var chart_type = $('#chart_type').val();

        // AJAX request to get Y axes from data.php page 
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();


        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 & xmlhttp.status == 200){

                // edit the returned list of the data 
                number_response = xmlhttp.responseText
                number_response = number_response.split('.');
                number_response = number_response.map(Number);
                number_response.splice(number_response.length - 1);
                // console.log(number_response);
            }
        }

        xmlhttp.open("GET", "data.php?api=api2&chart_type="+chart_type+"&country="+country_code, true);
        xmlhttp.send();
        //================================================================================================
        var xmlhttp2;
        xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange = function(){
            if(xmlhttp2.readyState == 4 & xmlhttp2.status == 200){
                // edit the returned list of the date

                date_response = xmlhttp2.responseText
                date_response = date_response.split('.');
                date_response.splice(date_response.length - 1);
                // console.log(date_response);

                
            }
        }

        xmlhttp2.open("GET", "data.php?api=api2&date&country="+country_code, true);
        xmlhttp2.send();

        setTimeout(function() {

            var i = 0;
            while(i <= date_response.length){
                x_axes.push(i);
                i++;
            }

            x_axes.forEach((x, index) => {
                const y = number_response[index];
                pairs.push({x, y});
            });

            function linearRegression(y,x){
                var lr = {};
                var n = y.length;
                var sum_x = 0;
                var sum_y = 0;
                var sum_xy = 0;
                var sum_xx = 0;
                var sum_yy = 0;
        
                for (var i = 0; i < y.length; i++) {
        
                    sum_x += x[i];
                    sum_y += y[i];
                    sum_xy += (x[i]*y[i]);
                    sum_xx += (x[i]*x[i]);
                    sum_yy += (y[i]*y[i]);
                } 
        
                lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
                lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
                lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
        
                return lr;
            }
    
            // console.log(number_response);
            // console.log(x_axes);

            var lr = linearRegression(number_response, x_axes);
    
            var i = 0;
            var y;
            lr_pairs = [];
            while (i <= x_axes.length) {
                x = x_axes[i];
                y = lr['slope']*x + lr['intercept'];
                lr_pairs.push({x, y});
                i++;
            }
            console.log(pairs);
            console.log(lr_pairs);

            var sum = number_response.reduce(function(a, b){
                return a + b;
            }, 0);

            var days_num = number_response.length;

            var avg = sum/days_num;


            var spread_rate = (6*(Math.log10(avg)-Math.log10(number_response[0])))/days_num;
			spread_rate = Math.pow(10, spread_rate);	

            console.log(avg);
            console.log(days_num);
            console.log(sum);
            console.log(spread_rate);


            
            curve_data = '<p>y='+lr['slope']+'x+' + lr['intercept']+'</p><p>r<sup>2</sup>= '+lr['intercept']+'</p><p>Spread rate (R<sub>0</sub>) = '+spread_rate+'</p>';
            $('#curve_data').append(curve_data);
        }, 3000);
        // chart style 
        setTimeout(function() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Real values',
                        data: pairs,
                        borderColor: [
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(52, 152, 219, 1)',
                        ],
                        pointBorderWidth: [
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                            3, 3, 3, 3, 3, 3, 3,
                             
                        ]
                    },
                    {
                        label: 'Linear regression',
                        data: lr_pairs,
                        type: 'line',
                        backgroundColor: [
                            'rgba(255, 255, 255, 0)',
                        ],
                        borderColor: [
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                            'rgba(231, 76, 60, 1)',
                        ],
                        pointBorderWidth: [
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2,
                             
                        ]
                    }
                ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                }
            });
        }, 3000);
    }
});