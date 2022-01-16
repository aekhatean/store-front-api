import { Orders, Order } from '../../models/orders.model';

describe('Orders model', () => {
  const store = new Orders();
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

  it('should return an order object on show Order', async (): Promise<void> => {
    expect(await store.show(1)).toEqual(
      jasmine.objectContaining({
        user_id: jasmine.any(String),
        status: jasmine.any(String)
      })
    );
  });
});
