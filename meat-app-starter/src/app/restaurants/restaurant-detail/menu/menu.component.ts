import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { MenuItem } from "app/restaurants/restaurant-detail/menu-item/menu-item.model";
import { Observable } from 'rxjs'

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  menu: Observable<MenuItem[]>

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(this.route.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem){
    console.log(item)
  }
}
