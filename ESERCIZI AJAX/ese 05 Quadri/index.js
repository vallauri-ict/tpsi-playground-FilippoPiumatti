"option strict"

const URL = "http://localhost:3000"
$(function () {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)
    let _wrapperAdd = $('.wrapper').eq(1);
    let SalvaQuadri;
    let SalvaGenere;
    
    let posizioneQuadro=0;

    let request= inviaRichiesta("get",URL+"/artisti");
    request.fail(errore);
    request.done(function artist(artisti) {

        for (const artista of artisti) {
            let _label= $("<label>");
            _label.appendTo(_head);
            let radio=$("<input type='radio'>");
            radio.prop("artista",artista);
            radio.prop("name","artisti");
            //radio.prop("type","radio");
            radio.appendTo(_label);
           _label.append(artista.name);_wrapperAdd.children("h1").text("isnerisci un nuovo quadro di "+ artista.name)
            //_label.html(_label.html()+artista.name);//se il name viene messo dopo label.html 
            //viene sovrascritto il riferimento
            //_label.prop("artista",artista);
        }
        let n=generaNumero(0,artisti.length-1)
        let opt= $("input[type='radio']").eq(n)
        opt.prop("checked",true);//senza spazi
        let idArtista=opt.prop("artista").id;
        SalvaQuadri=opt.prop("artista").gender;
        _wrapperAdd.children("h1").text("inserisci un nuovo quadro di "+opt.prop("artista").name);
        inviarichiestaQuadri(idArtista,opt.prop("artista").gender);
    })
    function inviarichiestaQuadri(idArtista,SalvaGenere) {
        let request2=inviaRichiesta("get",URL+"/quadri?artist="+ idArtista);
        request2.fail(errore);
        request2.done(function(quadri){
            visualizzaQuadro(quadri[0],SalvaGenere);
            //console.log(quadri);
            SalvaQuadri=quadri;

        })
    }
    _head.on("click","input",function () {
        let idArtista=$(this).prop("artista").id;
        let genere = $(this).prop("artista").gender;
        _wrapperAdd.children("h1").text("inserisci un nuovo quadro di "+$(this).prop("artista").name);
        SalvaGenere=genere;
        SalvaQuadri=$(this).prop("artista").gender
        inviarichiestaQuadri(idArtista,genere);
        //console.log(id);
    })
    _btnPrev.on("click",function () {
        posizioneQuadro--;
        if(posizioneQuadro==0)
        {
            $(this).prop("disabled",true);       
        } 
        visualizzaQuadro(SalvaQuadri[posizioneQuadro])
    })
    _btnNext.on("click",function () {
        _btnPrev.prop("disabled",false);
        posizioneQuadro++;
        if (posizioneQuadro==SalvaQuadri.length) {
            _btnNext.prop("disabled",true);
            visualizzaQuadro(SalvaQuadri[posizioneQuadro]);
        }
    })
    function visualizzaQuadro(quadro,SalvaGenere) {
        _info.empty();
        _img.empty();
        $("<p>").text("ID = "+ quadro.id).appendTo(_info);
        $("<p>").text("titolo: = "+ quadro.title).appendTo(_info);
        $("<p>").text("genere = "+ SalvaGenere).appendTo(_info);
       // $("<p>").text("like = "+ quadro.nLike).appendTo(_info);
        let img=$("<img>").prop("src","like.jpg").addClass("like");
        img.on("click",function () {
                 let request=inviaRichiesta("patch", URL +"/quadri/"+quadro.id,{
                 "nLike":quadro.nLike+1
            });
            request.fail(errore);
            request.done(function (quadro) {
                visualizzaQuadro(quadro);
            })
        })
        $("<p>").text("like = "+quadro.nLike).appendTo(_info).append(img);
        if(!quadro.img.includes("base64,")){
            $("<img>").prop("src","img/"+quadro.img).appendTo(_img);
        }
        else{
            $("<img>").prop("src",+quadro.img).appendTo(_img);
        }
        let _btnSalva=$("#btnSalva");
        let _btnAnnulla=$("#btnAnnulla");
        let _txtImmagine=$("#immagine");
        let _txtTitolo=$("#titolo");


        _btnSalva.on("click",function(){
            if((_txtTitolo.val()=="")||(_txtImmagine.prop("files")=="")){
                alert("Inserire titolo e immagine");
            }
            else
            {
                let filename=_txtImmagine.prop("files")[0];
                let reader=new FileReader();
                reader.readAsDataURL(filename);
                reader.onloadend=function(){
                    //console.log('RESULT',reader.result)
                    let idArtista=$("input[type='radio']:checked").prop("artista").id;
                    let jsonAus={
                        "artist":idArtista,
                        "title":_txtTitolo.val(),
                        "img":reader.result,
                        "nLike":0
                    }
                    let request=inviaRichiesta("post",URL+"/quadri",jsonAus);
                    request.fail(errore);
                    request.done(function(data){
                    console.log(data);
                    alert("Immagine inserita correttamente")
                    inviarichiestaQuadri(idArtista);
                })
               
                }
                
    
            }
        })
        
       
        
    }
})
