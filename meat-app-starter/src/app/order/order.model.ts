class Order{
  constructor(
    public complemento: string,
    public logradouro: string,
    public logradouroNumero: string,
    public paymentOption: string,
    public orderItems: OrderItem[] = [],
    public id?: string
  ){}
}

class OrderItem{
  constructor(public quantity: number, public itemId: string){}
}

export {Order, OrderItem}
