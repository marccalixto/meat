import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from "./restaurants.service";
import { trigger, state, style, transition, animate} from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { tap, switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { Observable, from} from 'rxjs'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch',[
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService: RestaurantsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm =>
        this.restaurantService
          .restaurants(searchTerm)
          .pipe(catchError(error => from([]))))
      ).subscribe(rests => this.restaurants = rests)

    this.restaurantService.restaurants().subscribe(rests => this.restaurants = rests)
  }

  toggleSearchBar() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
