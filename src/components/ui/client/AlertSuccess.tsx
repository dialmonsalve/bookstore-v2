import { useUisStore } from "@/store/ui";

export const AlertSuccess = () => {

  const isAlert = useUisStore(state => state.isAlert)
  const alertMessage = useUisStore(state => state.alertMessage)

  return (

    <div className={`alert ${isAlert ? 'show-alert' : 'hide-alert'} `} >
      <p className="alert__messenger" >{alertMessage}</p>
    </div>
  )
}