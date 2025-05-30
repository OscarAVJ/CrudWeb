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
                <button>Eliminar</button>
            </td>
        </tr>
        `;
    });
}
getTeamMembers();
