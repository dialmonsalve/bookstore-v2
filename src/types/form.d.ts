
export type IsTouched = { [key: string]: boolean } | null

export type ReactChangeEvent = React.ChangeEvent<Elements>

export type ReactFocusEvent = React.FocusEvent<Elements > 

// export type ReactReact.FocusEventHandler<HTMLSelectElement> | undefined

export type ReactFormEvent = React.FormEvent<HTMLFormElement>

type Elements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
