import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashBoadComponent } from './pages/admin/dash-boad/dash-boad.component';
import { UserDashboadComponent } from './pages/user/user-dashboad/user-dashboad.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzzesComponent } from './pages/admin/view-quizzzes/view-quizzzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch :'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashBoadComponent,
    //pathMatch: 'full',
    canActivate:[adminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      }
      ,{
        path:'add-category',
        component:AddCategoriesComponent
      },
      {
        path :'quizzes',
        component: ViewQuizzzesComponent
      },
      {
        path:'add-quiz',
        component: AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },{
        path:'caterory/:cid',
        component:UpdateCategoryComponent
      },{
        path:'view-questions/:qid/:title',
        component:ViewQuestionsComponent
      },
      {
        path:"add-question/:qid/:title",
        component:AddQuestionComponent
      },{
        path:"update-question/:quesId/:qid/:title",
        component:UpdateQuestionComponent
      }

    ]
  },
  {
    path :'user-dashboad',
    component: UserDashboadComponent,
    pathMatch: 'full',
    canActivate:[normalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
