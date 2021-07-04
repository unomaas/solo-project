//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './EventDetail.css';
import KitItem from '../KitItem/KitItem';
import KitView from '../KitView/KitView';
// ⬇ Dependent functionality:
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/EditOutlined';
//#endregion ⬆⬆ Document setup above. 


export default function EventDetail() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const eventDetail = useSelector((store) => store.eventsReducer.eventsDetailReducer);
  const kits = useSelector((store) => store.kitsReducer.kitsReducer);

  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_EVENT', payload: { id: params.id } })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  // const testLog = (kit) => {
  //   console.log('In testLog, kit:', kit);
  // }

  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="EventDetail-wrapper" key={eventDetail?.id}>

      <div>
        <h2>{eventDetail?.id}</h2>
        <h2>{eventDetail?.name}</h2>
        <h2>{eventDetail?.description}</h2>
      </div>

      {/* <img
        className="movies-image"
        src={movieDetail?.poster}
        alt={movieDetail?.title}
      />

      <div className="MovieDetail-description">
        <h3>Description:</h3>
        <p>{movieDetail?.description}</p>
        <h3>Genres:</h3>
        <p>{movieDetail?.genres}</p>
      </div> */}

      <div>
        <Button
          name="back"
          onClick={() => history.goBack()}
          variant="outlined"
          color="secondary"
          size="small"
        >
          <ArrowBackIcon />
        </Button> &nbsp;

        <Button
          name="edit"
          onClick={() => history.push(`/eventedit/${eventDetail?.id}`)}
          variant="outlined"
          color="primary"
          size="small"
        >
          <EditIcon />
        </Button>

        <br /> <br />

        <KitView event={eventDetail} />


        {/* <div className="EventDetail-kitlist">
          <h3>Add Kits to bring:</h3>
          {kits.map(kit => {
            return <span>
              <KitItem key={kit.id} kit={kit} />
              <Button
                name="add"
                // onClick={() => testLog(kit)}
                color="primary"
                size="small"
              >
                Add
              </Button>
              <Button
                name="remove"
                color="secondary"
                size="small"
              >
                Remove
              </Button>
            </span>
          })}
        </div> */}

      </div>

    </div>
  ) // End return 
} // End MovieDetail
