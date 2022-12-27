window.addEventListener('load', function(){

    let esMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    /* portfolio carousel load */
    const portfolio = new Glider(document.querySelector('.portfolio__carousel'), {
        slidesToShow: (esMobile ? 2 : 3),
        slidesToScroll: 1,
        dots: '.portfolio_dots',
        arrows: {
            prev: '.portfolio__glider-prev',
            next: '.portfolio__glider-next'
        }
    });

    /* services carousel load */
    const services = new Glider(document.querySelector('.services__carousel'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.services_dots',
        arrows: {
            prev: '.services__glider-prev',
            next: '.services__glider-next'
        }
    });

    /* el carousel de clientes con autoplay*/
    /*autoSlide(); */

    /*desktop icons*/
    if (!(esMobile)) {
        /* cambio los iconos */
        right_buttons = document.querySelectorAll(".right_button");
        right_buttons.forEach((e)=>{e.setAttribute('src','img/icons/chevron_right.png')});
        left_buttons = document.querySelectorAll(".left_button");
        left_buttons.forEach((e)=>{e.setAttribute('src','img/icons/chevron_left.png')});
        this.document.querySelector(".exit_button").setAttribute('src','img/icons/exit.png');
        this.document.querySelector(".about_us__img").setAttribute('src','img/about.jpg');
        
        /* agrando el about_us */
        this.document.querySelector(".about_us__text").innerHTML = `<h3 class="about_us__text__subtitle">Alejandra y Lucía</h3>
        <p class="about_us__text__p">Hola! Estamos acá para ofrecerte todo nuestro conocimiento. Somos un equipo de chicas expertas en lo que hacemos, Marketing Digital (Ale) y Diseño Audiovisual (Lu).</p>
        <p class="about_us__text__p">Nos unimos con un único propósito, hacer crecer a marcas cuyos productos o servicios merecen ser conocidos. <br>Nuestras carreras universitarias nos dieron las herramientas para aplicar el conocimiento a redes sociales de una forma íntegra.</p>
        <p class="about_us__text__p">No somos cualquier creadora de contenido. Nuestras bases son sólidas y realmente nuestra meta es ayudarte a crecer. Nuestra filosofía es que cualquier negocio merece un contenido de calidad sea el estado en el que este, recien comenzando o ya con años de funcionamiento.</p>
        <p class="about_us__text__p">Siempre se puede ser mejor y tener más ventas y para eso venimos nosotras, para lograrlo!</p>`

    }
});


/*********************************************************************************************************************/

var headersPositions;
if (!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))) {
    headersPositions = {
        "portfolio_button": "728",
        "contactanos_button": "5000",
        "servicios_button": "2159",
        "clientes_button": "2968",
        "logo_button": "0"
    }
}else {
    headersPositions = {
        "portfolio_button": "607",
        "contactanos_button": "5000",
        "servicios_button": "2147",
        "clientes_button": "2949",
        "logo_button": "0"
    }
};

let header_buttons = document.querySelectorAll(".header_button");
header_buttons.forEach((e)=>{
    e.addEventListener("click", (e)=>{
        let position = parseInt(headersPositions[e.target.getAttribute("id")]);
        window.scroll({top: position, behavior: 'smooth' });
        if(modal.style.opacity == "1") cerrarModal();
    })
});

/*********************************************************************************************************************/

var modal = document.querySelector(".modal");

const borrarImagenesModal = ()=>{
    gallery.innerHTML = "";
}

const abrirModal = ()=>{
    modal.style.opacity = "1";
    modal.style.zIndex = "1";
    document.body.style.overflowY = "hidden";
}
const cerrarModal = ()=>{
    modal.style.opacity = "0";
    modal.style.zIndex = "-1";
    document.body.style.overflowY = "visible";
    borrarImagenesModal();
}

var gallery = document.querySelector(".gallery");
const cargarImagenesModal = (filesDirectory, filesType, filesQty, title)=>{
    document.querySelector(".modal_title").innerHTML = title
    if(filesType == ".jpg"){
        gallery.innerHTML +=`<img class="gallery_img" src="${filesDirectory}cover${filesType}" >`;
        for(let i=1; i<=parseInt(filesQty); i++){
            gallery.innerHTML +=`<img class="gallery_img" src="${filesDirectory}${i}${filesType}" >`;
        }   
    }
    else if(filesType == ".mp4"){
        if(parseInt(filesQty)==1){
            gallery.innerHTML +=`<video class="unique_video" src="${filesDirectory}1${filesType}" controls="" controlsList="nodownload">`;
        }
        else{
            for(let i=1; i<=parseInt(filesQty); i++){
                gallery.innerHTML +=`<video class="gallery_vid" preload="metadata" loop src="${filesDirectory}${i}${filesType}" controls="" controlsList="nodownload">`;
            }
        }    
    }
}

