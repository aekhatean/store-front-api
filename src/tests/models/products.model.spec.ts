import { Products, Product } from '../../models/products.model';

describe('Products model', () => {
  const store = new Products();

  it('should return a Product object on create Product', async (): Promise<void> => {
    const product: Product = {
      name: 'Ruler',
      price: 3
    };

    expect(await store.create(product)).toEqual(
      jasmine.objectContaining({
        name: jasmine.any(String),
        price: jasmine.any(Number)
      })
    );
  });

  it('should return an array of Product objects on index Product', async (): Promise<void> => {
    expect(await store.index()).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          name: jasmine.any(String),
          price: jasmine.any(Number)
        })
      ])
    );
  });

  it('should return a Product object on show Product', async (): Promise<void> => {
    const product: Product = {
      name: 'pencil',
      price: 3
    };

    await store.create(product).then(async (producedProduct) =>
      expect(await store.show(producedProduct.id as unknown as number)).toEqual(
        jasmine.objectContaining({
          name: jasmine.any(String),
          price: jasmine.any(Number)
        })
      )
    );
  });
});
