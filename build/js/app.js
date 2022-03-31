document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
}); //espera a que carge el documento

function iniciarApp(){

    navegacionFija();
    crearGaleria();
    scrollNav();
}

//funcion para que la barra de scroll se mantenga en pantalla
//cuando se llega a la seccion de sobre festival
function navegacionFija(){ 
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll",function(){

        console.log(sobreFestival.getBoundingClientRect()); //regresa las propiedades de las distancias a las que se encuentra respecto a la pantalla

        if(sobreFestival.getBoundingClientRect().top < 0){ //significa que ya paso la parte superior al elemento de la clase .sobre-festival
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        }
        else{
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }

    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll(".navegacion-principal a")

    enlaces.forEach(function(enlace){ //itera en cada uno de los elementos
        enlace.addEventListener("click", function(e){
            e.preventDefault(); //evita accion por defecto, para que no lleve de golpe al id

            console.log(e.target.attributes.href.value); //e es a lo que se le ha dado clic y toma solo el valor del atributo href
            const seccion = document.querySelector(e.target.attributes.href.value); //va a seleccionar el id correspondiente al elemento seleccionado

            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

//funcion de la galeria
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i  = 1; i <= 12; i++){
        const imagen = document.createElement("picture"); //crea las etiquetas html de picture 12 veces para las imagenes
        imagen.innerHTML = 
        `
            <source srcset="build/img/thumb/${i}.avif" type = "image/avif">
            <source srcset="build/img/thumb/${i}.webp" type = "image/webp">
            <img loading= "lazy" width= "200" height= "300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">

        `;

        imagen.onclick = function () { //como callback para pasar el indice de la imagen
            console.log(`${i} presionado`);
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
        console.log(i);

    }
}

function mostrarImagen(id){
    const imagen = document.createElement("picture"); 
    imagen.innerHTML = 
    `
        <source srcset="build/img/grande/${id}.avif" type = "image/avif">
        <source srcset="build/img/grande/${id}.webp" type = "image/webp">
        <img loading= "lazy" width= "200" height= "300" src="build/img/grande/${id}.jpg" alt="imagen galeria">

    `;

    //crea el overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    //para que se cierre cuando se de click en cualquier lugar
    overlay.onclick = function(){
        overlay.remove(); //elimina el overlay
        
        //elimina la clase creada para evitar que se de scroll
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
    }

    //Boton para cerrar el modal
    const cerrarFoto = document.createElement("P");
    cerrarFoto.textContent = "X";
    cerrarFoto.classList.add("btn-cerrar");

    cerrarFoto.onclick = function(){
        overlay.remove(); //elimina el overlay
        
        //elimina la clase creada para evitar que se de scroll
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");

    }
    overlay.appendChild(cerrarFoto);

    //añade al html mostrando imagenes en el body
    const body = document.querySelector("body");
    body.appendChild(overlay);
    //evitar el scroll
    body.classList.add("fijar-body");
}