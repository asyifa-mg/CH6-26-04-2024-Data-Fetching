export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <h2>{message}</h2>
      {onConfirm && (   <div id="confirmation-actions"
      )}
    </div>
  );
}
