/** Form field wrapper: label, optional hint, required marker and error message. */
export default function Field({ label, hint, required, error, id, light = false, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`field-label ${light ? '!text-white' : ''}`}>
        {label} {required && <span className={light ? 'text-royal-200' : 'text-royal-600'}>*</span>}
        {hint && <span className={`ml-1 font-normal ${light ? 'text-white/60' : 'text-muted'}`}>({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className={`field-error ${light ? '!text-red-200' : ''}`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
