export const TABS_DATA = [
    {
      id: 1,
      label: 'Tweets',
      isActive: false,
      route: (param) => `/${param}`
    },
    {
      id: 2,
      label: 'Tweets & Replies',
      isActive: false,
      route: ''
    },
    {
      id: 3,
      label: 'Media',
      isActive: false,
      route: ''
    },
    {
      id: 4,
      label: 'Likes',
      isActive: false,
      route: (param) => `/${param}/likes`
    },
  ];