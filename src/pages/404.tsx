import { PublicLayout } from "@/components/layouts"

function NotFound404  ()  {

  const isStaff = false
  return (

    isStaff 
    ?
/* // TODO 404 NOT FOUND FOR STAFF */
    <></>
    
    :

    <PublicLayout title="404 page not found" pageDescription="This is the 404 page" >
      <h1> 404 Page not found</h1>
    </PublicLayout>
  )
}

export default NotFound404