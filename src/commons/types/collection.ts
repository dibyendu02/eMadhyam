export interface Collection {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  productCount?: number;
  featured?: boolean;
}