let carouselElement = document.querySelectorAll(".portfolio__carousel_element");
carouselElement.forEach((e)=>{
    e.addEventListener("click", (e)=> {
        let src = e.currentTarget.getAttribute("data-src"); 
        let fileType = e.currentTarget.getAttribute("data-type");
        let filesQty = e.currentTarget.getAttribute("data-qty");
        let title = e.currentTarget.getAttribute("data-title");
        abrirModal();
        cargarImagenesModal(src, fileType, filesQty, title);
    })
});

let botonExitGallery = document.querySelector(".gallery_exit");
botonExitGallery.addEventListener("click", ()=>{cerrarModal()} );


/*********************************************************************************************************************/

let prevent_enter_buttons = document.querySelectorAll(".prevent_enter");

prevent_enter_buttons.forEach((e)=>{
    e.addEventListener("keypress", (e)=>{
        if (e.key === "Enter") {e.preventDefault();}
    });
});

var contactanos_nombre = document.getElementById("contactanos_nombre");
var contactanos_email = document.getElementById("contactanos_email");
var contactanos_telefono = document.getElementById("contactanos_telefono");

const emailValido = (elementoEmail) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(elementoEmail.value)) };

const estaVacio = (elemento) => { return (elemento.value == "") };

async function handleSubmit(event) {
    event.preventDefault();

    var status = document.getElementById("my-form-status");
    if (!(emailValido(contactanos_email))){
        status.innerHTML = "Campo Email no válido";
        return;
    } 
    if (estaVacio(contactanos_nombre)){
        status.innerHTML = "Debe ingresar un nombre";
        return;
    } 
    if (estaVacio(contactanos_telefono)){
        status.innerHTML = "Debe ingresar un telefono de contacto";
        return;
    } 

    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.style.color = 'black';
            status.style.fontSize = '18px';
            status.innerHTML = "En breve te contactaremos!";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.innerHTML = "Lo sentimos, Hubo un problema al enviar el formulario"
            }
        })
      }
    }).catch(error => {
      status.innerHTML = "Lo sentimos, Hubo un problema al enviar el formulario"
    });
    
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '745113870021319');
	fbq('track', 'CompleteRegistration');

}

var form = document.getElementById("my-form");
form.addEventListener("submit", handleSubmit);

/*********************************************************************************************************************/

document.querySelector(".clientes_prev").addEventListener("click", ()=>{slide(getItemActiveIndex() - 1)} )
document.querySelector(".clientes_next").addEventListener("click", ()=>{slide(getItemActiveIndex() + 1)} )

/*
function autoSlide() {
    setInterval(() => {
       slide(getItemActiveIndex() + 1);
    }, 7000);
}
*/

function slide(toIndex) {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
 
    // check if toIndex exceeds the number of carousel items
    if (toIndex >= itemsArray.length) {
       toIndex = 0;
    }
 
    const newItemActive = itemsArray[toIndex];
 
    // start transition
    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
       newItemActive.classList.add("carousel_item__next");
       itemActive.classList.add("carousel_item__next");
    }, 20);
 
    // remove all transition class and switch active class
    newItemActive.addEventListener("transitionend", () => {
       itemActive.className = "carousel_item";
       newItemActive.className = "carousel_item carousel_item__active";
    }, {
       once: true
    });
}
 
function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}

/*********************************************************************************************************************/

/*
var bCheckEnabled = true;
var bFinishCheck = false;
var img;
var imgArray = new Array();
var i = 0;
var myInterval = setInterval(loadImage, 1);
function loadImage() {
    if (bFinishCheck) {
        clearInterval(myInterval);
        document.write('Loaded ' + i + ' image(s)');
        return;
    }
    if (bCheckEnabled) {
        bCheckEnabled = false;
        img = new Image();
        img.onload = fExists;
        img.onerror = fDoesntExist;
        img.src = 'assets/' + i + '.png';
        document.write('<img src="assets/' + i + '.png" width="1016" height="813" alt="Kar" />');

    }
}
function fExists() {
    imgArray.push(img);
    i++;
    bCheckEnabled = true;
}
function fDoesntExist() {
    bFinishCheck = true;
}
*/

/*
var xhr = new XMLHttpRequest();
xhr.open("GET", "/img", true);
xhr.responseType = 'document';
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    for (x of elements) {
      if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
          let img = document.createElement("img");
          img.src = x.href;
          document.body.appendChild(img);
      } 
    };
  } 
  else {
    alert('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send()
 */

/*CARGAR LISTADO Y USAR FOREACH */