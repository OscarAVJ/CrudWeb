const API_URL = "https://retoolapi.dev/21U3Ut/integrantes"

///Lo hacemos asincrono porque vamos a hacer una peticion a un servidor y esto puede tardar
async function getTeamMembers() {
    ///Response de la api
    const response = await fetch(API_URL);
    ///Converir a json
    const data = await response.json();
    ///Llamar a la funcion que recibe el json
    showTeamMembers(data);
}
///Funcion para recibir JSON
function showTeamMembers (data){
    ///Aca podemos hacer una peticion pero a id, a clase etc
    ///Con # llamas al id y con . a la clase y con un enlace para su tbody
    const table = document.querySelector("#tabla_equipo tbody")
    ///Injectar el html con "innerHTML"

    //! Cada vez que nosotros llamemos a esta funcion, se va a limpiar el contenido de la tabla
    table.innerHTML = ""
    data.forEach(element => {
        table.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.email}</td>
            <td>${element.rol}</td>
            <td>
                <button>Editar</button>
                <button onclick="deleteMember(${element.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}
getTeamMembers();

///Proceso para agregar integrante
const modal = document.querySelector("#modalAgregar")
const btnAgregar = document.querySelector("#btnAgregar");
const btnCerrarModal = document.querySelector("#btnClose");
btnAgregar.addEventListener("click", ()=>{
    ///Mostrar el modal
    modal.showModal();
})
btnCerrarModal.addEventListener("click",()=>{
    modal.close();
})
///Agregar nuevo integrante desde el formulario
document.querySelector("#frmAgregar").addEventListener("submit",async e =>{
    e.preventDefault();///e reperesnta a submit y evita el formulario se envie de un solo
    ///Capturar los datos del formulario
    const nombre = document.querySelector("#txtNombre").value.trim();
    const apellido = document.querySelector("#txtApellido").value.trim();
    const email = document.querySelector("#txtEmail").value.trim();
    const rol = document.querySelector("#txtCodigo").value.trim();

    ///Validar los datos
    if(!nombre || !apellido || !email || !rol){
        alert("Todos los campos son obligatorios");
        return;
    }
    ///Llamar a la API para agregar el nuevo integrante
    const response = await fetch(API_URL,{
        method: "POST", ///Tipo de peticion a realizar
        headers: {
            'Content-Type': 'application/json'///Esto incida que vamos a enviar un JSON
        },
        body: JSON.stringify({///Convertir el objeto a JSON
            ///Stringify convierte un objeto a un string
            nombre, 
            apellido, 
            email,
            rol
        })

    });
    ///Validar la respuesta
    if(response.ok){
        alert("Integrante agregado correctamente");
        ///Limpiar el formulario
        document.querySelector("#frmAgregar").reset();
        ///Cerrar el modal
        modal.close();
        getTeamMembers(); ///Actualizar la tabla
    }else{
        alert("Error al agregar el integrante");
    }
})
async function deleteMember(id){
    const confirmacion = confirm("¿Estás seguro de eliminar este integrante?");
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{
            method: "DELETE"
        });
        ///Recargar la tabla
        getTeamMembers();
    }
}


