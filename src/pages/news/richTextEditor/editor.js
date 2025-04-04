import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from 'react-html-parser';
// import { storage } from "./uploadFireBase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { getuserid, CreateNews } from "../../../axios";
import "../../news/richTextEditor/edit.css";
// import { Publish } from "@material-ui/icons";
import { Publish } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

export default function Editor(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("");
  const [userName, setuserName] = useState("");
  const [userId, setuserId] = useState("")
  const [linkAnh, setlinkAnh] = useState(null);
  const [file, setfile] = useState("");

  useEffect(() => {
    // console.log(props.tt);
    getuserid(jwtDecode(localStorage.getItem('accessToken'))._id).then((res) => {
      setuserName(res.data.username);
      setuserId(res.data._id);
    })
  }, []);
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

  const handle2 = (e) => {
    const data = e.target.value;
    setTitle(data);
    // console.log(data);
  };

  const submit = (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    if (file)
      fromdata.append("file", file, file.name);

    // fromdata.append("creator_id", userId);
    // fromdata.append("creator", userName);
    // fromdata.append("title", title);
    fromdata.append("content", value);

    // console.log(userId, " ", value, " ", userName, " ", title)
    // console.log(value)


    const data = {
      creator_id: userId,
      creator: userName,
      title: title,
      // content: value
    }


    const upID = async () => {
      // let id = await fetch("https://anonymous-be.onrender.com/news/auth/create", {
      //   method: "POST",
      //   headers: {
      //     // Accept: "application/json",
      //     // "Content-Type": "application/json",
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      //   body: fromdata
      // })

      let id = ''
      let dataC = await CreateNews(data)
      id = dataC.data.data._id
      if (id)
        fetch(`https://anonymous-be.onrender.com/news/auth/update/${id}`, {
          method: "PUT",
          headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: fromdata
        })
          .then((response) => response.json())
          .then((json) => {
            navigate("/newsdashboards");
          });
    }
    upID()
  };


  const upanh = async (e) => {
    // console.log(e.target.files[0])
    setfile(e.target.files[0]);
    const ok = e.target.files[0];
    // console.log(ok);
    // let storageRef = ref(storage, `anh/${ok.name}`);
    // let uploadTask = uploadBytesResumable(storageRef, ok);
    // uploadTask.on(
    //   (error) => console.log(error),
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setlinkAnh(downloadURL);
    //     });
    //   }
    // );

    const apiKey = "903c15c56da1802d9afc5abb8eab43b6"

    const uploadImgBB = async (file) => {
      const formData = new FormData();
      // Thêm file hình ảnh vào FormData để gửi lên server
      formData.append("image", file);
      // console.log(file)
      let string1 = String(Math.random(0, 10000))
      let string2 = String(Math.random(0, 10000))
      try {
        // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey
        const response = await fetch(`https://api.imgbb.com/1/upload?name=${String(userId).concat('_', string1, "_", file.name, "_", string2)}&key=${apiKey}`, {
          method: "POST", // Phương thức POST để tải file lên
          body: formData, // Dữ liệu gửi đi là FormData chứa file ảnh
        });

        // Chuyển đổi phản hồi từ dạng JSON thành object JavaScript
        const data = await response.json();
        // Trả về URL của hình ảnh sau khi tải lên thành công
        // console.log(data.data.url)
        setlinkAnh(data.data.url)
      } catch (error) {
        // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
        console.log(error);
        return null; // Trả về null nếu gặp lỗi
      }
    }
    await uploadImgBB(ok)
  };

  return (
    <div className="App1">
      <div className="container">
        <div className="wrapper">
          <h1>Create news</h1>
          <form className="form-group">
            <div className="addNewsForm">
              <label>Title</label>
              <input
                type="text"
                onChange={handle2}
                placeholder="Title"
                className="form-control"
              />
            </div>
            <div className="addNewsForm">
              <label>Image</label>
              <div>
                <img alt="" className="userShowImg" src={linkAnh} />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={upanh}
                />
              </div>
            </div>
            <div className="addNewsForm ok">
              <label>Content</label>
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue(data);
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
            </div>
            <Link to={"/newsdashboards"}>
              <div className="addNewsButton" onClick={submit}>
                Create
              </div>
            </Link>
          </form>
        </div>
      </div>
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
            console.log(error);
            return null; // Trả về null nếu gặp lỗi
          }
        })
    );
  }
}
