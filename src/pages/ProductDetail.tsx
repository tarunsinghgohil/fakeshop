import React from 'react';
import { fetchProductById } from '../api';
import { withRouterParams } from '../reactRouterHelpers';
import { StoreContext } from '../context/StoreContext';
import { observer } from 'mobx-react';

type Props = { params?: any };
type State = { product?: any; loading: boolean; error?: string; qty: number };

class ProductDetailInner extends React.Component<Props, State> {
  static contextType = StoreContext as any;
  context!: React.ContextType<typeof StoreContext>;

  state: State = { product: undefined, loading: true, qty: 1 };

  async componentDidMount() {
    const id = this.props.params?.id;
    if (!id) return this.setState({ error: 'Missing id', loading: false });
    try {
      const p = await fetchProductById(id);
      this.setState({ product: p, loading: false });
    } catch (e:any) {
      this.setState({ error: e.message, loading: false });
    }
  }

  addToCart = () => {
    const { product, qty } = this.state;
    if (!product) return;
    this.context.add({ id: product.id, title: product.title, price: product.price, image: product.image }, qty);
    alert('Added to cart');
  }

  render() {
    const { product, loading, error, qty } = this.state;
    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{color:'red'}}>{error}</div>;
    return (
      <div style={{maxWidth:980, margin:'0 auto', display:'flex', gap:20}}>
        <div style={{flex:'0 0 320px'}}>
          <img src={product.image} alt={product.title} style={{maxWidth:'100%'}} />
        </div>
        <div style={{flex:1}}>
          <h2>{product.title}</h2>
          <div style={{fontWeight:700}}>${product.price}</div>
          <p>{product.description}</p>
          <div style={{margin:'12px 0'}}>
            <label>Qty: <input type="number" value={qty} min={1} onChange={(e)=>this.setState({qty: Math.max(1, Number(e.target.value) || 1)})} style={{width:60}}/></label>
          </div>
          <button onClick={this.addToCart} style={{padding:'8px 12px', borderRadius:6}}>Add to MyCart</button>
        </div>
      </div>
    );
  }
}

export default withRouterParams(observer(ProductDetailInner));
