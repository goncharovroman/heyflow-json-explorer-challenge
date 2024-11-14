import { InputHTMLAttributes } from "react"
import styles from './Input.module.css'

type InputProps = {
  label: string
  hint?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>


export function Input({ label, hint, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} className={styles.input} />
      <small>{hint || 'undefined'}</small>
    </div>
  )
}
