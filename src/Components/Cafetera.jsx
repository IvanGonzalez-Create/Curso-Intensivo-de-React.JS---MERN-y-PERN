export default function Cafetera({cafetera, setAgregarCarrito}) {

const {id, nombre, imagen, descripcion, precio} = cafetera



return(


<div className="col-md-6 col-lg-4 my-4 row align-items-center">
    <div className="col-4">
        <img className="img-fluid" src={imagen} alt="imagen cafetera" />
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase"> {nombre} </h3>
            <p> {descripcion} </p>
            <p className="fw-black text-primary fs-3"> ${precio} </p>
            <button 
            type="button" 
            className="btn btn-dark w-100"
            onClick={() => setAgregarCarrito(cafetera)}
        >Agregar al Carrito</button>
            </div>
</div>


    )
}