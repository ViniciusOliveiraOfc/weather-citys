document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if (input.trim() !== '') {
        clearInfo();
        aviso('carregando');
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=062882239fcd54267709421d3f5ffcc8&units=metric&lang=pt_br`;
        
        let response = await fetch(url);
        let json = await response.json();
        
        console.log(json);
        
        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                wind: json.wind.speed,
                windDeg: json.wind.deg 
            })
        } else {
            aviso('erro');
        }
        
    } else {
        clearInfo();
    }
})

function showInfo(json) {
    aviso('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${json.wind}<span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    aviso('');
    document.querySelector('.resultado').style.display = 'none';
}

function aviso(msg) {
    if (msg == 'erro') {
        document.querySelector('.aviso').innerHTML = 'Não encontramos essa localização.';
    } else if (msg == 'carregando') {
        document.querySelector('.aviso').innerHTML = '<img src="assets/svg/Rolling-1s-200px.svg">';
    } else if (msg == '') {
        document.querySelector('.aviso').innerHTML = '';
    }
}