import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { LocalizationService } from '../../Services/localiztionService/localization.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../Services/cartServices/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  // mobiles: string[] = [
  //   'Apple',
  //   'Samsung',
  //   'Oppo',
  //   'Vivo',
  //   'Realme',
  //   'Xiaomi',
  //   'Honor',
  //   'Huawei',
  //   'Infinix',
  // ];
  // tablets: string[] = [
  //   'iPad',
  //   'Samsung Tablet',
  //   'Realme Tablet',
  //   'Lenovo',
  //   'Huawei Tablet',
  //   'TCL',
  // ];
  // mainBrands: string[] = [
  //   'Apple',
  //   'Samsung',
  //   'Lenovo',
  //   'Huawei',
  //   'LG',
  //   'Xiaomi',
  //   'Oppo',
  // ];
  // otherBrands: string[] = [
  //   'Dell',
  //   'HP',
  //   'Acer',
  //   'Sony',
  //   'Anker',
  //   'Asus',
  //   'Honor',
  // ];
  // laptop: string[] = ['ASUS', 'Dell', 'HP', 'Lenovo', 'Apple'];
  // printers: string[] = ['HP Printers', 'Epson Printers'];
  // Tvs: string[] = ['Samsung TV', 'LG TV', 'Rowa', 'Castle', 'ATA', 'ULTRA'];
  // monitors: string[] = ['LG Monitors'];
  // games: string[] = [
  //   'PS Consoles',
  //   'Games CDs',
  //   'Games Accessories',
  //   'Gaming Headset',
  //   'Gaming Mouse & Keyboard',
  //   'Scooters',
  // ];
  // mobileAccessories: string[] = [
  //   'Smart Watch',
  //   'Sound & TWS',
  //   'Power Bank',
  //   'Cables & docks',
  //   'Covers',
  //   'Screen Protector',
  //   'Mobile Sound & Headset',
  // ];
  // laptopsAccessories: string[] = [
  //   'Bags',
  //   'Keybord & Mouse',
  //   'Memories & Flashs',
  //   'Power & Batteries',
  //   'Sound & Headset',
  // ];
  // otherAccessories: string[] = [
  //   'Home Appliances',
  //   'Personal Care',
  //   'Speakers',
  //   'Health equipment',
  //   'Car Solution',
  //   'Others',
  // ];
  // kitchenAppliances: string[] = [
  //   'Air Fryer',
  //   'Microwaves',
  //   'Waffle & Sandwich Maker',
  //   'Blenders & Mixers',
  //   'Kettle & Coffee Maker',
  // ];
  // smallAppliances: string[] = ['Vacuum', 'Irons', 'Heater'];
  url: string = '/assets/i18n/nav.json';
  navData:any;

  cartCount: number = 0;
  isDropdownOpen: boolean = false;

  btns!: NodeListOf<HTMLElement>;
  isLoggedIn: boolean = false;
  isArabic!: boolean ;
  @ViewChild('searchRef') searchRef!:ElementRef;
constructor(
  private userService: UserService,
  private cartService: CartService,
  private router: Router,
  private localizationService: LocalizationService ) {
    this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);

}
ngOnInit() {
  fetch(this.url).then(res => res.json())
  .then(json => {
    this.navData = json.nav;
  });
  this.cartService.getCartCount().subscribe(cart=>{
    this.cartCount=0;
    cart.forEach(c =>{
      this.cartCount+=c.quantity;
    } )
  })
}
  ngAfterViewInit(): void {
  this.userService.UserLoggedIn.subscribe(d=>this.isLoggedIn=d);
    this.btns = document.querySelectorAll('.toggle-btn');
    //this.isLoggedIn=this.userService.userState;

  }



  toggleDropdown(e: Event) {
    this.btns.forEach((item: HTMLElement) => {
      if (item === (e.currentTarget as HTMLElement)) {
        return;
      }
      item.classList.remove('menu-toggle');
    });
    this.isDropdownOpen =(e.currentTarget as HTMLElement).classList.toggle('menu-toggle');
  }
  closeMenu(){
    this.isDropdownOpen = false;
    this.btns.forEach((item: HTMLElement) =>
      item.classList.remove('menu-toggle')
    );
  }
  useLanguage(){
    this.localizationService.ChangeLanguage();
  }
  search(res:string){
    this.router.navigateByUrl('/search',{state:{ searchResult: res }});
  }
}
