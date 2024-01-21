import * as React from 'react';
import { PagesResultProps } from '@grapesjs/react';
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

export default function CustomPageManager({ pages, selected, add, select, remove }: PagesResultProps) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;
    const newPage = {
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    };
    add(newPage);
  };

  const renderDeleteButton = (page) => (
    <button type='button' onClick={() => remove(page)}>
      <Icon size={0.7} path={mdiDelete} />
    </button>
  );

  const renderPagesList = () => (
    <div className='gjs-custom-page-manager'>
      <div className='p-2'>
        <button type='button' className={BTN_CLS} onClick={addNewPage}>
          Add new page
        </button>
      </div>

      {pages.map((page, index) => (
        <div key={page.getId()} className={getPageListItemClassName(index)}>
          <button type='button' className='flex-grow text-left' onClick={() => select(page)}>
            {page.getName() || 'Untitled page'}
          </button>

          {selected !== page && renderDeleteButton(page)}
        </div>
      ))}
    </div>
  );

  const getPageListItemClassName = (index) => cx('flex items-center py-2 px-4 border-b', index === 0 && 'border-t', MAIN_BORDER_COLOR);

  return renderPagesList();
}
