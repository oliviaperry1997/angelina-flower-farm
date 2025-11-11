// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  nameKey: string; // Store the translation key for language switching
  price: number;
  quantity: number;
}

// Cart management functions
export class CartManager {
  private static readonly STORAGE_KEY = 'angelina-flower-farm-cart';

  static getCart(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const cart = localStorage.getItem(this.STORAGE_KEY);
      const items = cart ? JSON.parse(cart) : [];
      
      // Migrate old cart items that don't have nameKey
      return items.map((item: any) => ({
        id: item.id,
        name: item.name,
        nameKey: item.nameKey || item.id, // Use id as fallback nameKey
        price: item.price,
        quantity: item.quantity
      }));
    } catch {
      return [];
    }
  }

  static saveCart(items: CartItem[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.notifyCartUpdate();
  }

  static addItem(id: string, name: string, price: number, nameKey?: string): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      // Update name and nameKey in case language changed
      existingItem.name = name;
      if (nameKey) existingItem.nameKey = nameKey;
    } else {
      cart.push({ id, name, nameKey: nameKey || id, price, quantity: 1 });
    }
    
    this.saveCart(cart);
  }

  static removeItem(id: string): void {
    const cart = this.getCart().filter(item => item.id !== id);
    this.saveCart(cart);
  }

  static updateQuantity(id: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.id === id);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  }

  static getItemCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  static getTotal(): number {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  static clearCart(): void {
    this.saveCart([]);
  }

  static updateItemNames(translations: any, lang: string): void {
    const cart = this.getCart();
    const updatedCart = cart.map(item => ({
      ...item,
      name: item.nameKey && translations[lang][item.nameKey] ? translations[lang][item.nameKey] : item.name
    }));
    this.saveCart(updatedCart);
  }

  private static notifyCartUpdate(): void {
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { 
        items: this.getCart(),
        count: this.getItemCount(),
        total: this.getTotal()
      }
    }));
  }
}