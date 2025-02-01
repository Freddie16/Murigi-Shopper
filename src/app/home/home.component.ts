// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CategoryGroup {
  title: string;
  items: Product[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: CategoryGroup[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.organizeByCategory();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
        }
      });
  }

  private organizeByCategory() {
    const electronics = this.products.filter(p => p.category === 'electronics').slice(0, 2);
    const jewelry = this.products.filter(p => p.category === 'jewelery').slice(0, 2);
    const mensClothing = this.products.filter(p => p.category === "men's clothing").slice(0, 2);
    const womensClothing = this.products.filter(p => p.category === "women's clothing").slice(0, 2);

    this.categories = [
      { title: 'Electronics', items: electronics },
      { title: 'Jewelry', items: jewelry },
      { title: "Men's Fashion", items: mensClothing },
      { title: "Women's Fashion", items: womensClothing }
    ];
  }
}