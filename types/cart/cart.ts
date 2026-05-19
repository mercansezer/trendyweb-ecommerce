// 1. Ekrandaki kartlarda, Navbar sepet dropdown'ında göstereceğimiz ürünün minimalist hali
export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
}

export interface ICartItem {
  product: ICartProduct;
  quantity: number; // Adet bilgisi
}

// Backend'e (Kendi Next.js API'ne veya DummyJSON'a) göndereceğimiz paket
export interface AddToCartPayload {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
}

export interface ICartState {
  items: ICartItem[]; // Sadeleştirilmiş ürünlerin listesi
  totalQuantity: number; // Navbar üzerindeki sepet sayacı
  totalPrice: number; // Toplam fatura tutarı
}
