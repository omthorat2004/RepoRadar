import '../styles/modal.css'
const Modal = ({ onClose, open, children }) => {
  if (!open) {
    return null
  }
  return (
    <div className='modal-container' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
