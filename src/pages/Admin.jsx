import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { useQuery } from "react-query";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [itemToDelete, setItemToDelee] = React.useState();
  const [itemToEdit, setItemToEdit] = React.useState();

  const handleClickOpen = (id) => {
    setOpen(true);
    setItemToDelee(id);
  };
  const handleEditOpen = (id) => {
    setOpenEdit(true);
    setItemToEdit(id);
  };
  const handleDelete = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${itemToDelete}`)
      .then((e) => {
        console.log(e);
        setItemToDelee(null);
        getData();
        setOpen(false);
      });
  };
  const handleCloseEdit = () => {
    setItemToEdit(null);
    setOpenEdit(false);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleClose = () => {
    setItemToDelee(null);
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 500 },
    { field: "description", headerName: "Description", width: 700 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: "1fr",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleClickOpen(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => handleEditOpen(params.row.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const [rowss, setRowss] = React.useState();

  const getData = () => {
    axios.get("https://fakestoreapi.com/products").then((e) => {
      const newData = e.data.map((e) => ({
        id: e.id,
        title: e.title,
        price: e.price,
        description: e.description,
      }));
      setRowss(newData);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>Creating new product</DialogContentText>

          <Formik
            initialValues={{
              title: "",
              price: 0,
              description: "",
              image: "",
              category: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(`https://fakestoreapi.com/products`, values)
                .then((e) => {
                  console.log(e);
                  setSubmitting(false);
                  handleCloseCreate();
                });
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  margin="normal"
                  fullWidth
                  label="Title"
                />
                <br />
                <Field
                  component={TextField}
                  type="number"
                  label="Price"
                  margin="normal"
                  fullWidth
                  name="price"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Description"
                  margin="normal"
                  fullWidth
                  name="description"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Category"
                  margin="normal"
                  fullWidth
                  name="category"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Image url"
                  margin="normal"
                  fullWidth
                  name="image"
                />
                {isSubmitting && <LinearProgress />}
                <br />
                <DialogActions>
                  <Button onClick={handleCloseCreate}>Cancel</Button>
                  <Button disabled={isSubmitting} onClick={submitForm}>
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Editing item with id : {itemToEdit}
          </DialogContentText>

          <Formik
            initialValues={{
              title: "",
              price: 0,
              description: "",
              category: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .patch(
                  `https://fakestoreapi.com/products/${itemToEdit}`,
                  values
                )
                .then((e) => {
                  console.log(e);
                  setSubmitting(false);
                  handleCloseEdit();
                });
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  margin="normal"
                  fullWidth
                  label="Title"
                />
                <br />
                <Field
                  component={TextField}
                  type="number"
                  label="Price"
                  margin="normal"
                  fullWidth
                  name="price"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Description"
                  margin="normal"
                  fullWidth
                  name="description"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Category"
                  margin="normal"
                  fullWidth
                  name="category"
                />
                {isSubmitting && <LinearProgress />}
                <br />
                <DialogActions>
                  <Button onClick={handleCloseEdit}>Cancel</Button>
                  <Button disabled={isSubmitting} onClick={submitForm}>
                    Edit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete item with id {itemToDelete} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {rowss ? (
        <DataGrid
          rows={rowss}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      ) : (
        "...Loading"
      )}
      <Button
        variant="contained"
        color="success"
        style={{ margin: 10 }}
        onClick={() => setOpenCreate(true)}
      >
        Create
      </Button>
    </div>
  );
}
