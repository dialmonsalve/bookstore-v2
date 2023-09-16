import { useUisStore } from "@/store/ui";

export const ApiMessageError = () => {

  const isApiError = useUisStore(state => state.isApiError)
  const errorApiMessage = useUisStore(state => state.errorApiMessage)

  return (
    isApiError && <div style={{ margin: '0 auto', fontSize: '1.6rem', backgroundColor: 'red', color: 'white', padding: '1rem 2rem', borderRadius: '1.5rem', textAlign: 'center' }} >{errorApiMessage}</div>
  )
}

