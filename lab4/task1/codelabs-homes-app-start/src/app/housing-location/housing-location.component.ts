import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Input } from "@angular/core";
import { HousingLocation } from "./housing-location";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./housing-location.component.html",
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
