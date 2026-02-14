import "../styles/sell.css";

import { useState, useCallback, useMemo, useEffect } from "react";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import clsx from "clsx";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { config } from "../../../config";

// valueOptions: ['Pending', 'Completed', 'Cancelled']
// use fetch to get rows data
// these row data are generated when seller creates an order on his dashboard
const initialRows = [
  {
    id: 1,
    order: 1,
    createdDate: "Jan 2022",
    customer: "Ganesh Rice Mill",
    location: "Itahri",
    product: "Rice",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Pending",
  },
  {
    id: 2,
    order: 2,
    createdDate: "Jan 2022",
    customer: "Bibek Rice Mill",
    location: "Itahri",
    product: "Wheat",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Completed",
  },
  {
    id: 3,
    order: 3,
    createdDate: "Jan 2022",
    customer: "Yaman Rice Mill",
    location: "Itahri",
    product: "Maize",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Pending",
  },
  {
    id: 4,
    order: 4,
    createdDate: "Jan 2022",
    customer: "Hari Rice Mill",
    location: "Itahri",
    product: "Corn",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Cancelled",
  },
  {
    id: 4,
    order: 4,
    createdDate: "Jan 2022",
    customer: "Hari Rice Mill",
    location: "Itahri",
    product: "Corn",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Cancelled",
  },
  {
    id: 4,
    order: 4,
    createdDate: "Jan 2022",
    customer: "Hari Rice Mill",
    location: "Itahri",
    product: "Corn",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Cancelled",
  },
  {
    id: 4,
    order: 4,
    createdDate: "Jan 2022",
    customer: "Hari Rice Mill",
    location: "Itahri",
    product: "Corn",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Cancelled",
  },
  {
    id: 4,
    order: 4,
    createdDate: "Jan 2022",
    customer: "Hari Rice Mill",
    location: "Itahri",
    product: "Corn",
    price: 20,
    quantity: 150,
    amount: 20000,
    status: "Cancelled",
  },
  
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const SellerOrders = () => {
  const [rows, setRows] = useState(initialRows);

  const deleteOrder = useCallback(
    (id) => () => {
      //do the delete post request here
      toast.success("Order Removed successfully");

      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const updateStatusToPending = useCallback(
    (id) => () => {
      //update the order status to Cancelled here
      toast.success("Order is on pending");

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: "Pending" } : row
        )
      );
    },
    []
  );

  const updateStatusToComplete = useCallback(
    (id) => () => {
      //update the order status to complete here
      toast.success("Order completed successfully");

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: "Completed" } : row
        )
      );
    },
    []
  );

  const updateStatusToCancelled = useCallback(
    (id) => () => {
      //update the order status to Cancelled here
      toast.success("Order cancelled successfully");

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: "Cancelled" } : row
        )
      );
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        field: "order",
        headerName: "Order",
        type: "string",
        width: 90,
      },
      {
        field: "createdDate",
        headerName: "Created Date",
        width: 120,
      },
      {
        field: "customer",
        headerName: "Customer",
        type: "string",
        width: 170,
      },
      {
        field: "location",
        headerName: "Location",
        type: "string",
        width: 120,
      },
      {
        field: "product",
        headerName: "Product",
        type: "string",
        width: 100,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 80,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        width: 100,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        width: 110,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        cellClassName: (params) => {
          if (params.value == null) {
            return "";
          }

          return clsx("super-app", {
            pending: params.value == "Pending",
            completed: params.value == "Completed",
            cancelled: params.value == "Cancelled",
          });
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteOrder(params.id)}
          />,
          <GridActionsCellItem
            icon={<CheckCircleIcon />}
            label="Complete"
            onClick={updateStatusToComplete(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<PendingIcon />}
            label="Pending"
            onClick={updateStatusToPending(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={updateStatusToCancelled(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [
      deleteOrder,
      updateStatusToPending,
      updateStatusToComplete,
      updateStatusToCancelled,
    ]
  );

  return (
    <>
      <label htmlFor="#" className="content-header">
        Orders History
      </label>

      <div className="sell-page-container">
        <div className="orders-data-grid">
          <Box
            sx={{
              height: 550,
              width: "100%",
              backgroundColor: "white",
              "& .super-app-theme--cell": {
                color: "#000000",
                fontWeight: "600",
              },
              "& .super-app.pending": {
                color: "#000000",
                fontWeight: "600",
              },
              "& .super-app.completed": {
                color: "#000000",
                fontWeight: "600",
              },
              "& .super-app.cancelled": {
                color: "#000000",
                fontWeight: "600",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              // loading={<Loading />}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Box>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SellerOrders;
