window.onload = function() {
		fillRegionSelect();
	}


function formResultTable() {

	if (validateRegionField()) {

		let regionName = $("#regionDropdown").children(".dropdownInput").val();
		let url = "http://localhost:3000/api/regions?filter=name&value=" + regionName;
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

			tr.on("click", function() {
				$(location).attr('href', `/vuzi/${vuz.code}`);
			});

			$("#resultTable").append(tr);
			$("#resultTable tr:odd").css("background", "#cee1c8");
			$(".vuzTr").hover(function() {
				$(this).css("outline", "2px solid #083a1d");
			}, function() {
				$(this).css("outline", "none");
			});

		}
	}
}

function validateRegionField() {
	let regionInput = $("#regionDropdown").children(".dropdownInput");
	if (regionInput.val() == "") {
		alert("Оберіть регіон!");
		return false;
	} else {
		return true;
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
			initDropdown($("#regionDropdown"), regionsArray);
		}
}

function fillDropdown(dropdown, elms) {
	let input = dropdown.children(".dropdownInput");
	let val = input.val();

	let resultsBox = dropdown.children(".dropdownResultsBox");
	let matchedElms = [];

	resultsBox.empty();

	if(val.length > 0) {
		for (el of elms) {
			if (el.toLowerCase().includes(val.toLowerCase())) {
				matchedElms.push(el);
			}
		}
		for (el of matchedElms) {
			let result = $("<div>", { "class":"dropdownResult", "text":el });
			resultsBox.append(result);
		}
	} else {
		for (el of elms) {
			let result = $("<div>", { "class":"dropdownResult", "text":el });
			resultsBox.append(result);
		}
	}

	resultsBox.off("mousedown");
	input.off("blur");

	resultsBox.show(0, function() {
		resultsBox.on("mousedown", function(e) {
			if ($(e.target).is('.dropdownResult')) {
				input.val($(e.target).text());
				input.off("blur");
			}
			resultsBox.hide();
		});
	});
	input.on("blur", function(e) {
		dropdown.children(".dropdownResultsBox").hide();
		if ( !(matchedElms.includes(input.val())) && matchedElms.length > 0) {
			input.val(matchedElms[0]);
		} else if (matchedElms.length == 0) {
			input.val(elms[0]);
		}
	});
}

function initDropdown(dropdown, elms) {
	let dropdownInput = dropdown.children(".dropdownInput");

	dropdownInput.on("focus", function() {
		fillDropdown(dropdown, elms);
	});
	dropdownInput.on("keyup", function() {
		fillDropdown(dropdown, elms);
	});

}
