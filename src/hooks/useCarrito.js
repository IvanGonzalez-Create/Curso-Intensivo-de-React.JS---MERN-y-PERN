import { useEffect, useState, useMemo } from "react"
import { DataBase } from "../Data/DB_CoffeMaker"


export const useCarrito = () => {

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


// State Derivado y uso de useMemo
  const TotalCarrito = useMemo( () => Carrito.reduce( (acumulador,item) => acumulador + (item.precio * item.quantity), 0)
  ,[Carrito])
  const CarritoVacio = useMemo(() => Carrito.length ===  0,[Carrito])
    


    return {

        Data,
        Carrito,
        AgregarCarrito,
        EliminarElemento,
        IncrementarCantidad,
        DecrementarCantidad,
        VaciarCarrito,
        TotalCarrito,
        CarritoVacio

    }

}