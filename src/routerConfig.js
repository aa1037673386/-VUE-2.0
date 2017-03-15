import Home from './components/Home.vue'
import wellReceivedAll from './components/wellReceivedAll.vue'
import ReleaseAll from './components/ReleaseAll.vue'
import Top250All from './components/Top250All.vue'
import details from './components/details.vue'

export default [
  {
    path:'/wellReceived',
    component:wellReceivedAll
  },
  {
    path:'/wellReceived/:id',
    component:details
  },
  {
    path:'/Recovery',
    component:ReleaseAll
  },
  {
    path:'/ReleaseAll',
    component:ReleaseAll
  },
  {
    path:'/Top250/:id',
    component:details
  },
  {
    path:'/Top250All',
    component:Top250All
  },
  {
    path:'/ReleaseAll/:id',
    component:details
  },
  {
    path:'/Recovery/:id',
    component:details
  },
  { 
    path: '/', 
    component:Home
  },
  { 
    path: '*', 
    component:Home
  }
];
