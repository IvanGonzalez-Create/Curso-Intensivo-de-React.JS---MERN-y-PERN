import Header from "./Components/Header"
import Cafetera from "./Components/Cafetera"
import { useCarrito } from "./hooks/useCarrito"

function App() {

  const {Data,Carrito,AgregarCarrito,EliminarElemento,IncrementarCantidad,DecrementarCantidad,
    VaciarCarrito, TotalCarrito, CarritoVacio} = useCarrito()


  return (
    <>

    <Header
    Carrito = {Carrito}
    EliminarElemento = {EliminarElemento}
    IncrementarCantidad = {IncrementarCantidad} 
    DecrementarCantidad = {DecrementarCantidad}   
    VaciarCarrito = {VaciarCarrito}
    TotalCarrito = {TotalCarrito}
    CarritoVacio = {CarritoVacio}
    
    />
 
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestros Productos</h2>

        <div className="row mt-5">

        {Data.map((cafetera) => (
          
          <Cafetera
          key={cafetera.id}
          cafetera = {cafetera}
          setAgregarCarrito = {AgregarCarrito}
          />
          ))}      

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">EternalCoffeMaker - Todos los derechos Reservados</p>
        </div>
    </footer>
 
    </>
  )
}

export default App
