
interface Props {
  showError: boolean;
  errorApiMessage:string;
}


export const ApiMessageError = ({ showError, errorApiMessage }: Props) => {
  return (
    showError && <div style={{ margin: '0 auto', fontSize: '1.6rem', backgroundColor: 'red', color: 'white', padding: '1rem 2rem', borderRadius: '1.5rem', textAlign: 'center' }} >{errorApiMessage}</div>
  )
}

