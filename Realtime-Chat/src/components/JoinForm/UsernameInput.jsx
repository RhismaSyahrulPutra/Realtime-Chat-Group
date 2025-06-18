function UsernameInput({ username, setUsername }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1" htmlFor="username">
        Nama Kamu
      </label>
      <input
        id="username"
        type="text"
        placeholder="Masukkan nama"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

export default UsernameInput;
