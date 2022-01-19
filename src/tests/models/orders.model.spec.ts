import { Orders, Order } from '../../models/orders.model';
import { Product, Products } from '../../models/products.model';
import { User, Users } from '../../models/users.model';

describe('Orders model', () => {
  const store = new Orders();
  const users = new Users();
  const products = new Products();

  beforeAll(async () => {
    const user: User = {
      first_name: 'Mostafa',
      last_name: 'Adel',
      password: '1234'
    };

    const product: Product = {
      name: 'protractor',
      price: 2
    };

    const order: Order = {
      userId: 1,
      status: 'open'
    };

    users.create(user);
    const newProduct = products.create(product);
    const newOrder = store.create(order);
    store.addProduct(
      1,
      (await newOrder).id as unknown as number,
      (await newProduct).id as unknown as number
    );
  });

  it('should return an order object on show Order', async (): Promise<void> => {
    expect(await store.show(1)).toEqual(
      jasmine.objectContaining({
        user_id: jasmine.any(String),
        status: jasmine.any(String)
      })
    );
  });

  it('should return an order object on create Order', async (): Promise<void> => {
    const order: Order = {
      userId: 1,
      status: 'open'
    };

    expect(await store.create(order)).toEqual(
      jasmine.objectContaining({
        user_id: jasmine.any(String),
        status: jasmine.any(String)
      })
    );
  });

  it('should return an order object on add product', async (): Promise<void> => {
    const product: Product = {
      name: 'gloves',
      price: 6
    };

    const order: Order = {
      userId: 1,
      status: 'open'
    };

    const newProduct = products.create(product);
    const newOrder = store.create(order);

    expect(
      await store.addProduct(
        1,
        (
          await newOrder
        ).id as unknown as number,
        (
          await newProduct
        ).id as unknown as number
      )
    ).toEqual(
      jasmine.objectContaining({
        order_id: jasmine.any(String),
        product_id: jasmine.any(String),
        quantity: jasmine.any(Number)
      })
    );
  });
});
