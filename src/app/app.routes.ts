import { Routes } from '@angular/router';
import { JobDetail } from './public/job-detail/job-detail';
import { Jobs } from './public/jobs/jobs';
import { Navbar } from './shared/components/navbar/navbar';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './auth/login/login';
import { Profile } from './candidate/profile/profile';
import { Register } from './auth/register/register';
import { CreateProfile } from './candidate/create-profile/create-profile';
import { Applications } from './candidate/applications/applications';
import { CandidateLayout } from './layout/candidate-layout/candidate-layout';
import { JobApply } from './candidate/job-apply/job-apply';

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
  path:'register',
  component:Register
},
{
  path:'login',
  component: Login
},
{
  path: 'candidate',
  component: CandidateLayout,
  children: [

    {
      path: 'profile',
      component: Profile
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
  component: JobApply
}



    
];
