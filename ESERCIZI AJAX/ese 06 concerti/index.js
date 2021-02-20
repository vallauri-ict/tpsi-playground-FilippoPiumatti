"option strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    const _lstCitta  =$("#lstCitta")
    const _lstGenere = $("#lstGeneri")
    const _btnFiltro  = $("#btnFiltro")
    const _tbody = $("table tbody");
	const _divDettagli =$("#divDettagli")
    
    _divDettagli.hide()    
    caricaComboCitta();
    caricaComboGenere();
    function caricaComboCitta() {
        let _li=$("<li>");
        _li.text("tutti");
        _li.appendTo(_lstCitta);

        let request=inviaRichiesta("get",URL +"/citta")
        request.fail(errore);
        request.done(function (citta) {
            for (const city of citta) {
                let li=$("<li>");
                li.text(city.citta);
                li.appendTo(_lstCitta);
                li.prop("citta",city);
            }
        })
    }
    function caricaComboGenere() {
        let _li=$("<li>");
        _li.text("tutti");
        _li.appendTo(_lstGenere);

        let request=inviaRichiesta("get",URL +"/generi")
        request.fail(errore);
        request.done(function (generi) {
            for (const genere of generi) {
                let li=$("<li>");
                li.text(genere.genere);
                li.appendTo(_lstGenere);
                li.prop("generi",genere);
            }
        })
    }
    
    



})