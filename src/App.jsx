import { useEffect, useState } from "react"
import { DataBase } from "./Data/DB_CoffeMaker.js"
import Header from "./Components/Header"
import Cafetera from "./Components/Cafetera"


function App() {

  const CarritoInicial = () => {
    const LocalStorageCarrito = localStorage.getItem('Carrito')
    return LocalStorageCarrito ? JSON.parse(LocalStorageCarrito) : []
  }

  const [Data, setData] = useState(DataBase)
  const [Carrito, setCarrito] = useState(CarritoInicial)

  useEffect (() => {
    localStorage.setItem('Carrito',JSON.stringify(Carrito))
  },[Carrito])
 

function AgregarCarrito(Element) {

    const ElementExist = Carrito.findIndex(cafetera => cafetera.id === Element.id  )    
    if (ElementExist >=0) {
      
      if(Carrito[ElementExist].quantity >= 10) return 
      const UpdatedCarrito = [...Carrito]
      UpdatedCarrito[ElementExist].quantity++
      setCarrito(UpdatedCarrito)
    
    } else {

      Element.quantity = 1
      setCarrito([...Carrito, Element])
    }      
  }

function EliminarElemento(id) {
    setCarrito(prevCarrito => prevCarrito.filter(Cafetera => Cafetera.id !== id))
  }



function IncrementarCantidad(id) {
    const ActualizarCarrito = Carrito.map(Item => {

      if(Item.id === id && Item.quantity < 10) {

      return{
           ...Item,
        quantity: Item.quantity + 1
      }
       
      } else {
        return Item  
      }

  })

  setCarrito(ActualizarCarrito) 
}


function DecrementarCantidad(id) {
  const ActualizarCarrito = Carrito.map(Item => {
    if (Item.id === id && Item.quantity > 1) {
      return {
        ...Item,
        quantity: Item.quantity - 1
      }
    } else {
      return Item
    }

  })
  setCarrito(ActualizarCarrito)
 }

function VaciarCarrito() {
  setCarrito([])
}



  return (
    <>

    <Header
    Carrito = {Carrito}
    EliminarElemento = {EliminarElemento}
    IncrementarCantidad = {IncrementarCantidad} 
    DecrementarCantidad = {DecrementarCantidad}   
    VaciarCarrito = {VaciarCarrito}
    />
 
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestros Productos</h2>

        <div className="row mt-5">

        {Data.map((cafetera) => (
          
          <Cafetera
          key={cafetera.id}
          cafetera = {cafetera}
          setCarrito = {setCarrito}
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
