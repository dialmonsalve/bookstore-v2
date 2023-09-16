import { Layout } from '@/components/layouts/e-commerce'

export default function Home() {

  return (
    <Layout
      title={'DIABOOKS | Encuentra los libros que necesites para soñar'}
      pageDescription={'Esta es la página de inicio de la librería DIABOOKS'}>
      <h1>Read and dream</h1>
  
      <section className='section'>

        <article className='section__article--news' >
          <div className='section__article--news-1' >

          </div>
          <div className='section__article--news-2' >

          </div>
          <div className='section__article--news-3' >

          </div>
        </article >

        <article className='section__article--schedule'>

        </article >

        <article className='section__article--best-sellers' >

        </article>

      </section>

    </Layout>

  )
}
