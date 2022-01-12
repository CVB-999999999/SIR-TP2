// Carregar o JSON
function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

let num = 0;

readTextFile("./dados/pessoas.json", function (text) {
	var data = JSON.parse(text);

	// Selecionar o div onde vao ser colocados os cards
	var cards = document.getElementById("dados");
	// Selecionar o div na sidebar onde estao os botoes dos users
	var btns = document.getElementById("btns");

	// Loop dos dados que foi buscar ao json
	for (let i in data) {
		// Cria a div com o card que contem os dados do utilizador
		var el = document.createElement("div");
		el.className = "card p-md-3 p-2 mt-md-4 mt-1 bg-dark text-light border-primary";
		el.id = "card" + i;
		el.innerHTML =
			'<div class="row">\n' +
			'<div class="col-md-4 text-center"> \n' +
			'<img src="' + data[i].img +
			'" class="card-img-top p-1 border border-primary" alt="Foto Perfil" style="max-width: 60vw;">\n' +
			'</div>\n' +
			'<div class="col-md-8">\n' +
			'<div class="card-body">\n' +
			'<h3 class="card-title"> ' + data[i].nome + ' </h3>\n' +
			'<h6 class="card-subtitle mb-2 text-primary"> ' + data[i].numero + ' </h6>\n' +
			'<p class="card-text"> ' + data[i].curso + ' </p>\n' +
			'<p class="card-text mt-2"> ' + data[i].obv + '</p> \n' +
			'</div>\n' +
			'</div>\n' +
			'</div>\n';

		cards.append(el);

		// Botao para ir rapidamente para o card
		var bt = document.createElement("a");
		bt.className = "btn btn-dark";
		bt.innerHTML = data[i].nome;
		bt.href = "#card" + i
		btns.append(bt);
		num = parseInt(i) + 1;
	}
});

/*	----------------------------------------------------------------------	*/
/*	-------------------------- Cat as a service --------------------------	*/
/*	----------------------------------------------------------------------	*/

// Cria o elemento com o imagem do gato
function getCats() {
	// API  para mostrar fotos de gatos
	var cat = document.getElementById("cat");
	cat.innerHTML = '<div> <img src="https://cataas.com/cat" alt="CATAAS Cat Picture"> </div>';
}

// getCats();
document.getElementById("catBtn").addEventListener("click", getCats);

/*	----------------------------------------------------------------------	*/
/*	--------------------------- OpenWeatherMap ---------------------------	*/
/*	----------------------------------------------------------------------	*/

async function getWeather() {
	let weather = document.querySelector('#openWeather').value;
	let url = 'api.openweathermap.org/data/2.5/weather';
	let token = '7881712858c48cc3f110e0132c47e411';

	let doc = document.getElementById("w");
	doc.style.display = 'block';


	// Verifica se existe input
	if (weather) {
		doc.innerHTML = '<div class="d-flex justify-content-center">' +
			'<div class="spinner-border" role="status">' +
			'<span class="visually-hidden">Loading...</span>' +
			'</div>' +
			'</div>'
		// Tenta fazer o pedido á api
		try {
			let res = await fetch('https://' + url + '?q=' + weather + '&appid=' + token + '&lang=PT');
			// Verifica se recebeu resposta
			if (!res.ok) {
				// Not found
				if (res.status == '404') {
					alert('Parametros incoretos');
					doc.innerHTML('Parametros incoretos')
					return;
				}
			}
			// Dados de meteriologia
			let dados = await res.json();
			console.log(dados);
			doc.innerHTML = '<div class="card-body">\n' +
				'<img src="http://openweathermap.org/img/w/' + dados.weather[0].icon + '.png"\n' +
				'<h2 class="card-title"> ' + dados.weather[0].description + ' </h2>\n' +
				'<h6 class="card-subtitle mb-2 text-primary"> ' + (dados.main.temp - 273).toFixed(1) + ' ºC </h6>\n' +
				'<h6 class="card-subtitle mb-2 text-primary"> Min: ' + (dados.main.temp_min - 273).toFixed(1) + ' ºC | Max: ' + (dados.main.temp_max - 273).toFixed(1) + ' ºC </h6>\n' +
				'<p class="card-subtitle mb-2 text-primary"> Humidade: ' + dados.main.humidity + '% </p>\n' +
				'<p class="card-subtitle mb-2 text-primary"> Vento: ' + dados.wind.speed + 'Km/h ' + dados.wind.deg + 'º </p>\n' +
				'<p class="card-text">' + dados.name + ' - ' + dados.sys.country + ' </p>\n' +
				'</div>';

		} catch (error) {
			console.log(error);
		}
		alert(num);
	}
}

document.getElementById("weather").addEventListener("click", getWeather);

/*	----------------------------------------------------------------------	*/
/*	-------------------------------- IMDB --------------------------------	*/
/*	----------------------------------------------------------------------	*/

async function getSerie() {
	let input = document.querySelector('#imdbInput').value;
	let url = 'https://imdb-api.com/en/API/SearchSeries/';
	let token = 'k_2kvwvxlm';

	let doc = document.getElementById("imdbDiv");
	doc.style.display = 'block';


	// Verifica se existe input
	if (input) {
		doc.innerHTML = '<div class="d-flex justify-content-center">' +
			'<div class="spinner-border" role="status">' +
			'<span class="visually-hidden">Loading...</span>' +
			'</div>' +
			'</div>'
		// Tenta fazer o pedido á api
		try {
			let res = await fetch(url + token + '/' + input);
			console.log(res);
			// Verifica se recebeu resposta
			if (!res.ok) {
				// Not found
				if (res.status == '404') {
					alert('Parametros incoretos');
					doc.innerHTML('Parametros incoretos')
					return;
				}
			}
			// Dados de meteriologia
			let dados = await res.json();
			console.log(dados);
			data = dados.results;

			doc.innerHTML = "";

			for(let i in data) {
			var el = document.createElement("div");
			el.className = "card p-md-3 p-2 mt-md-4 mt-1 bg-dark text-light border-primary";
			el.id = "card" + i;
			el.innerHTML =
				'<div class="row">\n' +
				'<div class="col-md-4 text-center"> \n' +
				'<img src="' + data[i].image +
				'" class="card-img-top p-1 border border-primary" alt="Foto Perfil" style="max-width: 60vw;">\n' +
				'</div>\n' +
				'<div class="col-md-8">\n' +
				'<div class="card-body">\n' +
				'<h3 class="card-title"> ' + data[i].title + ' </h3>\n' +
				'<h6 class="card-subtitle mb-2 text-primary"> ' + data[i].description + ' </h6>\n' +
				'</div>\n' +
				'</div>\n' +
				'</div>\n';

			doc.append(el);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
document.getElementById('imdb').addEventListener("click", getSerie);