//init var
var lastnbenfant
var json = '[{"name":"HTML/CSS","type":"folder","src":"img/folder.png","dossier":[{"name":"flex","sous_dossier":[]},{"name":"javascript","sous_dossier":[]}]},{"name":"VB/C#","type":"folder","src":"img/folder.png","dossier":[{"name":"boucle","sous_dossier":[]},{"name":"condition","sous_dossier":[]}]},{"name":"Python","type":"folder","src":"img/folder.png","dossier":[{"name":"nombre premier","sous_dossier":[]},{"name":"convertiseur de base","sous_dossier":[]}]},{"name":"SQL","type":"folder","src":"img/folder.png","dossier":[{"name":"Gestion d’une discothèque","sous_dossier":[{"name":"blabla1","type":"safari","url":"https://boxicons.com/?query=nav"},{"name":"blabla2","type":"vs"}]},{"name":"Serres du jardin Citroën","sous_dossier":[]},{"name":"Gestion de la section BTS SIO.","sous_dossier":[]},{"name":"Subventions européennes","sous_dossier":[]},{"name":"Armor Company","sous_dossier":[]}]}]'
var app = JSON.parse(json)
var appdiv
var mousePosition;
var offset = [0,0];
var isDown = false;
var lastfolder
var nextfolder



//fonction date et heure
setInterval("dateEtheure()", 1000)
function dateEtheure(){
    var aujourdhui = new Date();
    var jours = aujourdhui.getDay()
    var heure = aujourdhui.getHours()
    if(heure < 10){
        heure = '0'+heure
    }
    var minute = aujourdhui.getMinutes()
    if(minute < 10){
        minute = '0'+minute
    }
    var heureActu = heure + ":" + minute
    var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    document.getElementById('dateEtheure').innerHTML = tab_jour[jours] + ", " + heureActu
}

//fonction au chargement du body
function init(){
    redim();
    dateEtheure()
    appInit()
    // fetch fichier json dans app
    //fetch('data.json').then(function (response) {
    //    if (response.ok) {
    //        response.json().then(function (json) {
    //            app = json;
    //        });
    //    }else{
    //        console.log('Network request for app.json failed with response ' + response.status + ': ' + response.statusText);
    //    }
    //}).catch(console.error);
    
    
}

//function add app sur le bureau
function appInit(){
    var corps = document.getElementById('corps')
    for(i=0;i<app.length;i++){
        corps.childNodes[i+1].removeAttribute("ondragover")
        var div = document.createElement('div')
        div.setAttribute("draggable","true")
        var img = document.createElement('img')
        div.setAttribute("ondblclick","dbclickdossier(this)");
        img.setAttribute("draggable","false")
        img.src = app[i].src
        div.style.cursor = "pointer"
        var p = document.createElement('p')
        p.textContent = app[i].name
        corps.childNodes[i+1].appendChild(div)
        div.appendChild(img)
        div.appendChild(p)
        div.parentElement.className = "emp dossier_bureau"
    }
}



//fonction d'ajout et de suppression des enfant de corps au redimensionnement
function redim(){
    var body = window.getComputedStyle(document.getElementById('body')).height;
    document.getElementById('corps').style.height = (body.substring(0,body.length-2)-40) +"px";
    var corpsStyle =  window.getComputedStyle(document.getElementById('corps'));
    var corps = document.getElementById('corps');
    var height = corpsStyle.height;
    var width = corpsStyle.width;
    height = parseInt(height.substring(0,height.length-2));
    width = parseInt(width.substring(0,width.length-2));
    if (lastnbenfant === undefined){lastnbenfant=0}
    var nbenfant = Math.floor(height/60)*Math.floor(width/60);
    if (lastnbenfant < nbenfant){
        for(i=0;i<(nbenfant-lastnbenfant);i++)
        {
            var div = document.createElement('div');
            div.id = i+lastnbenfant
            div.setAttribute("ondragover","allowDrop(event)");
            div.setAttribute("ondragstart","getstart(event)");
            div.setAttribute("ondrop","drop(event)");
            div.className = 'emp';
            corps.appendChild(div);
        }
    }
    else if(lastnbenfant > nbenfant){
        for(i=0;i<(lastnbenfant-nbenfant);i++)
        {
            if(corps.childNodes[corps.childElementCount].innerHTML == ""){
                corps.removeChild(corps.childNodes[corps.childElementCount]);
            }
            else{
                var n = 1
                while(corps.childNodes[corps.childElementCount-n].innerHTML != ""){
                    n+=1
                }
                corps.childNodes[corps.childElementCount-n].innerHTML = corps.childNodes[corps.childElementCount].innerHTML;
                corps.removeChild(corps.childNodes[corps.childElementCount]);
            }
        }
    }
    lastnbenfant = nbenfant;
}

