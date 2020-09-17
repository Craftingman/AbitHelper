window.onload = function() {
		fillRegionSelect();
	}


function formResultTable() {
	let regionName = $('#regionSelect').val();
	let url = "http://localhost:3000/api/regions?filter=name&value=" + regionName;
	console.log(url);
	let region;

	fetch(url)
		.then( function (res) {
			return res.json();
		})
		.then( function (data) {
			if(data[0]) {
				region = data[0];
				formTable();
			} else {
				console.error(new Error("Bad gateway."));
			}
		});
	function formTable() {
		let headTr = $('.headTr');
		$("#resultTable").empty();
		$("#resultTable").append(headTr);
		for (code of region.codes) {
			fetch(`http://localhost:3000/api/vuzi/${code}`)
				.then( function (res) {
					return res.json();
				})
				.then( function (data) {
					if(data) {
						appendTable(data);
					}
				});
		}
	}
	function appendTable(vuz) {
		let tr = $('<tr>', { "value": vuz.code });
		let name = $('<td>', { text: vuz.name });
		let vuzFamily = $('<td>', { text: vuz.vuzFamily });
		let vuzType = $('<td>', { text: vuz.vuzType });
		let ownForm = $('<td>', { text: vuz.ownForm });
		let cityFact = $('<td>', { text: vuz.cityFact });

		tr.append(name, vuzFamily, vuzType, ownForm, cityFact);
		tr.addClass("vuzTr");

		$("#resultTable").css("display", "table");

		$("#resultTable").append(tr);
		$("#resultTable tr:odd").css("background", "#cee1c8");
		$(".vuzTr").hover(function() {
			$(this).css("outline", "2px solid #083a1d");
		}, function() {
			$(this).css("outline", "none");
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
