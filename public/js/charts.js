   // Load google charts
   google.charts.load('current', {'packages':['corechart']});
   google.charts.setOnLoadCallback(drawCharts);
   
   // Draw the charts and set the chart values
   function drawCharts() {
     var data1 = google.visualization.arrayToDataTable([
       ['Year', 'No. of Companies Visited',{ role: 'style' }],
       ['2016-17', 297,'color: #58ccdb'],
       ['2017-18', 315,'color: #61420e'],
       ['2018-19', 344,'color: #b3254d'],
       ['2019-20', 123,'color: #f27a24'],
       ['2020-21', 87,'color: #f0c330']
     ]);
   
     var data2 = google.visualization.arrayToDataTable([
       ['Year', 'Highest Package Offered(lakhs)',{ role: 'style' }],
       ['2014-15', 9,'color: #58ccdb'],
       ['2015-16', 18,'color: #61420e'],
       ['2016-17', 15.6,'color: #b3254d'],
       ['2017-18', 10.5,'color: #f27a24'],
       ['2018-19', 10.5,'color: #f0c330']
     ]);
   
     var data3 = google.visualization.arrayToDataTable([
       ['Year', 'No. of Students Placed',{ role: 'style' }],
       ['2014-15', 778,'color: #58ccdb'],
       ['2015-16', 876,'color: #61420e'],
       ['2016-17', 940,'color: #b3254d'],
       ['2017-18', 987,'color: #f27a24'],
       ['2018-19', 994,'color: #f0c330']
     ]);
   
     // Optional; set the width and height of the charts
     var options1 = {
       'title': 'Number of Companies Visited',
       'width': '100%',
       'height': '100%',
       'orientation': 'horizontal',
       'legend': { position: 'none' },
       'colors': ['#58ccdb'],
       'hAxis': {
         title: 'Year',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
       'vAxis': {
         title: 'Companies Visited',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
     };
   
     var options2 = {
       'title': 'Highest Package Offered (in lakhs)',
       'width': '100%',
       'height': '100%',
       'orientation': 'horizontal',
       'legend': { position: 'none' },
       'colors': ['#61420e'],
       'hAxis': {
         title: 'Year',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
       'vAxis': {
         title: 'Package Offered (lakhs)',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
     };
   
     var options3 = {
       'title': 'Number of Students Placed',
       'width': '100%',
       'height': '100%',
       'orientation': 'horizontal',
       'legend': { position: 'none' },
       'colors': ['#b3254d'],
       'hAxis': {
         title: 'Year',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
       'vAxis': {
         title: 'Students Placed',
         textStyle: {
           color: '#333',
           fontSize: 12,
           bold: true,
         },
         titleTextStyle: {
           color: '#333',
           fontSize: 14,
           bold: true,
         },
       },
     };
   
     // Display the charts inside the <div> elements with IDs "barchart1," "barchart2," and "barchart3"
     var chart1 = new google.visualization.BarChart(document.getElementById('barchart1'));
     chart1.draw(data1, options1);
   
     var chart2 = new google.visualization.BarChart(document.getElementById('barchart2'));
     chart2.draw(data2, options2);
   
     var chart3 = new google.visualization.BarChart(document.getElementById('barchart3'));
     chart3.draw(data3, options3);
   }