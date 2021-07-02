//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './ItemsView.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles, theme, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 



export default function ItemsView({ kit }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const items = useSelector((store) => store.itemsReducer.itemsReducer);
  const [newItem, setNewItem] = useState({});

  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ITEMS', payload: { id: params.id } });
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setNewItem({ ...newItem, [key]: value });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, newItem:', newItem);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending data to our saga: 
    dispatch({
      type: 'ADD_NEW_ITEM', payload: {
        name: newItem.name,
        kit_id: params.id
      }
    });
    // ⬇ Send user back to detail view:
    // history.push(`/kitdetail/${kitDetail.id}`);
  } // End handleSubmit

  /** ⬇ handleDelete:
   * When clicked, this will ask the user to confirm deletion then send to the dashboard. 
   */
  const handleDelete = item => {
    console.log('In handleDelete, item:', item);
    dispatch({ type: 'DELETE_ITEM', payload: item });

    // ⬇ Don't submit until confirm:
    // event.preventDefault();
    // swal({
    //   title: "This will delete this kit!",
    //   text: "Are you sure you wish to proceed?",
    //   icon: "warning",
    //   buttons: ["Cancel", "Delete"],
    //   dangerMode: true,
    // }) // End config
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       swal("This kit has been deleted!", {
    //         icon: "success",
    //       });
    //       // ⬇ Sending data to our saga: 
    //       dispatch({ type: 'DELETE_ITEM', payload: item });
    //       // ⬇ Send user back to dashboard:
    //       history.push(`/dashboard`);
    //     } // End if
    //   }); // End swal
  } // End handleDelete
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="ItemsView-wrapper">

      <TableContainer className="ItemsView-table" component={Paper}>
        <Table size="small">

          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHeader} colSpan={3} align="center">
                {kit.name}'s Items:
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            <StyledTableRow>
              <TableCell>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Add a new Item?"
                    className={classes.input}
                    onChange={event => handleChange('name', event.target.value)}
                    required
                    type="search"
                    inputProps={{ maxLength: 50 }}
                    size="small"
                  />
                </form>
              </TableCell>
              <TableCell
                padding="none"
                align="right"
              >
                <Button
                  name="submit"
                  onClick={handleSubmit}
                  color="primary"
                  size="small"
                >
                  <CheckCircleOutlineIcon />
                </Button>
              </TableCell>
            </StyledTableRow>

            {items.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableRows}
                >
                  {item.name}
                </TableCell>
                {/* <TableCell align="right">
                  Edit
                </TableCell> */}
                <TableCell
                  padding="none"
                  align="right"
                >
                  <Button
                    name="delete"
                    onClick={item => handleDelete(item)}
                    color="secondary"
                    size="small"
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </div>
  )
}
