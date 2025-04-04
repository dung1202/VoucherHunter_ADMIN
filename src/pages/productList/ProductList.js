import "./productlist.css";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { DeleteOutline } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct, deleteProduct } from "../../axios";

export default function ProductList() {
  const [product, setProduct] = useState([[]]);
  const [number, setNumber] = useState(0);
  const [time, setTime] = useState(0);
  const [indexPage, setIndexPage] = useState(1)
  setTimeout(() => {
    if (time < 3) setTime(time + 1);
    else setTime(0);
  }, 2000);
  useEffect(() => {
    getProduct().then((res) => {
      const data = res.data
      console.log(data)
      setNumber(data.length)
      let i = 0
      let mang = [[]]
      let page = []
      while (i < data.length) {
        page.push(data[i])
        if ((i + 1) % 10 === 0 || i + 1 === data.length) {
          mang.push(page)
          page = []
        }
        i++
      }
      console.log(mang)
      setProduct(mang)
    });
  }, []);
  const deletedata = async (id) => {
    await deleteProduct(id);
    getProduct().then((res) => {
      // console.log(res.data)
      setProduct(res.data);
    });
  };

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );
  const columns = [
    { field: "_id", headerName: "ID", width: 100, height: 100 },
    {
      field: "product",
      headerName: "Picture",
      width: 110,
      height: 100,
      renderCell: (params) => {
        let ktra = 0;
        if (params.row.listphotos.length - 1 >= time) ktra = time;
        else ktra = params.row.listphotos.length - 1
        // console.log(ktra)
        return (
          <div className="productListItem">
            <img
              alt=""
              className="productListImg"
              src={params.row.listphotos[ktra]}
            />
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150, height: 100 },
    {
      field: "listedPrice",
      headerName: "Price",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return <>{numberFormat.format(params.row.listedPrice)}</>;
      },
    },
    {
      field: "discountPrice",
      headerName: "DiscountPrice",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return (
          <div style={{ color: "red" }}>
            {numberFormat.format(params.row.discountPrice)}
          </div>
        );
      },
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      height: 100,
    },
    {
      field: "is_hot",
      headerName: "Hot",
      width: 100,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_hot ? <CheckIcon className="sidebarIcon" /> : null}
          </>
        );
      },
    },
    {
      field: "in_slider",
      headerName: "Slider",
      width: 100,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.in_slider ? (
              <CheckIcon className="sidebarIcon" />
            ) : null}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      height: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deletedata(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{ height: "92.4vh", width: "100%" }}>
      <DataGrid
        rows={product[indexPage]}
        columns={columns}
        rowCount={number}
        getRowId={(row) => row._id}
        paginationMode="server"
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        // checkboxSelection
        onPaginationModelChange={(page) => {
          setIndexPage(page.page + 1)
        }}
      />
    </div>
  );
}
