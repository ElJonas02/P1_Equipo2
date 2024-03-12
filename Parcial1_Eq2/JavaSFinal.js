     // Función para cerrar la ventana emergente
     function cerrarPopup() {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modal-sucursal').style.display = 'none';
    }

    // Función para mostrar la ventana emergente con el bxSlider
    function mostrarBxSliderPopup() {
        var popupContent = `
            <span class="close" onclick="cerrarPopup();">&times;</span>
            <h2>¿Qué vendemos?</h2>
            <div class="bxslider">
                <div>
                    <img src="img/Product1.jpg" alt="Componentes Electricos $$$" />
                    <p class="bx-caption">Componentes Electricos $$$</p>
                </div>
                <div>
                    <img src="img/Product2.jpg" alt="Herramientas $$$" />
                    <p class="bx-caption">Herramientas $$$</p>
                </div>
                <div>
                    <img src="img/Product3.jpg" alt="Caja de Herramientas $$$" />
                    <p class="bx-caption">Caja de Herramientas $$$</p>
                </div>
                <div>
                    <img src="img/Product4.jpg" alt="Cables $$$" />
                    <p class="bx-caption">Cables $$$</p>
                </div>
                <div>
                    <img src="img/Product5.jpg" alt="Cables para conexión $$$" />
                    <p class="bx-caption">Cables para conexión $$$</p>
                </div>
            </div>
            <p class="popup-text">Pregunte por disponibilidad. Cel: (999) 984 4812</p>
        `;
        // Mostrar la ventana emergente
        mostrarPopup(popupContent, 'modal');

        // Inicializar el bxSlider dentro de la ventana emergente
        $('.modal-content .bxslider').bxSlider({
            mode: 'fade',
            slideWidth: 450,
            pager: false,
            controls: true
        });
    }

    // Función para mostrar la ventana emergente del formulario
    function mostrarFormulario() {
        var popupContent = `
            <span class="close" onclick="cerrarPopup();">&times;</span>
            <h2>Contáctenos</h2>
            <form id="formContacto">
                <label for="nombre">Nombre:</label><br>
                <input type="text" id="nombre" name="nombre"><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br>
                <label for="tipo">Tipo de consulta:</label><br>
                <select id="tipo" name="tipo">
                    <option value="Dudas">Dudas</option>
                    <option value="Asesorías">Asesorías</option>
                    <option value="Informes sobre vacantes">Informes sobre vacantes</option>
                </select><br>
                <label for="mensaje">Mensaje:</label><br>
                <textarea id="mensaje" name="mensaje"></textarea><br>
                <input type="submit" value="Enviar">
            </form>
        `;
        mostrarPopup(popupContent, 'modal');

        // Manejar el envío del formulario de contacto
        $("#formContacto").submit(function(event) {
            event.preventDefault();
            // Aquí se puede agregar el código para enviar los datos del formulario a un servidor
            // En este caso, solo mostramos la alerta
            alert("Recibimos su información, pronto nos pondremos en contacto con usted");
            this.reset(); // Limpiar el formulario
            cerrarPopup(); // Cerrar la ventana emergente
        });
    }

    // Función para mostrar la ventana emergente de la sucursal
    function mostrarSucursal() {
        var popupContent = `
            <span class="close" onclick="cerrarPopup();">&times;</span>
            <h2>¡Ven a nuestra sucursal!</h2>
            <div id="mapa" style="width: 100%; height: 300px;"></div>
            <div class="direccion-horarios">
                <div>
                    <h3>Dirección:</h3>
                    <p>Edificio 3, Universidad Anáhuac Mayab, Mérida, Yuc. C.P.: 97302</p>
                </div>
                <div>
                    <h3>Horarios:</h3>
                    <p>Lunes a Viernes: 9:00 - 19:00</p>
                    <p>Sábados: 10:00 - 14:30</p>
                </div>
            </div>
        `;
        // Inicializar el mapa después de mostrar el popup
        var map = new google.maps.Map(document.getElementById('mapa'), {
            center: { lat: 21.111294713616207, lng: -89.61092879086408 },
            zoom: 16
        });

// Marcar la ubicación de la sucursal en el mapa
var marker = new google.maps.Marker({
    position: { lat: 21.111294713616207, lng: -89.61092879086408 },
    map: map,
    title: 'Electronics Mayab'
});
mostrarPopup(popupContent, 'modal-sucursal');


    }

    // Función para mostrar una ventana emergente genérica
    function mostrarPopup(content, modalId) {
        // Mostrar la ventana emergente
        document.getElementById(modalId).style.display = 'block';
        // Insertar el contenido en la ventana emergente
        document.querySelector(`#${modalId} .modal-content`).innerHTML = content;
    }

    function mostrarFechaHoraUbicacion() {
        // Obtener la fecha y hora actual
        var fechaHora = new Date();
        var fechaHoraString = fechaHora.toLocaleString();
    
        // Obtener la ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitud = position.coords.latitude;
                var longitud = position.coords.longitude;
    
                // Crear un enlace a Google Maps con la ubicación del usuario
                var ubicacionLink = '<a href="https://www.google.com/maps?q=' + latitud + ',' + longitud + '" target="_blank">Ver ubicación</a>';
    
                // Mostrar la fecha, hora y ubicación en la página
                document.getElementById('fecha-hora-ubicacion').innerHTML = fechaHoraString + '<br>' + ubicacionLink;
            }, function(error) {
                console.error('Error al obtener la ubicación: ' + error.message);
                // Mostrar solo la fecha y hora si hay un error al obtener la ubicación
                document.getElementById('fecha-hora-ubicacion').textContent = fechaHoraString;
            });
        } else {
            console.error('La geolocalización no está disponible en este navegador.');
            // Mostrar solo la fecha y hora si la geolocalización no está disponible
            document.getElementById('fecha-hora-ubicacion').textContent = fechaHoraString;
        }
    }
    
    // Llamar a la función una vez para mostrar la fecha, hora y ubicación inicial
    mostrarFechaHoraUbicacion();
    // Actualizar la fecha, hora y ubicación cada segundo
    setInterval(mostrarFechaHoraUbicacion, 1000);    

    var formulario = document.getElementById('formulario'),
    nombre = formulario.nombre,
    correo = formulario.correo,
    error = document.getElementById('error');

    function validarName(e){
        if (nombre.value =='' || nombre.value == null){
            error.style.display = 'block';
            error.innerHTML += '<li>Complete name</li>';
            alert('Please add a name');
            e.preventDefault();
            } else {
            error.style.display = 'none';
        }
    }
    
    function validarEmail(e){
        if (correo.value == '' || correo.value == null) {
            error.style.display = 'block';
            error.innerHTML +='<li>Complete email</li>';
            alert('Please add an email');
            e.preventDefault();
        } else {
            error.style.display = 'none';
        }
    }

    function validarForm(e) {
        // Reiniciamos el error para que inicie sin mensaje. 
        error.innerHTML = '';
        
        validarName(e);
        validarEmail(e);
        
        // Manejar el envío del formulario de contacto
        if (error.innerHTML === '') {
            e.preventDefault();
            alert("Recibimos su información, pronto nos pondremos en contacto con usted");
            formulario.reset(); // Limpiar el formulario
            cerrarPopup(); // Cerrar la ventana emergente
        }
    }
    
    formulario.addEventListener('submit', validarForm);