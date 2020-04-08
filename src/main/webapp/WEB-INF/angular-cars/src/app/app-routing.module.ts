import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarModelListComponent} from "./car-model-list/car-model-list.component";
import {CarFormComponent} from "./car-form/car-form.component";

const routes: Routes = [
  // TODO add login / logout routes
  {path: "create", component: CarFormComponent},
  {path: "list", component: CarModelListComponent},
  {path: "cars/:brand", component: CarModelListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
