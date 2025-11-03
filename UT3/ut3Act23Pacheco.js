//Mosrtar mensaje de alerta
alert("Bienvenido a esta pagina web");

//Mostrar el idioma del navegador
const parrafo = document.getElementById("idioma");
if(navigator.language.startsWith("es")){
    parrafo.innerHTML = "Idioma de la web: "+navigator.language;
    //Cambiar el fondo del documento si el idioma es español
    document.body.style.backgroundImage = "url('https://www.shutterstock.com/shutterstock/videos/1108554291/thumb/1.jpg?ip=x480')";
}else{
    parrafo.innerHTML = "Idioma de la web: "+navigator.language;
    // Cambiar el fondo si el idioma es en otro que no sea español
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "blue";
}

//Mostrar por consola la url actual
console.log("URL de la web actual: ", location.href);

//Cambiar el titulo de la pagina a "Torneo de Ajedrez online
console.log(document.title);
document.title = "Torneo de Ajedrez Online"
console.log(document.title);

//Mostrar tamaño de la ventana
const tamanyo = document.getElementById("tamanyo");
tamanyo.innerHTML = "Alto de la ventana: " + innerHeight + "\n Ancho de la ventana: "+ innerWidth;