interface Props {
	fieldName: string[] | undefined;
	isFormSubmitted: boolean
	isTouched?: string | number
}

export const ErrorMessage = ({ isFormSubmitted, fieldName, isTouched }: Props) => {

	const showErrors = (isTouched && fieldName && fieldName.length > 0);

	return (

		<div className="error-container" >
			{showErrors || isFormSubmitted ?
				<div className="error-container__message" >
					{fieldName ? fieldName[0] : ""}
				</div>
				: <></>}
		</div>

	);
};

