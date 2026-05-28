import { Routes } from '@angular/router';
import { JobDetail } from './public/job-detail/job-detail';
import { Jobs } from './public/jobs/jobs';
import { Navbar } from './shared/components/navbar/navbar';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './auth/login/login';
import { Profile } from './candidate/profile/profile';

export const routes: Routes = [
   
    {
  path: '',
  component: MainLayout,
  children: [

    {
      path: '',
      component: Jobs
    },
    {
      path: 'jobs/:id',
      component: JobDetail
    }

  ]
},
{
  path:'login',
  component: Login
},
{
  path:'candidate/profile',
  component: Profile
}

    
];
