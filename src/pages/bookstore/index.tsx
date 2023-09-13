import { PrivateLayout } from "@/components/layouts"
import { Spinner } from "@/components/ui";


function AdminPage() {


  // if (status === 'loading') {
  //   return <Spinner />
  // }

  return (
    <PrivateLayout title='Panel DIABOOKS' >
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

export default AdminPage