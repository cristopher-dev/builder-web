import { Editor } from "grapesjs";

export const onEditor = (editor: Editor) => {
  console.log('Editor loaded');
  (window as any).editor = editor;
};