//fonctions drag/drop
    //fonction drag
    function getstart(event)
    {
        event.dataTransfer.setData("Text", event.currentTarget.id);
    }
    //fonction drop
    function drop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
        var start = document.getElementById(data).innerHTML;
        var target = event.currentTarget.innerHTML;
        var tempo = start
        document.getElementById(data).innerHTML = target
        event.target.innerHTML = tempo
        document.getElementById(data).setAttribute("ondragover","allowDrop(event)");
        event.currentTarget.removeAttribute("ondragover")
        //event.target.appendChild(document.getElementById(data));
    }

    //fonction accepter le drop
    function allowDrop(event) {
        event.preventDefault();
    }
//fin fonctions drag/drop


//fonction overture appli sur le bureau
function dbclickapp(){
    var body = document.getElementById('body')
    var app = document.createElement('div')
    var barre = document.createElement('div')
    var fermer = document.createElement('div')
    var avant = document.createElement('div')
    var apres = document.createElement('div')
    fermer.id = 'fermer';app.id = 'appFolder'; barre.id = 'barre';avant.id = 'avant';apres.id = 'apres';
    fermer.style.cursor = "pointer"
    app.appendChild(barre);
    barre.appendChild(avant)
    barre.appendChild(apres)
    barre.appendChild(fermer)


    body.appendChild(appFolder)
}

