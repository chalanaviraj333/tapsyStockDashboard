import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addcarbrand',
    loadChildren: () => import('./addcarbrand/addcarbrand.module').then( m => m.AddcarbrandPageModule)
  },
  {
    path: 'addmodel',
    loadChildren: () => import('./addmodel/addmodel.module').then( m => m.AddmodelPageModule)
  },
  {
    path: 'addremote',
    loadChildren: () => import('./addremote/addremote.module').then( m => m.AddremotePageModule)
  },
  {
    path: 'programmingdetails',
    loadChildren: () => import('./programmingdetails/programmingdetails.module').then( m => m.ProgrammingdetailsPageModule)
  },
  {
    path: 'editcarmodel',
    loadChildren: () => import('./editcarmodel/editcarmodel.module').then( m => m.EditcarmodelPageModule)
  },
  {
    path: 'editremote',
    loadChildren: () => import('./editremote/editremote.module').then( m => m.EditremotePageModule)
  },
  {
    path: 'editcardetails',
    loadChildren: () => import('./editcardetails/editcardetails.module').then( m => m.EditcardetailsPageModule)
  },
  {
    path: 'addremoteshell',
    loadChildren: () => import('./addremoteshell/addremoteshell.module').then( m => m.AddremoteshellPageModule)
  },
  {
    path: 'carmodelpage',
    loadChildren: () => import('./carmodelpage/carmodelpage.module').then( m => m.CarmodelpagePageModule)
  },
  {
    path: 'editremoteitempage',
    loadChildren: () => import('./editremoteitempage/editremoteitempage.module').then( m => m.EditremoteitempagePageModule)
  },
  {
    path: 'exportdata',
    loadChildren: () => import('./exportdata/exportdata.module').then( m => m.ExportdataPageModule)
  },
  {
    path: 'addcarmodels',
    loadChildren: () => import('./addcarmodels/addcarmodels.module').then( m => m.AddcarmodelsPageModule)
  },
  {
    path: 'allcarmodels',
    loadChildren: () => import('./allcarmodels/allcarmodels.module').then( m => m.AllcarmodelsPageModule)
  },
  {
    path: 'editcarremotes',
    loadChildren: () => import('./editcarremotes/editcarremotes.module').then( m => m.EditcarremotesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
