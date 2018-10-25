import { MenuItem } from '../../restaurant-detail/menu-item/menu-item.model';

export class CartItem {

  constructor(public item: MenuItem, public quantity: number = 1){}

  value(): number {
    return this.item.price * this.quantity
  }
}
