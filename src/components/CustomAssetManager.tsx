import React from 'react';
import { AssetsResultProps, useEditor } from '@grapesjs/react';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import type { Asset } from 'grapesjs';
import { BTN_CLS } from './common';

export type CustomAssetManagerProps = Pick<AssetsResultProps, 'assets' | 'close' | 'select'>;

export default function CustomAssetManager({ assets, select, close }: CustomAssetManagerProps) {
  const editor = useEditor();

  const handleRemoveAsset = (asset: Asset) => {
    editor.Assets.remove(asset);
  };

  const handleSelectAsset = (asset: Asset) => {
    select(asset, true);
  };

  const renderAssetButtons = (asset: Asset) => (
    <div className='flex flex-col items-center justify-end absolute top-0 left-0 w-full h-full p-5 bg-zinc-700/75 group-hover:opacity-100 opacity-0 transition-opacity'>
      <button type='button' className={BTN_CLS} onClick={() => handleSelectAsset(asset)}>
        Select
      </button>
      <button type='button' className='absolute top-2 right-2' onClick={() => handleRemoveAsset(asset)}>
        <Icon size={1} path={mdiClose} />
      </button>
    </div>
  );

  const renderAsset = (asset: Asset) => (
    <div key={asset.getSrc()} className='relative group rounded overflow-hidden'>
      <img className='display-block' src={asset.getSrc()} />
      {renderAssetButtons(asset)}
    </div>
  );

  return <div className='grid grid-cols-3 gap-2 pr-2'>{assets.map((asset) => renderAsset(asset))}</div>;
}
