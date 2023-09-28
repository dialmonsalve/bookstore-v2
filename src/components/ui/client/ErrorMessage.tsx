interface Props {
	fieldName: string[] | undefined;
	isFormSubmitted: boolean
	isTouched?: string | number
}

export const ErrorMessage = ({ isFormSubmitted, fieldName, isTouched }: Props) => {

	const showErrors = (isTouched && fieldName && fieldName.length > 0);

	return showErrors || isFormSubmitted ? (
    <span className="message-error">{fieldName ? fieldName[0] : ""}</span>
  ) : (
    <></>
  );
};

