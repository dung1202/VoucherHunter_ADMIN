import "./product.css";
import React, { useEffect, useState } from "react";
import { getProductid, updateproduct } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { storage } from "../news/richTextEditor/uploadFireBase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function Product() {
  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [file, setFile] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [in_slider, setIn_slider] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(false);
  const [is_hot, setIs_hot] = useState(false);
  const [supplier, setsupplier] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [vote, setvote] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  // console.log(param);
  const [id] = useState(param.productId);
  const changeFile = (e) => {
    // console.log(e.target.files);
    setFile(e.target.files);
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

  useEffect(() => {
    if (id) {
      getProductid(id).then((res) => {
        let data = res.data;
        setListedPrice(data.listedPrice);
        setName(data.name);
        setQuantity(data.quantity);
        setIs_hot(data.is_hot);
        setIn_slider(data.in_slider);
        setDescription(data.description);
        setDiscountPrice(data.discountPrice);
        setvote(data.vote);
        setTags(data.tags.join(" "));
        setsupplier(data.supplier);
        // console.log(data.description)
      });
    }
  }, [id]);
  const wewe = () => {
    const formData = new FormData();
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i], file[i].name);
      }
    }
    formData.append("name", name);
    formData.append("listedPrice", listedPrice);
    formData.append("is_hot", is_hot);
    formData.append("discountPrice", discountPrice);
    formData.append("quantity", quantity);
    formData.append("in_slider", in_slider);
    formData.append("vote", vote);
    formData.append("description", description);
    formData.append("supplier", supplier);
    formData.append("tags", tags);
    // console.log(in_slider);
    updateproduct(id, formData).then(() => {
      // console.log("ok");
      navigate("/products");
    });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Update Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            onChange={changeFile}
            accept="image/png, image/jpeg"
            multiple="multiple"
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="123"
            value={listedPrice}
            onChange={(e) => setListedPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>DiscountPrice</label>
          <input
            type="number"
            placeholder="123"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="123"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Vote</label>
          <input
            type="number"
            placeholder="123"
            value={vote}
            min={1}
            max={5}
            onChange={(e) => setvote(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Supplier</label>
          <input
            type="text"
            placeholder="Supplier"
            value={supplier}
            onChange={(e) => setsupplier(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Hashtag</label>
          <input
            type="text"
            placeholder="Hashtag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Is Hot</label>
          <input
            type="checkbox"
            checked={is_hot}
            onChange={(e) => {
              setIs_hot(!is_hot);
            }}
          />
        </div>
        <div className="addProductItem">
          <label>In Slider</label>
          <input
            type="checkbox"
            checked={in_slider}
            onChange={(e) => {
              setIn_slider(!in_slider);
            }}
          />
        </div>
        <div className="addProductItem ok">
          <label>Description</label>
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
        </div>
        <div className="addProductButton" onClick={wewe}>
          Update
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
