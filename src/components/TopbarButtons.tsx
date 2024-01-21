import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import { mdiArrowULeftTop, mdiArrowURightTop, mdiBorderRadius, mdiFullscreen, mdiXml } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';

interface CommandButton {
  id: string;
  iconPath: string;
  options?: Record<string, any>;
  disabled?: () => boolean;
}

export default function TopbarButtons({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { UndoManager, Commands } = editor;

  const cmdButtons: CommandButton[] = [
    { id: 'core:component-outline', iconPath: mdiBorderRadius },
    { id: 'core:fullscreen', iconPath: mdiFullscreen, options: { target: '#root' } },
    { id: 'core:open-code', iconPath: mdiXml },
    { id: 'core:undo', iconPath: mdiArrowULeftTop, disabled: () => !UndoManager.hasUndo() },
    { id: 'core:redo', iconPath: mdiArrowURightTop, disabled: () => !UndoManager.hasRedo() },
  ];

  const updateCounter = () => setUpdateCounter((value) => value + 1);

  const onCommand = (id: string) => {
    const button = cmdButtons.find((btn) => btn.id === id);
    button && updateCounter();
  };

  const attachEventListeners = () => {
    const cmdEvent = 'run stop';
    const updateEvent = 'update';
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  };

  const renderButton = (button: CommandButton) => (
    <button
      key={button.id}
      type='button'
      className={cx(BTN_CLS, MAIN_BORDER_COLOR, Commands.isActive(button.id) && 'text-sky-300', button.disabled?.() && 'opacity-50')}
      onClick={() => (Commands.isActive(button.id) ? Commands.stop(button.id) : Commands.run(button.id, button.options))}
      disabled={button.disabled?.()}
    >
      <Icon path={button.iconPath} size={1} />
    </button>
  );

  useEffect(attachEventListeners, []);

  return <div className={cx('flex gap-3', className)}>{cmdButtons.map(renderButton)}</div>;
}
