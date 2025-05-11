import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AddSideHustle() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('side_hustles')
      .insert([{ name, description, category }]);
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Side hustle added!');
      setName('');
      setDescription('');
      setCategory('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-white py-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
          <span role="img" aria-label="lightbulb" className="mr-2">💡</span> Add a Side Hustle
        </h2>
        <input
          className="block border border-blue-200 rounded px-3 py-2 mb-4 w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="block border border-blue-200 rounded px-3 py-2 mb-4 w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          className="block border border-blue-200 rounded px-3 py-2 mb-4 w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold w-full transition-colors flex items-center justify-center" type="submit">
          <span role="img" aria-label="rocket" className="mr-2">🚀</span> Add Side Hustle
        </button>
        {message && <div className="mt-4 text-center text-blue-600 font-medium">{message}</div>}
      </form>
    </div>
  );
}