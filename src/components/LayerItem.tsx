import React, { useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import { useEditor } from '@grapesjs/react';
import { mdiEyeOffOutline, mdiEyeOutline, mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import type { Component } from 'grapesjs';
import { MAIN_BORDER_COLOR, cx } from './common';

export declare interface LayerItemProps extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
}

const itemStyle = { maxWidth: `100%` };

const LayerItem = ({ component, draggingCmp, dragParent, level, ...props }: LayerItemProps) => {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join('-');
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    updateLayerData();
    setLayerRefCurrent(component);
  }, [component, level]);

  useEffect(() => {
    const componentUpdateHandler = (cmp: Component) => {
      cmp === component && updateLayerData();
    };
    const event = Layers.events.component;
    editor.on(event, componentUpdateHandler);

    return () => {
      editor.off(event, componentUpdateHandler);
    };
  }, [editor, Layers, component]);

  const renderComponents = useMemo(() => renderChildComponents(), [cmpHash, components, draggingCmp, dragParent, level]);

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event: MouseEvent) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const handleHover = (isHovered: boolean) => {
    if (!isHovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered: isHovered });
    }
  };

  const wrapperCls = getWrapperClass();
  const topBarCls = getTopBarClass();
  const openIconCls = getOpenIconClass();
  const visibilityIconCls = getVisibilityIconClass();
  const childComponentsCls = getChildComponentsClass();

  return (
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className='group max-w-full'
        data-layer-item
        ref={layerRef}
      >
        <div className={topBarCls}>
          <div style={{ marginLeft: `${level * 10}px` }} className={openIconCls} onClick={toggleOpen}>
            <Icon path={mdiMenuDown} size={0.7} rotate={open ? 0 : -90} />
          </div>
          <div className='truncate flex-grow' style={itemStyle}>
            {name}
          </div>
          <div className={visibilityIconCls} onClick={toggleVisibility}>
            <Icon path={visible ? mdiEyeOutline : mdiEyeOffOutline} size={0.7} />
          </div>
        </div>
      </div>
      {!!(open && components.length) && <div className={childComponentsCls}>{renderComponents}</div>}
    </div>
  );

  // Funciones auxiliares
  function updateLayerData() {
    level === 0 && setLayerData(Layers.getLayerData(component));
  }

  function setLayerRefCurrent(cmp: Component) {
    if (layerRef.current) {
      (layerRef.current as any).__cmp = cmp;
    }
  }

  function renderChildComponents() {
    return components.map((cmp) => (
      <LayerItem key={cmp.getId()} component={cmp} level={level} draggingCmp={draggingCmp} dragParent={dragParent} />
    ));
  }

  function getWrapperClass() {
    return cx('layer-item flex flex-col', selected && 'bg-sky-900', (!visible || isDragging) && 'opacity-50');
  }

  function getTopBarClass() {
    return cx(
      'flex items-center p-1 pr-2 border-b gap-1',
      level === 0 && 'border-t',
      MAIN_BORDER_COLOR,
      isHovered && 'bg-sky-700',
      selected && 'bg-sky-500'
    );
  }

  function getOpenIconClass() {
    return cx('cursor-pointer', !components.length && 'pointer-events-none opacity-0');
  }

  function getVisibilityIconClass() {
    return cx('group-hover:opacity-100 cursor-pointer', visible ? 'opacity-0' : 'opacity-100');
  }

  function getChildComponentsClass() {
    return cx('max-w-full', !open && 'hidden');
  }
};

export default LayerItem;
