import React from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MyUploadAdapter from "../../utils/updateChkeditor";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// Load the custom upload adapter as a plugin of the editor.
const imageConfiguration = {
  resizeOptions: [
    {
      name: "resizeImage:original",
      value: null,
      icon: "original",
    },
    {
      name: "resizeImage:50",
      value: "50",
      icon: "medium",
    },
    {
      name: "resizeImage:75",
      value: "75",
      icon: "large",
    },
  ],
  toolbar: ["resizeImage"],
};
const CHKditor = (props) => {
  return (
    <CKEditor
      editor={Editor}
      // data="<p>Hello from CKEditor 5!</p>"
      config={{
        image: {
          // Configure the available styles.
          styles: ["alignLeft", "alignCenter", "alignRight", "resizeImage"],
          // Configure the available image resize options.
          imageConfiguration,
          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            "resizeImage:25",
            "resizeImage:50",
            "resizeImage:75",
            "resizeImage:original",
            "imageStyle:alignLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignRight",
            "|",
            "resizeImage",
            "|",
            "imageTextAlternative",
          ],
        },
      }}
      onReady={(editor) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new MyUploadAdapter(loader);
        };
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        props.setValue(props.field, data);
      }}
    />
  );
};

export default CHKditor;
