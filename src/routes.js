import React from 'react';

import ViewItemsCat from "./views/ViewItemsCat/display";
import EditCategory from "./views/EditCategory/display";
import AllItem from "./views/Reusable/displayItem"
import EditItem from "./views/Edititem/editItem"
import ViewCatImg from "./views/ViewCatImg/display"

const AddCarousel = React.lazy(() => import("./views/AddCarousel/addCarousel"));
const EditCarousel = React.lazy(() => import("./views/EditCarousel/display"));

const AddGalleryImage = React.lazy(() => import("./views/AddGalleryImage/addGalleryImage"));
const EditGalleryImage = React.lazy(() => import("./views/EditGalleryImage/display"));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddItem = React.lazy(() => import("./views/AddItem/additem"));
const AddCategory= React.lazy(() => import("./views/AddCategory/addCategory"));
const EditCategories= React.lazy(() => import("./views/EditCategories/display"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const EditCategory= React.lazy(() => import("./views/EditCategory/display"));
// const ViewItemsCat= React.lazy(() => import("./views/ViewItemsCat/display"));
// const AllItem = React.lazy(() =>import("./views/AllItems/allItems") );

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/additems',exact: true, name: 'Add Items', component:AddItem},

  { path: '/addcarousel',exact: true, name: 'Add Carousel', component:AddCarousel},
  { path: '/editcarousel',exact: true, name: 'Edit Carousel', component:EditCarousel},

  { path: '/view', exact: true, name:"View", component:ViewItemsCat},
  { path: '/view/category', exact: true,  name:"Categories", component:ViewItemsCat},
  { path: '/view/category/subcategory', exact: true,  name:"subcategories"},
  { path: '/view/category/subcategory/:sub', exact: true,  name:"Items", component:AllItem},
  { path: '/view/category/:cat', exact: true,  name:"Items", component:AllItem},

  { path: '/view/allitems', exact: true, name:"all items", component:AllItem},

  { path: '/categoryimage', exact: true, name:"category image", component:ViewCatImg},

  { path: '/addcategory', exact: true, name: 'Add Category', component:AddCategory},

  { path: '/editcategory', exact: true, name: 'Edit Categories', component:EditCategories},
  { path: '/editcategory/:slug', exact: true, name: 'Edit Category', component:EditCategory},

  { path: '/edititem/:slug', exact: true, name: 'Edit Item', component:EditItem},

  { path: '/galleryimage', exact: true, name: 'Add Gallery Image', component:AddGalleryImage},
  { path: '/editgalleryimage', exact: true, name: 'Edit Gallery Image', component:EditGalleryImage}

];

export default routes;
