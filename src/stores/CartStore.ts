import { makeAutoObservable } from "mobx";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  image?: string;
};

export function createCartStore() {
  return makeAutoObservable({
    items: [] as CartItem[],

    load() {
      try {
        const raw = sessionStorage.getItem("cart_v1");
        if (raw) this.items = JSON.parse(raw);
      } catch (e) {
        console.warn("failed to read cart", e);
      }
    },

    save() {
      try {
        sessionStorage.setItem("cart_v1", JSON.stringify(this.items));
      } catch (e) {
        console.warn("failed to save cart", e);
      }
    },

    add(item: Omit<CartItem, "qty">, qty = 1) {
      const found = this.items.find((i) => i.id === item.id);
      if (found) found.qty += qty;
      else this.items.push({ ...item, qty });

      this.save();
    },

    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id);
      this.save();
    },

    clear() {
      this.items = [];
      this.save();
    },

    get totalItems() {
      return this.items.reduce((s, i) => s + i.qty, 0);
    },

    get totalValue() {
      return this.items.reduce((s, i) => s + i.qty * i.price, 0);
    }
  });
}


export const cartStore = createCartStore();
cartStore.load();
