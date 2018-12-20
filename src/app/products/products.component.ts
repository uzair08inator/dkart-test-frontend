import { Component, OnInit } from '@angular/core';
import {PRODUCTS_LIST} from '../products-list';
import { HttpClient } from '@angular/common/http';
import {CurrencyPipe} from '@angular/common'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList=PRODUCTS_LIST;
  inr2usd:number;
  error:string;
  currencyList=[{'name': 'INR'}, {'name': 'USD'}];
  selectedCurrency=this.currencyList[0];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://api.exchangeratesapi.io/latest?base=INR')
    .subscribe((response: any)=>{
      this.inr2usd=response.rates.USD;
    },
    (error) => {
      this.error=error;
      console.log(this.error);
    });
  }

  onChange(currency) {
    switch(currency.name){
      case "INR":{
        console.log("INR");
        for(let index in this.productsList)
        {
          this.productsList[index].price/=this.inr2usd;
          this.productsList[index].currency="INR";
        }
        break;
      }
      case "USD":{
        console.log("USD");
        for(let index in this.productsList)
        {
          this.productsList[index].price*=this.inr2usd;
          this.productsList[index].currency="USD";
        }
        break;
      }
    }
  }

}
