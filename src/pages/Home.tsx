import React from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api';

type Props = { search?: string };
type State = {
  products: any[];
  loading: boolean;
  categories: string[];
  selectedCategories: Set<string>;
  error?: string;
};

export default class Home extends React.Component<Props, State> {
  state: State = { products: [], loading: true, categories: [], selectedCategories: new Set() };

  async componentDidMount() {
    await this.loadAll();
  }

  async loadAll() {
    this.setState({ loading: true, error: undefined });
    try {
      const cats = await fetchCategories();
      const products = await fetchProducts();
      this.setState({ categories: cats, products, loading: false });
    } catch (e:any) {
      this.setState({ error: e.message || 'Failed', loading: false });
    }
  }

  toggleCategory(cat: string) {
    const s = new Set(this.state.selectedCategories);
    if (s.has(cat)) s.delete(cat); else s.add(cat);
    // Per requirements: filter locally and refetch from API when selecting category(s).
    // We'll call API per category if only one selected; for multiple selected we'll filter locally.
    this.setState({ selectedCategories: s }, () => this.applyFilters());
  }

  async applyFilters() {
    const { selectedCategories } = this.state;
    if (selectedCategories.size === 0) {
      // reload all
      const all = await fetchProducts();
      this.setState({ products: all });
      return;
    }
    if (selectedCategories.size === 1) {
      // fetch from API for a single category
      const cat = Array.from(selectedCategories)[0];
      const res = await fetchProductsByCategory(cat);
      this.setState({ products: res });
      return;
    }
    // multiple categories: fetch all and filter locally (as an example)
    const all = await fetchProducts();
    const filtered = all.filter((p:any) => selectedCategories.has(p.category));
    this.setState({ products: filtered });
  }

  render() {
    const { products, loading, categories, selectedCategories, error } = this.state;
    return (
      <div style={{maxWidth:980, margin:'0 auto'}}>
        <h2>Products</h2>
        <div style={{marginBottom:12}}>
          <strong>Categories: </strong>
          {categories.map(c => (
            <label key={c} style={{marginRight:8}}>
              <input type="checkbox" checked={selectedCategories.has(c)} onChange={()=>this.toggleCategory(c)} /> {c}
            </label>
          ))}
        </div>

        {error && <div style={{color:'red'}}>{error}</div>}
        {loading ? <div>Loading...</div> : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12}}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    );
  }
}