//fonction ouverture dossier mere
function dbclickdossier(elem){
    var body = document.getElementById('body')
    var appFolder = document.createElement('div')
    var sous_dossier = document.createElement('div')
    var barre = document.createElement('div')
    var fermer = document.createElement('div')
    var avant = document.createElement('div')
    var apres = document.createElement('div')
    barre.setAttribute('onmousedown','foldermousedown(this,event)')
    barre.setAttribute('onmouseup','foldermouseup()')
    barre.setAttribute('onmousemove','foldermousemove(this,event)')
    fermer.setAttribute('onclick','fermer(this)')
    avant.setAttribute('onclick','last_folder()')
    apres.setAttribute('onclick','next_folder()')
    fermer.id = 'fermer';appFolder.id = 'appFolder'; barre.id = 'barre';avant.id = 'avant';apres.id = 'apres';sous_dossier.id = 'sous_dossier'
    fermer.style.cursor = "pointer"
    appFolder.appendChild(barre);
    barre.appendChild(avant)
    barre.appendChild(apres)
    barre.appendChild(fermer)
    for(i=0;i<app.length;i++){
        if(app[i].name == elem.parentElement.innerText){
            sous_dossier.className = app[i].name
            for(j=0;j<app[i].dossier.length;j++){
                var folder = document.createElement('div')
                folder.setAttribute("ondblclick","dbclicksous_dossier(this)")
                var p = document.createElement('p')
                p.innerText = app[i].dossier[j].name
                folder.id = app[i].dossier[j].name
                folder.className = "dossier"
                folder.appendChild(p)
                sous_dossier.appendChild(folder)
            }
        }
    }
    appFolder.appendChild(sous_dossier)
    body.appendChild(appFolder)
}
//fonction ouverture sous_dossier
function dbclicksous_dossier(elem){
    document.getElementById('apres').style.opacity = 0.5
    document.getElementById('apres').style.cursor = 'default'
    nextfolder = ''
    var idparent = elem.parentElement.className
    var idelem = elem.id
    lastfolder = elem.parentElement.innerHTML
    elem.parentElement.innerHTML = ''
    for(i=0;i<app.length;i++){
        if(app[i].name == idparent){
            for(j=0;j<app[i].dossier.length;j++){
                if(app[i].dossier[j].name == idelem){
                    for(k=0;k<app[i].dossier[j].sous_dossier.length;k++){
                        var folder = document.createElement('div')
                        var p = document.createElement('p')
                        p.innerText = app[i].dossier[j].sous_dossier[k].name
                        folder.id = app[i].dossier[j].sous_dossier[k].name
                        folder.className = app[i].dossier[j].sous_dossier[k].type  
                        if (folder.className == 'safari'){
                            folder.setAttribute('ondblclick','goUrl("'+app[i].dossier[j].sous_dossier[k].url+'")')
                        }
                        folder.appendChild(p)
                        document.getElementsByClassName(idparent)[0].appendChild(folder)
                    }
                }
            }
        }
    }
    document.getElementById('avant').style.opacity = 1
    document.getElementById('avant').style.cursor = "pointer"
}
//fonction dernier dossier ouvert
function last_folder(){
    document.getElementById('avant').style.opacity = 0.5
    document.getElementById('avant').style.cursor = 'default'
    document.getElementById('apres').style.opacity = 1
    document.getElementById('apres').style.cursor = "pointer"
    nextfolder = document.getElementById('appFolder').childNodes[1].innerHTML
    document.getElementById('appFolder').childNodes[1].innerHTML = lastfolder
}
//fonction prochain dossier ouvert
function next_folder(){
    document.getElementById('apres').style.opacity = 0.5
    document.getElementById('apres').style.cursor = 'default'
    document.getElementById('avant').style.opacity = 1
    document.getElementById('avant').style.cursor = "pointer"
    lastfolder = document.getElementById('appFolder').childNodes[1].innerHTML
    document.getElementById('appFolder').childNodes[1].innerHTML = nextfolder
}
//fonction fermer dossier
function fermer(elem){
    var appFolder = elem.parentElement.parentElement
    var body = appFolder.parentElement
    body.removeChild(appFolder)
}

//fonction ouvrir une url
function goUrl(lien){
    window.open(lien,'_blank').focus;
}
// event deplacer appdiv avec la souris
    function foldermousedown(elem,e){
        isDown = true;
        offset = [
            elem.parentElement.offsetLeft - e.clientX,
            elem.parentElement.offsetTop - e.clientY
        ];
    };

    function foldermouseup() {
        isDown = false;
    };

    function foldermousemove(elem,event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {

                x : event.clientX,
                y : event.clientY

            };
            elem.parentElement.style.left = (mousePosition.x + offset[0]) + 'px';
            elem.parentElement.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    };
// fin event deplacer appdiv avec la souris




// event deplacer appdiv avec le tactile


//appdiv.addEventListener('touchstart', function(e) {
//    isDown = true;
//    offset = [
//        appdiv.parentElement.offsetLeft - e.touches[0].clientX,
//        appdiv.parentElement.offsetTop - e.touches[0].clientY
//    ];
//}, true);

//document.addEventListener('touchend', function() {
//    isDown = false;
//}, true);

//document.addEventListener('touchmove', function(event) {
//    event.preventDefault();
//    if (isDown) {
//        mousePosition = {

//            x : event.touches[0].clientX,
//            y : event.touches[0].clientY

//        };
//        appdiv.parentElement.style.left = (mousePosition.x + offset[0]) + 'px';
//        appdiv.parentElement.style.top  = (mousePosition.y + offset[1]) + 'px';
//    }
//}, true);
