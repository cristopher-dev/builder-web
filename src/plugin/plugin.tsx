export const plugin = [
  {
    id: 'gjs-blocks-basic',
    src: 'https://unpkg.com/grapesjs-blocks-basic',
  },
  {
    id: 'grapesjs-symbols',
    src: 'https://unpkg.com/@silexlabs/grapesjs-symbols',
    options: {
      '@silexlabs/grapesjs-symbols': {
        appendTo: '.gjs-pn-views-container',
      },
    },
  },

  
];
