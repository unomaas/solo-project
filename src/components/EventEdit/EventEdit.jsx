//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './EventEdit.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 


export default function EventEdit() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const eventDetail = useSelector((store) => store.eventsReducer.eventsDetailReducer);
  const eventEdit = useSelector((store) => store.eventsReducer.eventsEditReducer);
  const eventsCategories = useSelector(store => store.eventsReducer.eventsCategoriesReducer);
  const today = new Date().toISOString().substring(0, 10);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_EVENT', payload: { id: params.id } })//,
    // dispatch({ type: 'FETCH_EVENT_CATEGORIES' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the editMovie reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    dispatch({
      type: 'EVENT_EDIT_ONCHANGE',
      payload: { key: key, value: value }
    });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, eventEdit:', eventEdit);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending newPlant to our reducer: 
    dispatch({ type: 'SUBMIT_EVENT_EDIT', payload: eventEdit });
    // ⬇ Send user back to detail view:
    history.push(`/eventdetail/${eventDetail.id}`);
  } // End handleSubmit
  //#endregion ⬆⬆ Event handles above. 

  console.log('eventDetail is:', eventDetail);
  // ⬇ Rendering:
  return (
    <div className="EventEdit-wrapper">

      <h2>Edit This Event</h2>

      <div className="EventEdit-form">

        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name?"
            defaultValue={eventDetail?.name}
            className={classes.input}
            onChange={event => handleChange('name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
            size="small"
          />
          &nbsp;

          {/* <TextField
            label="Event Category?"
            defaultValue={eventDetail?.event_category}
            className={classes.select}
            onChange={event => handleChange('event_category', event.target.value)}
            required
            select
            size="small"
          >
            {eventsCategories?.map(eventCategory => (
              <MenuItem key={eventCategory.id} value={eventCategory.id}>{eventCategory.name}</MenuItem>
            ))}
          </TextField>
          <br /> <br />

          <TextField
            label="Description?"
            defaultValue={eventDetail?.description}
            className={classes.input}
            onChange={event => handleChange('description', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
            size="small"
          />
          <br /> <br />

          <TextField
            label="Start Date?"
            defaultValue={today}
            // defaultValue={eventDetail?.date_start}
            onChange={event => handleChange('date_start', event.target.value)}
            required
            type="date"
            size="small"
          />
          &nbsp;

          <TextField
            label="End Date?"
            defaultValue={today}
            // defaultValue={eventDetail?.date_end}
            onChange={event => handleChange('date_end', event.target.value)}
            required
            type="date"
            size="small"
          // defaultValue={newEvent.date_start}
          />
          &nbsp; */}

          <br /> <br />

          <Button
            name="cancel"
            onClick={() => history.push(`/eventdetail/${eventDetail.id}`)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <ArrowBackIcon />
          </Button> &nbsp;

          <Button
            name="submit"
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
          >
            <CheckCircleOutlineIcon />
          </Button>
        </form>

      </div>
    </div>
  )
}