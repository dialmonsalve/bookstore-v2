import { PublicLayout } from '@/components/layouts'
import { PrivateLayout } from '@/components/layouts/PrivateLayout';

export default function Home() {

  const isStaff = true;
  return (

    !isStaff ?
      <PublicLayout title={'home'} pageDescription={'Find your dreams books here'}>
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

      </PublicLayout>
      : 
      
      <PrivateLayout title='Hola mundo' >
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
        </section>
      </PrivateLayout>

  )
}
