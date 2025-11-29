import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api';

type Props = { search?: string };

const Home: React.FC<Props> = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | undefined>(undefined);

 
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const cats = await fetchCategories();
        const prods = await fetchProducts();
        setCategories(cats);
        setProducts(prods);
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed');
        setLoading(false);
      }
    };

    loadAll();
  }, []); 

  const toggleCategory = (cat: string) => {
    const updatedCategories = new Set(selectedCategories);
    if (updatedCategories.has(cat)) {
      updatedCategories.delete(cat);
    } else {
      updatedCategories.add(cat);
    }

    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories);
  };

 
  const applyFilters = async (updatedCategories: Set<string>) => {
    if (updatedCategories.size === 0) {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      return;
    }

    if (updatedCategories.size === 1) {
      const cat = Array.from(updatedCategories)[0];
      const filteredProducts = await fetchProductsByCategory(cat);
      setProducts(filteredProducts);
      return;
    }

    const allProducts = await fetchProducts();
    const filteredProducts = allProducts.filter((p: any) => updatedCategories.has(p.category));
    setProducts(filteredProducts);
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <h2>Products</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Categories: </strong>
        {categories.map(c => (
          <label key={c} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={selectedCategories.has(c)}
              onChange={() => toggleCategory(c)}
            />
            {c}
          </label>
        ))}
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
