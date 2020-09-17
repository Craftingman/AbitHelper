window.onload = function() {
		fillRegionSelect();
		fillSpecSelect();
	}

	function formKonkursTable(){
		let currentMidZno = $("#znoInput").val();

		if(validateZno()) {
			$(".loadingImg").css("display", "flex");
			$("#searchVuziButton").attr("onclick", "");
			let currentSpec = $("#specSelect").val();
			let currentRegion = $("#regionSelect").val();
			let vuzCodes = [];

			fetch(`http://localhost:3000/api/regions?filter=name&value=${currentRegion}`)
				.then( function (res) {
					return res.json();
				})
				.then( function (data) {
					vuzCodes = data[0].codes;
					formKonkurs(vuzCodes, currentSpec);
			});
		}

		async function formKonkurs(vuzCodes, currentSpec) {
			$(".tableBlock").css("display", "none");
			konkursArr = [];
			for (vuzCode of vuzCodes) {
				await fetch(`http://localhost:3000/api/konkurs?filter=vuzCode&value=${vuzCode}`)
					.then( function (res) {
						return res.json();
					})
					.then( function (data) {
						if (data[0]) {
							for( konkursPlace of data) {
								if (konkursPlace.spec == currentSpec) {
									konkursArr.push(konkursPlace);
								}
							}
						}
				});
			}
			fillKonkursTable(konkursArr);
		}

		function fillKonkursTable(konkursArr) {
			let headTr = $('.headTr');
			$("#resultTable").empty();
			$("#resultTable").append(headTr);

			for (konkursPlace of konkursArr) {
				let tr = $('<tr>', { "value": konkursPlace.midMidZno });
				tr.addClass("konkursTr");
				let spec = $('<td>', { text: konkursPlace.spec });
				let region = $('<td>', { text: $("#regionSelect").val() });
				let vuzName = $('<td>', { text: konkursPlace.vuzName });
				let educationForm = $('<td>', { text: konkursPlace.educationForm });

				tr.on("click", {konkursMidZno: konkursPlace.midMidZno, queryEl: tr},showChanceCount);
				tr.append(spec, region, vuzName, educationForm);
				$("#resultTable").append(tr);
			}

			$(".loadingImg").css("display", "none");
			$("#resultTable").css("display", "table");
			$(".tableBlock").slideDown(1000);
			$("#resultTable tr:odd").css("background", "#cee1c8");
			$(".konkursTr").hover(function() {
				$(this).css("outline", "2px solid #083a1d");
			}, function() {
				$(this).css("outline", "none");
			});
			$("#searchVuziButton").attr("onclick", "formKonkursTable()");

		}

		function validateZno() {
			if (currentMidZno!="") {
				if(/^\d+[.,]?\d+$/.test(currentMidZno)) {
					currentMidZno = currentMidZno.replace(",", ".");
					currentMidZno = parseFloat(currentMidZno);
					if(currentMidZno >= 100 && currentMidZno <= 200){
						return true;
					} else {
						alert("Неправильно вказаний середній бал ЗНО");
						return false;
					}
				}
				else {
					alert("Неправильно вказаний середній бал ЗНО");
					return false;
				}
			} else {
				alert("Ви не вказали ваш середній бал ЗНО");
				return false;
			}
		}

		function showChanceCount(e) {
			$(".chanceField").remove();

			konkursMidZno = e.data.konkursMidZno;
			let countChanceButton = $("<input>", { "type": "button", "value": "ОЦІНИТИ ШАНС"})
			let chanceField = $("<tr>");
			let innerTd = $("<td>");
			let resultChanceDiv = $("<div>");
			let clickedTd = e.data.queryEl;

			countChanceButton.addClass("countChanceButton");
			resultChanceDiv.addClass("resultChanceDiv");
			innerTd.append(countChanceButton);
			innerTd.append(resultChanceDiv);
			innerTd.attr("colspan", "4");
			chanceField.addClass("chanceField");
			chanceField.append(innerTd);
			clickedTd.after(chanceField);

			countChanceButton.on("click", function() {
				resultChanceDiv.empty();
				let resultChance = (currentMidZno-125)/((konkursMidZno/1.02)-125);
				resultChance = Math.pow(resultChance, 2)*100;
				if (resultChance > 99) {
					resultChance = 99;
				} else if( currentMidZno < 125 ) {
					resultChance = 0;
				}
				resultChance = resultChance.toFixed(2);
				resultChanceDiv.append(`Ваш шанс вступити на бюджет на обрану пропозицію: <b>${resultChance}%</b>`);
			});
		}

	}



	function fillRegionSelect() {
		let regionsArray = [];

		fetch("http://localhost:3000/api/regions?attribute=name")
		.then( function (res) {
			return res.json();
		})
		.then( function (data) {
			regionsArray = data;
			formSearch();
		});

		function formSearch() {
			for (regionName of regionsArray) {
				let option = $('<option>', { "value": regionName, text: regionName})
				$('#regionSelect').append(option);
			}
		}
	}

	function fillSpecSelect() {
		let specArr = [];

		fetch("http://localhost:3000/api/specs?attribute=name")
		.then( function (res) {
			return res.json();
		})
		.then( function (data) {
			specArr = data;
			formSearch();
		});

		function formSearch() {
			for (specName of specArr) {
				let option = $('<option>', { "value": specName, text: specName })
				$('#specSelect').append(option);
			}
		}

	}
