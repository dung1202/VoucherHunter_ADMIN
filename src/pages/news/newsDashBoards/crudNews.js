import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./crudNew.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { getNews, deleteNews } from "../../../axios";

export default function CrudNews() {
  const [data, setData] = useState([]);
  const [trang, setTrang] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  useEffect(() => {
    let mang = [];
    getNews(1).then((res) => {
      setTrang(res.data);
      // console.log(res.data)
      res.data.data.map((item) => {
        let obj = {
          id: item._id,
          title: item.title,
          link:
            "https://voucherhunter-topaz.vercel.app/detail_news/" +
            item.title.replaceAll(" ", "_"),
          img: item.image,
        };
        mang.push(obj);
        return <div></div>;
      });
      setData(mang);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteNews(id).then();

    let mang = [];
    getNews(indexPage).then((res) => {
      setTrang(res.data);
      res.data.data.map((item) => {
        let obj = {
          id: item._id,
          title: item.title,
          link:
            "https://voucherhunter-topaz.vercel.app/detail_news/" +
            item.title.replaceAll(" ", "_"),
          img: item.image,
        };
        mang.push(obj);
        return <div></div>;
      });
      setData(mang);
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    {
      field: "img",
      headerName: "Picture",
      width: 100,
      renderCell: (params) => {
        // console.log(params)
        return (
          <>
            <img alt="" className="newsListImg" src={params.row.img} />
          </>
        );
      },
    },
    { field: "title", headerName: "Title", width: 600 },
    // {
    //   field: "link",
    //   headerName: "Link",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`${params.row.link}`}>
    //           <button className="userListEdit">Link</button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editor/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="container" style={{ height: "92.4vh", width: "100%" }}>
      {/* <Link to={"/editor/"}>
        <button className="userListEdit">Set Up News</button>
      </Link> */}
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={trang.totalNews}
        paginationMode="server"
        initialState={{
          pagination: {
            paginationModel: { pageSize: data.length ? data.length : 10 },
          },
        }}
        pageSizeOptions={[10]}
        // disableSelectionOnClick
        // disableRowSelectionOnClick
        onPaginationModelChange={(page) => {
          let mang = [];
          setIndexPage(page.page + 1);
          getNews(page.page + 1).then(async (res) => {
            await res.data.data.map((item) => {
              let obj = {
                id: item._id,
                title: item.title,
                link:
                  "https://voucherhunter-topaz.vercel.app/detail_news/" +
                  item.title.replaceAll(" ", "_"),
                img: item.image,
              };
              mang.push(obj);
              return <div></div>;
            });
            setData(mang);
          });
        }}
      />
    </div>
  );
}
