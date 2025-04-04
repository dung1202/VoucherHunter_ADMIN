import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { storage } from "./../news/richTextEditor/uploadFireBase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { sendNewsletter } from "../../axios";
import "./Newsletter.css";

export default function Newsletter() {
  const [description, setDescription] = useState("");
  const [note, setnote] = useState("");
  const wewe = () => {
    if (description) {
      let body = {
        content: description,
      };
      sendNewsletter(body)
        .then((res) => {
          // console.log(res.data);
          setnote("Send newsletter successfully");
        })
      // .catch((err) => {
      //   console.log(err);
      // });
    } else {
      setnote("empty");
    }
  };
  const custom_config = {
    licenseKey: 'GPL',
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "imageUpload",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Newsletter</h1>
      <form className="addProductForm">
        <div className="addProductItem ok">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
              // console.log(data);
            }}
            config={custom_config}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
          <div style={{ color: "red" }}>{note}</div>
        </div>

        <div className="addProductButton" onClick={wewe}>
          Send
        </div>
      </form>
    </div>
  );
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    // console.log(loader);
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          // let storageRef = ref(storage, `files/${file.name}`);
          // let uploadTask = uploadBytesResumable(storageRef, file);
          // uploadTask.on(
          //   (error) => console.log(error),
          //   () => {
          //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //       resolve({
          //         default: downloadURL,
          //       });
          //     });
          //   }
          // );

          const apiKey = "903c15c56da1802d9afc5abb8eab43b6"
          const formData = new FormData();
          // Thêm file hình ảnh vào FormData để gửi lên server
          formData.append("image", file);
          // console.log(file)
          let string1 = String(Math.random(0, 10000))
          let string2 = String(Math.random(0, 10000))
          try {
            // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey
            const response = await fetch(`https://api.imgbb.com/1/upload?name=${string1.concat('_', file.name, "_", string2)}&key=${apiKey}`, {
              method: "POST", // Phương thức POST để tải file lên
              body: formData, // Dữ liệu gửi đi là FormData chứa file ảnh
            });

            // Chuyển đổi phản hồi từ dạng JSON thành object JavaScript
            const data = await response.json();
            // Trả về URL của hình ảnh sau khi tải lên thành công
            // console.log(data.data.url)
            resolve({
              default: data.data.url,
            });
          } catch (error) {
            // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
            // console.log(error);
            return null; // Trả về null nếu gặp lỗi
          }
        })
    );
  }
}
