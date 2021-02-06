 "use strict"

 $(document).ready(function(){
     let cont=0;
     let _wrapper=$("#wrapper");
     let _timer=$("#timer");
     let _header=$("#header");
     let _mainSection=$("#mainSection");
     animazioneIniziale();
     function animazioneIniziale() {
          _header.animate({"height":6*15,"width":60*15 ,"font-size":2*15,"line-heigth":6*15},1500,creaElementi);
     }
     
     
          function creaElementi() {
               
               for (var item1 of elencoDomande) {
                    let fieldset = $("<fieldset>");
                    fieldset.addClass("fieldset");
                    fieldset.appendTo(_mainSection);

                    let legend =$("<legend>");
                    legend.text(item1.argomento);
                    legend.css({"color":"blue","font-size":12});
                    legend.appendTo(fieldset);
                    
               }
               for (var item2 of item1.domande) {
                    cont++;
    
                    let domanda = $("<p>");
                    domanda.text(item2.domanda);
                    domanda.appendTo(fieldset);
    
                    let radioT = $("<input>");
                    radioT.prop({ "type": "radio", "name": `opt${cont}`, "value": "T" });
                    radioT.appendTo(domanda);
    
                    let lblT = $("<label>");
                    lblT.text("T");
                    lblT.prop("id", "lbl");
                    lblT.appendTo(domanda);
    
                    let radioF = $("<input>");
                    radioF.prop({ "type": "radio", "name": `opt${cont}`, "value": "F" });
                    radioF.appendTo(domanda);
    
                    let lblF = $("<label>");
                    lblF.text("F");
                    lblF.prop("id", "lbl");
                    lblF.appendTo(domanda);
    
                    if (item2.risposta == "T") {
                        radioT.prop("risposta", "ok");
                        radioF.prop("risposta", "nok");
                    } else {
                        radioT.prop("risposta", "nok");
                        radioF.prop("risposta", "ok");
                    }
                }
            }
     });


 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
