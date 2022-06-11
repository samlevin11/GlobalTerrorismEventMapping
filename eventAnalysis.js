require([
		"esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
		"esri/PopupTemplate",
		"esri/widgets/ScaleBar",
		"esri/widgets/Legend",
		"esri/widgets/Compass",
		"esri/tasks/support/Query",
		"esri/Graphic",
		"esri/layers/GraphicsLayer",
		"esri/renderers/smartMapping/statistics/uniqueValues",
		"esri/widgets/BasemapToggle",
        ],
        function(
          Map, MapView, FeatureLayer, PopupTemplate, ScaleBar, Legend, Compass, Query, Graphic, GraphicsLayer, uniqueValues, BasemapToggle
        ) 
		{

	    var groupSelect = document.getElementById("group-name");
	    var year = document.getElementById("yr");
	    var trackActivity = document.getElementById("trackActivity");
	    var resetResults = document.getElementById("reset");
		var relatedSelect = document.getElementById("related");
		var trackRelated = document.getElementById("trackRelated");
	  
	    var map = new Map({
          basemap: "dark-gray-vector"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 2,
          center: [0, 20] // longitude, latitude
        });
	  
	    view.ui.add("titleDiv", "top-right");
		view.ui.add("selectionDiv", "top-right");
		
		var template = {
			title: "DATE: {iyear}-{imonth}-{iday}, {gname}",
			content: [{
				type: "fields",
				fieldInfos: [{
					fieldName: "gname",
					label: "Terrorist Group",
					visible: true
				}, {
					fieldName: "eventID",
					label: "Event ID",
					visible: true
				}, {
					fieldName: "attacktype1_txt",
					label: "Attack Type",
					visible: true
				}, {
					fieldName: "targtype1_txt",
					label: "Target Type",
					visible: true
				}, {
					fieldName: "weaptype1_txt",
					label: "Weapon Type",
					visible: true
				}, {
					fieldName: "nkill",
					label: "Victims Killed",
					visible: true
				}, {
					fieldName: "nwound",
					label: "Victims Wounded",
					visible: true
				}, {
					fieldName: "propvalue",
					label: "Property Damage (USD)",
					visible: true
				}, {
					fieldName: "related",
					label: "Related Events",
					visible: true
				}]
			}]
		};
		
		
		var featureLayer = new FeatureLayer({
			url: "https://services2.arcgis.com/VNo0ht0YPXJoI4oE/arcgis/rest/services/globalterrorismdb_0718dist_top10groups/FeatureServer/0",
			popupTemplate: template
		});
		
		map.add(featureLayer);
	  
		var scaleBar = new ScaleBar({
			view: view,
			unit: 'dual',
			style: 'line'
		});
	  
		view.ui.add(scaleBar, {
			position: "bottom-right",
			index: 0
		});
		
		var compass = new Compass({
			view: view
		});
		
		view.ui.add(compass, {
			position: "bottom-right",
			index: 1
		});
	  
		var legend = new Legend({
			view: view,
			layerInfos: [{
				layer: featureLayer,
				title: "Terrorist Group"
			}]
		});
	  
		view.ui.add(legend, {
			position: "bottom-left",
			type: "card",
			layout: "auto"
		});
	  
		var basemapToggle = new BasemapToggle({
			view: view,
			nextBasemap: "hybrid"
		});
	
		view.ui.add(basemapToggle, {
			position: "top-left",
			index: 1
		});
	  
		uniqueValues({
			layer: featureLayer,
			field: "gname"
		}).then(function(response){
			var infos = response.uniqueValueInfos;
			infos.forEach(function(info){
			var option = document.createElement("option");
			option.text = info.value;
			groupSelect.add(option);
		  
			//console.log("GROUP NAME: ", info.value, " # OF ATTACKS: ", info.count);
			});
		});
	  
		groupSelect.addEventListener("change", function(){
			console.log('listened!');
			document.getElementById('yr').options.length = 0;
			group = groupSelect.value;
			if (group == 'Al-Shabaab'){
				var i = 2007
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Boko Haram'){
				var i = 2009
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Farabundo Marti National Liberation Front (FMLN)'){
				var i = 1978
				while (i <= 1994){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Irish Republican Army (IRA)'){
				var i = 1970
				while (i <= 2011){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Islamic State of Iraq and the Levant (ISIL)'){
				var i = 2013
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == "Kurdistan Workers' Party (PKK)"){
				var i = 1984
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == "New People's Army (NPA)"){
				var i = 1970
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Revolutionary Armed Forces of Colombia (FARC)'){
				var i = 1975
				while (i <= 2016){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Shining Path (SL)'){
				var i = 1978
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			} else if (group == 'Taliban'){
				var i = 1995
				while (i <= 2017){
					var yrOption = document.createElement("option");
					yrOption.text = i;
					year.add(yrOption);
					i++;
				}
			}
		});
	  
		function executeGroupYear(groupName, year, isFirst){
			featureLayer.visible = false;
			view.ui.remove(legend);
			
			where = "gname LIKE '" + groupName.split(" ")[0] + "%' AND iyear = " + String(parseInt(year));
			
			var geomQuery = featureLayer.createQuery();
			geomQuery.where = where;
			console.log(geomQuery.where);
			geomQuery.outFields = ["*"];
			geomQuery.returnGeometry = true;
			
			featureLayer.queryFeatures(geomQuery)
				.then(function(results){
					// results is a returned FeatureSet object
					//console.log(results);
					
					var locationArray = [];
				
					var eventPointsGraphicLayer = new GraphicsLayer();	
					map.add(eventPointsGraphicLayer);
				
					var eventPoints = results.features.map(function(graphic){
						graphic.symbol = {
							type: "simple-marker",
								color: [0,0,0,0],
								size: 11,
								outline: {
									color: "#25eae0",
									width: 2
								}
						};
						return graphic;
					});
				
					eventPointsGraphicLayer.addMany(eventPoints);
				
					results.features.forEach(function(item){
						//console.log(item.geometry);
						console.log('geometry!');
						var eventLoc = [item.geometry.longitude, item.geometry.latitude];
						locationArray.push(eventLoc);
					});
				
					console.log('array!');
					console.log(locationArray);
				
					var polyline = {
						type: "polyline",
						paths: locationArray,
					};
				
					var polylineSymbol = {
						type: "simple-line",
						color: [226, 119, 40],
						width: 1
					};
				
					var eventLineGraphicLayer = new GraphicsLayer();
					map.add(eventLineGraphicLayer);
				
				
					var eventPathGraphic = new Graphic({
						geometry: polyline,
						symbol: polylineSymbol
					});
				
					eventLineGraphicLayer.add(eventPathGraphic);
				
					view.goTo({
						target: eventPathGraphic
					});
				
					
					var statsQuery = featureLayer.createQuery();
					statsQuery.where = where
					console.log(statsQuery.where);
					statsQuery.outFields = ["*"];
					statsQuery.returnGeometry = false;
					
					var countEvent = {
						onStatisticField: "eventid",
						outStatisticFieldName: "Count_eventid",
						statisticType: "count"
					};
					var sumSuccess = {
						onStatisticField: "success",
						outStatisticFieldName: "Success_sum",
						statisticType: "sum"
					};
					var sumWound = {
						onStatisticField: "nwound",
						outStatisticFieldName: "Wound_sum",
						statisticType: "sum"
					};
					var sumKill = {
						onStatisticField: "nkill",
						outStatisticFieldName: "Kill_sum",
						statisticType: "sum"
					};
					
					statsQuery.outStatistics = [countEvent, sumSuccess, sumWound, sumKill];
					
					featureLayer.queryFeatures(statsQuery)
						.then(function(results){
							var stats = results.features[0].attributes;
							
							var eventCount = stats.Count_eventid;
							var successRate = ((stats.Success_sum)/(eventCount))*100;
							var woundSum = stats.Wound_sum;
							var killSum = stats.Kill_sum;
							var propSum = stats.Property_sum;
							
							document.getElementById("resultStatsDiv").innerHTML = "Total Incidents: " + eventCount +
																				  "<br>Attack Success Rate: " + Math.round(successRate) + "%" +
																				  "<br>Total Wounded: " + woundSum +
																				  "<br>Total Killed: " + killSum;
						});
					
					
					resetResults.addEventListener("click", function(){
						console.log('resetting...');
						eventPointsGraphicLayer.graphics.removeAll();
						eventLineGraphicLayer.graphics.removeAll();
						featureLayer.visible = true;
						document.getElementById("resultStatsDiv").innerHTML = null;
						document.getElementById("relatedStatsDiv").innerHTML = null;
						view.ui.add(legend, {
							position: "bottom-left",
							type: "card",
							layout: "auto"
						});
					});	
				});
		}
		
		function executeRelated(eventId){
			featureLayer.visible = false;
			view.ui.remove(legend);
			
			var where = "related LIKE '%" + String(eventId) + "%'";
			
			var relatedQuery = featureLayer.createQuery();
			relatedQuery.where = where;
			console.log(relatedQuery.where);
			relatedQuery.outFields = ["*"];
			relatedQuery.returnGeometry = true;
			console.log('pre related query');
			featureLayer.queryFeatures(relatedQuery)
				.then(function(results){
					
					console.log(results);
					
					var relatedLocationArray = [];
					
					var relatedPointsGraphicLayer = new GraphicsLayer();	
						map.add(relatedPointsGraphicLayer);
					
					var relatedPoints = results.features.map(function(graphic){
						graphic.symbol = {
							type: "simple-marker",
								color: [0,0,0,0],
								size: 11,
								outline: {
									color: "#b419fc",
									width: 2
								}
						};
						return graphic;
					});
					
					relatedPointsGraphicLayer.addMany(relatedPoints);
					
					results.features.forEach(function(item){
							//console.log(item.geometry);
							console.log('geometry!');
							var eventLoc = [item.geometry.longitude, item.geometry.latitude];
							relatedLocationArray.push(eventLoc);
					});
					
					console.log('array!');
					console.log(relatedLocationArray);
					
					var polyline = {
						type: "polyline",
						paths: relatedLocationArray,
					};
					
					var polylineSymbol = {
						type: "simple-line",
						color: [255, 255, 26],
						width: 1
					};
					
					var relatedLineGraphicLayer = new GraphicsLayer();
					map.add(relatedLineGraphicLayer);
					
					
					var relatedPathGraphic = new Graphic({
						geometry: polyline,
						symbol: polylineSymbol
					});
					
					relatedLineGraphicLayer.add(relatedPathGraphic);
					
					view.goTo({
						target: relatedPathGraphic
					});
					
					var statsQuery = featureLayer.createQuery();
					statsQuery.where = where
					console.log(statsQuery.where);
					statsQuery.outFields = ["*"];
					statsQuery.returnGeometry = false;
					
					var countEvent = {
						onStatisticField: "eventid",
						outStatisticFieldName: "Count_eventid",
						statisticType: "count"
					};
					var sumSuccess = {
						onStatisticField: "success",
						outStatisticFieldName: "Success_sum",
						statisticType: "sum"
					};
					var sumWound = {
						onStatisticField: "nwound",
						outStatisticFieldName: "Wound_sum",
						statisticType: "sum"
					};
					var sumKill = {
						onStatisticField: "nkill",
						outStatisticFieldName: "Kill_sum",
						statisticType: "sum"
					};
					
					statsQuery.outStatistics = [countEvent, sumSuccess, sumWound, sumKill];
					
					featureLayer.queryFeatures(statsQuery)
						.then(function(results){
							var stats = results.features[0].attributes;
							
							var eventCount = stats.Count_eventid;
							var successRate = ((stats.Success_sum)/(eventCount))*100;
							var woundSum = stats.Wound_sum;
							var killSum = stats.Kill_sum;
							var propSum = stats.Property_sum;
							
							document.getElementById("relatedStatsDiv").innerHTML = "Total Incidents: " + eventCount +
																				  "<br>Attack Success Rate: " + Math.round(successRate) + "%" +
																				  "<br>Total Wounded: " + woundSum +
																				  "<br>Total Killed: " + killSum;
						});
					
					resetResults.addEventListener("click", function(){
						console.log('resetting...');
						relatedPointsGraphicLayer.graphics.removeAll();
						relatedLineGraphicLayer.graphics.removeAll();
						featureLayer.visible = true;
						document.getElementById("resultStatsDiv").innerHTML = null;
						document.getElementById("relatedStatsDiv").innerHTML = null;
						view.ui.add(legend, {
							position: "bottom-left",
							type: "card",
							layout: "auto"
						});
					});
			});
			
		}
	  
		trackActivity.addEventListener("click", function() {
			console.log(groupSelect.value);
			console.log(year.value);
			executeGroupYear(groupSelect.value, year.value);
		});
		
		trackRelated.addEventListener("click", function() {
			executeRelated(relatedSelect.value);
		});
	});