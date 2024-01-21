import React from 'react';
import { BlocksResultProps } from '@grapesjs/react';
import { MAIN_BORDER_COLOR, cx } from './common';

export type CustomBlockManagerProps = Pick<BlocksResultProps, 'mapCategoryBlocks' | 'dragStart' | 'dragStop'>;

const Block = ({ block, dragStart, dragStop }: { block: any; dragStart: Function; dragStop: Function }) => {
  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    dragStart(block, ev.nativeEvent);
  };

  const handleDragEnd = () => {
    dragStop(false);
  };

  return (
    <div
      key={block.getId()}
      draggable
      className={cx('flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors', MAIN_BORDER_COLOR)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='h-10 w-10' dangerouslySetInnerHTML={{ __html: block.getMedia()! }} />
      <div className='text-sm text-center w-full' title={block.getLabel()}>
        {block.getLabel()}
      </div>
    </div>
  );
};

const BlockCategory = ({
  category,
  blocks,
  dragStart,
  dragStop,
}: {
  category: string;
  blocks: any[];
  dragStart: Function;
  dragStop: Function;
}) => {
  const renderBlock = (block: any) => <Block key={block.getId()} block={block} dragStart={dragStart} dragStop={dragStop} />;

  return (
    <div key={category}>
      <div className={cx('py-2 px-4 border-y', MAIN_BORDER_COLOR)}>{category}</div>
      <div className='grid grid-cols-2 gap-2 p-2'>{blocks.map(renderBlock)}</div>
    </div>
  );
};

const CustomBlockManager = ({ mapCategoryBlocks, dragStart, dragStop }: CustomBlockManagerProps) => {
  const renderBlockCategory = ([category, blocks]: [string, any[]]) => (
    <BlockCategory key={category} category={category} blocks={blocks} dragStart={dragStart} dragStop={dragStop} />
  );

  return <div className='gjs-custom-block-manager text-left'>{Array.from(mapCategoryBlocks).map(renderBlockCategory)}</div>;
};

export default CustomBlockManager;
