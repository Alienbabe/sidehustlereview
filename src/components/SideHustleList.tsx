import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SideHustleList() {
  const [sideHustles, setSideHustles] = useState([]);

  useEffect(() => {
    const fetchSideHustles = async () => {
      const { data, error } = await supabase.from('side_hustles').select('*');
      if (!error) setSideHustles(data);
    };
    fetchSideHustles();
  }, []);

  return (
    <div>
      <h2>Side Hustles</h2>
      <ul>
        {sideHustles.map((hustle: any) => (
          <li key={hustle.id}>{hustle.name} - {hustle.description}</li>
        ))}
      </ul>
    </div>
  );
}