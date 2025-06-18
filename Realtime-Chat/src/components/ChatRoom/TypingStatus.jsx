function TypingStatus({ status }) {
  if (!status) return null;

  return <div className="px-4 py-1 text-sm text-gray-500 italic">{status}</div>;
}

export default TypingStatus;
