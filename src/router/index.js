import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import bookPage from '../views/book-page.vue';
import bookEdit from '../components/book-edit.vue';
import reviewAdd from '../components/review-add.vue';
import bookDetails from '../views/book-details.vue';
import bookFind from '../views/book-find.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/book/find',
    name: 'book-find',
    component: bookFind,
  },
  {
    path: '/book',
    name: 'book-page',
    component: bookPage,
    children: [ //nested routes
      {
        path: 'edit/:id?',
        name: 'book-edit',
        component: bookEdit
      }
    ]
  },
  {
    path: '/book/:id',
    name: 'book-details',
    component: bookDetails,
    children: [ //nested routes
      {
        path: 'review',
        name: 'review-add',
        component: reviewAdd
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
