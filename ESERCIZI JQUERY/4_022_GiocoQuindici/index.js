'use strict'

const DIM = 4;

$(document).ready(function () {
    let wrapper = $("#wrapper");
    let larghezza
    let first=false;
    creaElementi();
    assegnaValori();


    ////******FUNCTIONS**********/
   
    function creaElementi(){
         // creazione matrice di elementi
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = $("<div>");
            div.addClass("pedina");
            if(first){
                larghezza= div.css("width")+
                div.css("margin-left")+
                div.css("border-left-width")+
                div.css("padding-left"*2);
            }
            console.log(larghezza);
            div.css({"top":larghezza*i,"left":larghezza*j})
            //div.appendTo(wrapper);
        }
    }
    }
    function assegnaValori(){
        let numeri=[16];//crea un vettore lungo 1 contenente 16

       /* for (let i = 0; i < 15; i++) {
           numeri[i]=(i+1);
            
        }
        numeri[15]="";
        for (let i = 0; i < DIM; i++) {
           for (let j = 0; j < DIM; j++) {
               
           }
            
        }*/
        let divs=wrapper.children("div");
        divs.each(function(i,ref) {
            let n=GeneraNumero(0,numeri.length);
            $(ref).on("click",move);
            numeri.splice(pos,1);
        })
    }
    function GeneraNumero(max,min) {
        let n=math.floor((max-min+1)*math.random()*min)
        return n;
    }
    function move() {
        let id=this.id//js
        let id2=$(this).prop("id");//jQuery
        let aus = id.split('-');
        let i=aus[1];
        let j= aus[3];
        if(j > 0  && $('#btn-i-j')){

        }
        let id=cella1.prop("id");
        cella1.prop("id)")
        if(true==false){
            alert("brvissimo hai vinto...")
        }
        else
            alert("hai perso")
      

    }
    function controllaVincita() {
        let old=0;
    }
    }
})