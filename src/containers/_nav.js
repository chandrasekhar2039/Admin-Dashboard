import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
 {
   _tag: 'CSidebarNavItem',
   name: 'Dashboard',
   to: '/dashboard',
   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
 },
 {
    _tag: 'CSidebarNavTitle',
    _children: ['Manage Home']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Add Carousel',
    to: "/addcarousel",
    icon:"cil-image-plus",
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Edit Carousel',
    to: "/editcarousel",
    icon:"cil-pencil",
  },
 {
    _tag: 'CSidebarNavTitle',
    _children: ['Manage Items']
  },
 {
   _tag: 'CSidebarNavItem',
   name: 'Add Items',
   to: "/additems",
   icon:"cil-library-add",
 },
 {
    _tag: 'CSidebarNavDropdown',
    name: 'View',
    route: '/view',
    icon: 'cil-short-text',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to: "/view/Category"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'All Items',
        to: "/view/allitems",
      }
    ],
  },
 {
    _tag: 'CSidebarNavTitle',
    _children: ['Manage Category']
  },
 {
   _tag: 'CSidebarNavItem',
   name: 'Add Category',
   to: "/addcategory",
   icon:"cil-playlist-add"
 },
 {
   _tag: 'CSidebarNavItem',
   name: 'Edit Category',
   to: "/editcategory",
   icon:"cil-color-border"
 },
 {
   _tag: 'CSidebarNavItem',
   name: 'View Category Image',
   to: "/categoryimage",
   icon:"cil-image"
 },
 {
    _tag: 'CSidebarNavTitle',
    _children: ['Manage Gallery']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Add Gallery Image',
    to: "/galleryimage",
    icon:"cil-wallpaper"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Edit Gallery Image',
    to: "/editgalleryimage",
    icon:"cil-filter-photo"
  }

]

export default _nav
