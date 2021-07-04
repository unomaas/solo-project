//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
// import './ItemView.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles, theme, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 



export default function KitView({ event }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const items = useSelector((store) => store.itemsReducer.itemsReducer);
  const kits = useSelector((store) => store.kitsReducer.kitsReducer);

  // const [blankInput, setBlankInput] = useState('');
  const [newItem, setNewItem] = useState({ name: '' });

  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_KITS' });
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  // const handleChange = (key, value) => {
  //   console.log('In handleChange, key/value:', key, '/', value);
  //   setNewItem({ ...newItem, [key]: value });
  // }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleAdd = kit => {
    console.log('In handleAdd, kit:', kit);
    // ⬇ Don't refresh until submit:
    // event.preventDefault();
    // ⬇ Sending data to our saga: 
    // dispatch({
    //   type: 'ADD_NEW_ITEM', payload: {
    //     name: newItem.name,
    //     kit_id: params.id
    //   }
    // });
    // ⬇ Clearing inputs after submit:
    // setNewItem({name: ''});
  } // End handleAdd

  /** ⬇ handleDelete:
   * When clicked, this will delete the clicked item. 
   */
  const handleRemove = item => {
    console.log('In handleRemove, kit:', kit);
    // dispatch({ type: 'DELETE_ITEM', payload: item });
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
                Select Kits to Bring With:
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            <StyledTableRow>
              <TableCell>
                {/* <TextField
                    label="Add a new Item?"
                    value={newItem.name}
                    className={classes.input}
                    // onChange={event => handleChange('name', event.target.value)}
                    required
                    type="search"
                    inputProps={{ maxLength: 50 }}
                    size="small"
                  /> */}
                {/* <Select
                    name="kitlist"
                    label="kit?"
                  >
                    
                  </Select> */}

                <TextField
                  label="Add a Kit?"
                  className={classes.select}
                  // onChange={event => handleChange('event_category', event.target.value)}
                  required
                  select
                  size="small"
                >
                  {kits?.map(kit => (
                    <MenuItem key={kit.id} value={kit.id}>{kit.name}</MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell
                padding="none"
                align="right"
              >
                <Button
                  name="submit"
                  onClick={() => handleAdd(kit)}
                  color="primary"
                  size="small"
                >
                  <CheckCircleOutlineIcon />
                </Button>
              </TableCell>
            </StyledTableRow>

            {kits.map((kit) => (
              <StyledTableRow key={kit.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableRows}
                >
                  {kit.name}
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
                    onClick={() => handleRemove(kit)}
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
