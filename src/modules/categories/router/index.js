export default {
  name: 'categories',
  component: () => import(/* webpackChunkName: "categories"*/ '@/modules/categories/layouts/CategoryLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-category',
      component: () => import(/* webpackChunkName: "no-category" */ '../views/NoCategorySelected.vue'),
    },
    {
      path: 'list',
      name: 'categories-list',
      component: () => import(/* webpackChunkName: "categories-list" */ '../views/CategoriesList.vue'),
    },
    {
      path: ':id',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue'),
      props: ( route ) => {
        return {
          id: route.params.id
        }
      }
    }
  ]
}