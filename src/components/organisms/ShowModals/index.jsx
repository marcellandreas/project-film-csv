const ShowModal = ({ isVisible, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <section
      className="modal-component z-50"
      id="wrapper"
      onClick={handleClose}
    >
      {children}
    </section>
  );
};

export default ShowModal;
