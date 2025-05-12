import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SideHustleList() {
  const [sideHustles, setSideHustles] = useState([]);

  useEffect(() => {
  const fetchSideHustles = async () => {
    const { data, error } = await supabase.from('side_hustles').select('*');
    if (data) {
      const safeData = data.map((hustle: any) => ({
        ...hustle,
        averageRatings:
          typeof hustle.averageRatings === 'object' && hustle.averageRatings !== null && !Array.isArray(hustle.averageRatings)
            ? hustle.averageRatings
            : { money: 0, effort: 0, satisfaction: 0 },
        tags: Array.isArray(hustle.tags) ? hustle.tags : [],
        categories: Array.isArray(hustle.categories) ? hustle.categories : [],
      }));
      setSideHustles(safeData);
    }
    // Optionally handle error
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