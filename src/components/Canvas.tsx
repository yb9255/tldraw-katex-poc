import { type Editor, Tldraw } from "tldraw";
import ExportCanvasButton from "./ExportCanvasButton";
import { useState } from "react";
import { BlockMath } from "react-katex";

const Canvas = () => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [math, setMath] = useState<string | null>(null);

  return (
    <>
      <div style={{ width: "420px", height: "420px" }}>
        <Tldraw
          forceMobile
          autoFocus={false}
          onMount={(editor) => setEditor(editor)}
        />
      </div>
      <ExportCanvasButton editor={editor} setMath={setMath} />
      {math && <BlockMath math={math} />}
    </>
  );
};

export default Canvas;
