import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardVue from '@/views/dashboard/Dashboard.vue';
import AdminsVue from '@/views/admins/Admins.vue';
import AdminInviteVue from '@/views/admins/AdminInvite.vue';
import AthletesVue from '@/views/athletes/Athletes.vue';
import AthleteDetailsVue from '@/views/athletes/AthleteDetails.vue';
import CategoriesVue from '@/views/categories/Categories.vue';
import CategoryDetailsVue from '@/views/categories/CategoryDetails.vue';
import DisciplinesVue from '@/views/disciplines/Disciplines.vue';
import DisciplineDetailsVue from '@/views/disciplines/DisciplineDetails.vue';
import InscriptionsVue from '@/views/inscriptions/Inscriptions.vue';
import InscriptionDetailsVue from '@/views/inscriptions/InscriptionDetails.vue';
import PaymentsVue from '@/views/payments/Payments.vue';
import PaymentDetailsVue from '@/views/payments/PaymentDetails.vue';
import RacesVue from '@/views/races/Races.vue';
import RaceDetailsVue from '@/views/races/RaceDetails.vue';
import TeamsVue from '@/views/teams/Teams.vue';
import TeamDetailsVue from '@/views/teams/TeamDetails.vue';
import LoginVue from '@/views/login/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: DashboardVue,
  },
  {
    path: "/admins",
    name: "Admins",
    component: AdminsVue,
  },
  {
    path: "/admin-invites",
    name: "AdminInvites",
    component: AdminInviteVue,
  },
  {
    path: "/athletes",
    name: "Athletes",
    component: AthletesVue,
  },
  {
    path: "/athletes/:id",
    name: "AthleteDetails",
    component: AthleteDetailsVue,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesVue,
  },
  {
    path: "/categories/:id", 
    name: "CategoryDetails", 
    component: CategoryDetailsVue
  },
  {
    path: "/disciplines",
    name: "Disciplines",
    component: DisciplinesVue,
  },
  {
    path: "/disciplines/:id", 
    name: "DisciplineDetails", 
    component: DisciplineDetailsVue
  },
  {
    path: "/inscriptions",
    name: "Inscriptions",
    component: InscriptionsVue,
  },
  {
    path: "/inscriptions/:id", 
    name: "InscriptionDetails", 
    component: InscriptionDetailsVue
  },
  {
    path: "/login",
    name: "Login", 
    component: LoginVue
  },
  {
    path: "/payments", 
    name: "Payments", 
    component: PaymentsVue
  },
  {
    path: '/payments/:id', 
    name: "PaymentDetails",
    component: PaymentDetailsVue
  },
  {
    path: "/races",
    name: "Races",
    component: RacesVue,
  },
  {
    path: "/races/:id",
    name: "RaceDetails",
    component: RaceDetailsVue,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsVue,
  },
  {
    path: "/teams/:id", 
    name: "TeamDetails", 
    component: TeamDetailsVue
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
