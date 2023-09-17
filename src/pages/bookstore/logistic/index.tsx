import { Layout } from "@/components/layouts/app"
import { Button } from "@/components/ui/client"
import Image from "next/image"
import { useRouter } from "next/router"

const AdminLogistic = () => {

  const router = useRouter()

  return (
    <Layout title="logística" >

      <div className="cards" >
        <div className="card" >
          <h4 className="card__title" >Ordenes de Compra</h4>

          <Button backgroundColor="outline-green" onClick={()=>router.push('/bookstore/logistic') } >
            <Image
              width={180}
              height={180}
              src='/media/warning.png'
              alt="prueba"
            />
          </Button>
          <div className="card__buttons" >
            <Button backgroundColor="green" size="small" >Crear</Button>
            <Button size="small" >Editar</Button>
          </div>
        </div>

        <div className="card" >
          <h4 className="card__title" >Entradas de inventario</h4>

          <Button backgroundColor="outline-green" >
            <Image
              width={180}
              height={180}
              src='/media/warning.png'
              alt="prueba"
            />
          </Button>
          <div className="card__buttons" >
            <Button backgroundColor="green" size="small" >Crear</Button>
            <Button size="small" >Editar</Button>
          </div>
        </div>

        <div className="card" >
          <h4 className="card__title" >Inventarios</h4>

          <Button backgroundColor="outline-green" >
            <Image
              width={180}
              height={180}
              src='/media/warning.png'
              alt="prueba"
            />
          </Button>
          <div className="card__buttons" >
            <Button backgroundColor="green" size="small" >Crear</Button>
            <Button size="small" >Editar</Button>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default AdminLogistic