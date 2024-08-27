import { exportToBlob, Editor, downsizeImage } from "tldraw";

type Props = {
  editor: Editor | null;
  setMath: (math: string) => void;
};

function ExportCanvasButton({ editor, setMath }: Props) {
  if (!editor) return null;

  const handleImageExport = async () => {
    const shapeIds = editor.getCurrentPageShapeIds();

    if (shapeIds.size === 0) return alert("No shapes on the canvas");

    const blob = await exportToBlob({
      editor,
      ids: [...shapeIds],
      format: "png",
    });

    const downsizedBlob = await downsizeImage(blob, 420, 420);

    const formData = new FormData();
    const newFile = new File([downsizedBlob], "new-file");

    formData.append("file", newFile);

    try {
      const response = await fetch(
        "https://dragon-fluent-skink.ngrok-free.app/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      // console.log("data: ", data);
      // console.log("data sliced: ", data.results[0].slice(2, -2));

      setMath(data.results[0].slice(2, -2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      style={{ pointerEvents: "all", fontSize: 18, backgroundColor: "thistle" }}
      onClick={handleImageExport}
    >
      Export canvas as image
    </button>
  );
}

export default ExportCanvasButton;
