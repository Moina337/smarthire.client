import { Routes } from '@angular/router';
import { JobDetail } from './public/job-detail/job-detail';
import { Jobs } from './public/jobs/jobs';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './auth/login/login';
import { Profile } from './candidate/profile/profile';
import { Register } from './auth/register/register';
import { CreateProfile } from './candidate/create-profile/create-profile';
import { Applications } from './candidate/applications/applications';
import { CandidateLayout } from './layout/candidate-layout/candidate-layout';
import { JobApply } from './candidate/job-apply/job-apply';
import { AdminLayout } from './admin/admin-layout';
import { AdminDashboard } from './admin/dashboard/dashboard';
import { JobsList } from './admin/jobs/jobs-list/jobs-list';
import { JobForm } from './admin/jobs/job-form/job-form';
import { CandidatesList } from './admin/candidates/candidates-list/candidates-list';
import { CandidateDetails } from './admin/candidates/candidate-details/candidate-details';
import { ApplicationsList } from './admin/applications/applications-list/applications-list';
import { ApplicationDetails } from './admin/applications/application-details/application-details';
import { Home } from './public/home/home';
import { Dashbord } from './candidate/dashbord/dashbord';
import { OAuth2SuccessComponent } from './auth/oauth-success/oauth-success'; 
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';
import { GuestGuard } from '../core/guards/guest.guard';

export const routes: Routes = [
   
    {
  path: '',
  component: MainLayout,
  children: [

    {
          path: '',
          component: Home
    },
    {
      path: 'jobs',
      component: Jobs
    },
    {
      path: 'jobs/:id',
      component: JobDetail
    }

  ]
},
{
  path:'register',
  component:Register
  ,    canMatch:[GuestGuard],
       canActivate:[GuestGuard]
},
{
  path:'login',
  component: Login
  ,    canMatch:[GuestGuard],
       canActivate:[GuestGuard]
},
{
  path: 'oauth2-success',
  component: OAuth2SuccessComponent
},
{
  path: 'candidate',
  component: CandidateLayout,
      canMatch:[AuthGuard],
      canActivate:[AuthGuard],
  children: [

    {
      path: '',
      component: Profile
    },
    {
      path: 'profile',
      component: Profile
    },
        {
          path: 'dashboard',
          component: Dashbord
        },
    {
      path: 'create',
      component: CreateProfile
    },
    {
      path: 'profile/create',
      component: CreateProfile
    },
    {
      path: 'applications',
      component: Applications
    }
  ]
},
{
  path: 'jobs/:id/apply',
  component: JobApply,
  canMatch:[AuthGuard],
  canActivate:[AuthGuard]
},
{
  path: 'admin',
  component: AdminLayout,
  canMatch:[AdminGuard],
  canActivate:[AdminGuard],
  children: [
    { path: '', component: AdminDashboard },
    { path: 'jobs', component: JobsList },
    { path: 'jobs/new', component: JobForm },
    { path: 'jobs/:id/edit', component: JobForm },
    { path: 'candidates', component: CandidatesList },
    { path: 'candidates/:id', component: CandidateDetails },
    { path: 'applications', component: ApplicationsList },
    { path: 'applications/:id', component: ApplicationDetails }
  ]
}



    
];
