$.fn.mirandajs = function(data, options) {
    // configuração padrão
    var settings = $.extend({
            jsonNode:[''],
            containers:[this.attr('id')],
            effect:'show',
            delay:5000,
            ajaxMethod:'GET',
            postData:{},
            noCache: false
    }, options);

    /* Tratamento de erros na passagem de parâmetros */
    if(!$.isArray(settings.jsonNode)){
        alert('ERRO: jsonNode needs to be a array. Ex: ["'+settings.jsonNode+'"]');
        return;
    }
    if(settings.jsonNode.length != settings.containers.length){
        alert('ERRO: The length of jsonNode and containers must be equal.');
        return;
    }

    /* Pega a lista correta do JSON e interage com o destino */
    function mirandaParse(JSON, jsonNode){
        var HTML_SAIDA = '';
        var JSON_NODE = JSON;
        if(jsonNode != ''){
            JSON_NODE = eval('JSON.'+jsonNode);
        }
        if($.isArray(JSON_NODE)){
            for(var k in JSON_NODE) {
                HTML_SAIDA += mirandaReplace(JSON_NODE[k]);
            }
        }else{
            HTML_SAIDA += mirandaReplace(JSON_NODE);
        }
        HTML_OBJ.html(HTML_SAIDA);
        if(settings.delay == 0){
            eval('HTML_OBJ.'+settings.effect+'()');
        }else{
            eval('HTML_OBJ.'+settings.effect+'("'+settings.delay+'")');
        }

        /* Se ainda tiver nodes para processar, faz a recursividade passando para o próximo índice */
        if((JSON_NODE_INDEX+1) < JSON_NODE_TOTAL){
            JSON_NODE_INDEX++;
            HTML_OBJ = $('#'+settings.containers[JSON_NODE_INDEX]);
            HTML_BASE = HTML_OBJ.html();
            setTimeout(function(){
                mirandaParse(JSON, settings.jsonNode[JSON_NODE_INDEX]);
            }, settings.nodeDelay);
        }
    }

    /* Subistitui as chaves pelos valores */
    function mirandaReplace(obj){
        var HTML_TEMP = HTML_BASE;
        keys = $.map(obj, function(v, i){
            HTML_TEMP = HTML_TEMP.split('[['+i+']]').join(v);
        });
        return HTML_TEMP;
    }
    /* Verifica se é uma url para executar ajax ou não */
    function mirandaIsURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    /* Início */
    var HTML_OBJ = $('#'+settings.containers[0]);
    var HTML_BASE = HTML_OBJ.html();
    var JSON_NODE_INDEX = 0;
    var JSON_NODE_TOTAL = settings.jsonNode.length;

    if(typeof data == 'string'){
        if(settings.noCache){
            var concatUrl = '?';
            if(data.indexOf(concatUrl) != -1) {
                concatUrl = '&';
            }
            data += concatUrl + 'nocache=' + $.now();
        }
        if(settings.ajaxMethod.toUpperCase() == 'GET'){
            $.get( data, function( data ) {
                mirandaParse(data, settings.jsonNode[JSON_NODE_INDEX]);
            });
        }else{
            $.post(data, settings.postData, function(retorno) {
                data = retorno;
                mirandaParse(data, settings.jsonNode[JSON_NODE_INDEX]);
            }, 'json');
        }
    }else{
        mirandaParse(data, settings.jsonNode[JSON_NODE_INDEX]);
    }
};