import { Layout } from "@/components/layouts/app";
import Image from "next/image";
import Link from "next/link";

const AdminLogistic = () => {

  return (
    <Layout title="logística" >

      <div className="cards" >
        <div className="card" >
          <span className="card__title" >Ordenes de Compra</span>
          <Link
            className="card__button" href={'/bookstore/logistic/purchase-orders'}  >
            <Image
              width={100}
              height={100}
              src='/media/order.png'
              alt="prueba"
              priority
            />
          </Link>
            <Link
              className="card__link"
              href={'/bookstore/logistic/purchase-orders/create'} >
              Crear
            </Link>  
        </div>

        <div className="card" >

          <span className="card__title" >Entradas de inventario</span>
          <Link
            className="card__button" href={'/bookstore/logistic/inventory-entries'}  >
            <Image
              width={100}
              height={100}
              src='/media/entradas-inventario.png'
              alt="prueba"
              priority
            />
          </Link>        
            <Link
              className="card__link"
              href={'/bookstore/logistic/inventory-entries/create'} >
              Crear
            </Link> 
      
        </div>

        <div className="card" >
          <span className="card__title" >Inventarios</span>
          <Link
            className="card__button" href={'/bookstore/logistic/inventory'}  >
            <Image
              width={100}
              height={100}
              src='/media/inventario.png'
              alt="prueba"
              priority
            />
          </Link> 
            <Link
              className="card__link"
              href={'/bookstore/logistic/inventory/create'} >
              Crear
            </Link> 
        </div>

      </div>

    </Layout>
  )
}

export default AdminLogistic