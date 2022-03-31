
/*
function tarea(done){
    console.log("desde la primer tarea");

    done(); //calback de gulp para indicar que ya termino. no importa el nombre
            //siempre y cuando se pase en el agrumentp de la funcion
}

function tarea2(done){
    console.log("Desde la segunda tarea")

    done();
}

//Haciendo tarea disponible para ejecutarse desde la terminal con gulp
//El nombre que se crea con el objeto exports.tarrea es con el cual se manda a llamar
// y tarea es la funcion asociada a ese nombre

 exports.tarea = tarea;
 exports.tarea2 = tarea2;

 */

const {src, dest, watch, parallel} = require("gulp"); //retorna multiples funciones. src identifica el archivo, dest toma una 
 //ubicacion para almacenar el archivo resultante. 

//CSS
const sass = require("gulp-sass")(require("sass")); //retorna una sola funcion que es la que compila. requiere 
//require("sass") espeficica hacia sass para ubicar el archivo de sass y aignarlo a la funcion
const plumber = require("gulp-plumber");

//los archivos y dependencias posteriores simplifican el codigo, pero no se van a utilzar por que lo dejan ilegible para propositos de aprendizaje
//const autoprefixer =  require("autoprefixer");
//const cssnano = require("cssnano");
//const postcss = require("gulp-postcss"); //simplifican el codigo de css en una sola linea
//const sourcemaps = require("gulp-sourcemaps");


//IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");



//FUNCIONES
function css(done){

    console.log("Compilando SASS..")
    // Paso 1. identificar el archivo .SCSS a compilar
     src("src/scss/**/*.scss") //**/* identifica de forma recursiva todos los archivos .SCSS
        .pipe(plumber()) //evita que se detenga la compilacion en caso de un error //genera las referencias del codigo css .pipe(sourcemaps.init()) 
        .pipe(sass()) //Paso 2. Compilarlo      .pipe(postcss([autoprefixer(),cssnano])) .pipe(sourcemaps.write(".")) //guarda las referecnias del codigo css
        .pipe(dest("build/css"))   //Paso 3 Almacenarlo

    console.log("Compilado")
     
     done();
     }

//funcion para aligerar imagenes

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src("src/img/**/*.{png,jpg}") 
    .pipe(cache(imagemin(opciones)))
    .pipe( dest("build/img"))
    done()

}

//funcion para transformar las imagenes a webp
function versionWebp (done){

    const opciones = {  //objeto de opciones
        quality: 50
    };

    src("src/img/**/*.{png,jpg}") //busca todas las imagenes que tengan esos formatos
        .pipe( webp(opciones)) //opciones de conversion y realiza conversion
        .pipe( dest("build/img"))  //almacenamiento de imagenes

    done();
}

//funcion para transformar las imagenes a avif
function versionAvif (done){

    const opciones = {  //objeto de opciones
        quality: 50
    };

    src("src/img/**/*.{png,jpg}") 
        .pipe( avif(opciones))
        .pipe( dest("build/img")) 

    done();
}

//funcion javascript. Toma el archivo de la carpeta de src a build
//para no subir todo el codigo fuente de src
function javascript(done){
    src("src/js/**/*.js")
    .pipe(dest("build/js"));

    done();
}

//funcion del watch para compilar con la funcion css en cada cambio del archivo de SASS 

function dev(done){ 

    watch("src/scss/**/*.scss",css); //archivo que escruha por cambios. cuando
    //detecta manda a llamra la funcion de css
    watch("src/js/**/*.js",javascript); // lo mismo para los archivos de js

    done();

}
    //con exports. las funciones se hacen disponobles
     exports.css = css;
     exports.js = javascript;
     exports.imagenes = imagenes;
     exports.versionWebp = versionWebp;
     exports.versionAvif = versionAvif;
     exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript, dev); //hace las funciones de forma paralela
   
