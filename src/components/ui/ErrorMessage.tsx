import { ReactNode } from "react";

interface Props {
	fieldName: string[] | undefined;
	isFormSubmitted: boolean
	isTouched?: boolean
}

export const ErrorMessage = ({ isFormSubmitted, fieldName, isTouched }: Props) => {

	const shouldShowErrors = (isTouched && fieldName && fieldName.length > 0);

	return (

		<div className="error-container" >
			{shouldShowErrors || isFormSubmitted ?
				<div className="error-container__message" >
					{fieldName ?  fieldName[0] : ""}
				</div>
				: <></>}
		</div>

	);
};

