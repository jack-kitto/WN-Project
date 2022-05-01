import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTable from './DataTable';
import BasicCard from './BasicCard';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://192.168.82.87:3003');


const baseUrl = 'http://192.168.82.87:3001/area'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
    const [area1Data, setArea1Data] = React.useState([{}])
    const [area2Data, setArea2Data] = React.useState([{}])
    const [area3Data, setArea3Data] = React.useState([{}])
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cardStyle = {
        width: '275',
        margin: '10px',
    }
    const tableStyle = {
        width: '700px', 
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "50px",
    }
    const cardsContainer = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }

    React.useEffect(() => {
        // setInterval(loadData, 2000);
        loadData()
        client.onopen = () => {
            console.log("WebSocket Client Connected")
        }
    }, [])

    client.onmessage = (message) => {
        loadData()
    }

    function loadData() {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch(baseUrl + "/get?area=1", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea1Data(result.data)
        })
        .catch(error => console.log('error', error));

        fetch(baseUrl + "/get?area=2", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea2Data(result.data)
        })
        .catch(error => console.log('error', error));

        fetch(baseUrl + "/get?area=3", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea3Data(result.data)
        })
        .catch(error => console.log('error', error));
    }



  function getTripsPerSecond(data){
      let startTime = data[0].epochTime
      let endTime = data[data.length - 1].epochTime
      let duration = endTime - startTime
      return (data.length/(duration)).toFixed(4)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Area One" {...a11yProps(0)} />
          <Tab label="Area Two" {...a11yProps(1)} />
          <Tab label="Area Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <div style={cardsContainer}>
            <div style={cardStyle}>
                <BasicCard title="Total trips" data={area1Data.length} />
            </div>
            <div style={cardStyle}>
                <BasicCard title="Trips per second" data={getTripsPerSecond(area1Data)} />
            </div>
          </div>
        <div style={tableStyle}>
            <DataTable rows={area1Data} /> 
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div style={cardsContainer}>
            <div style={cardStyle}>
                <BasicCard title="Total trips" data={area2Data.length} />
            </div>
            <div style={cardStyle}>
                <BasicCard title="Trips per second" data={getTripsPerSecond(area2Data)} />
            </div>
          </div>
          <div style={tableStyle}>
            <DataTable rows={area2Data} /> 
          </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <div style={cardsContainer}>
            <div style={cardStyle}>
                <BasicCard title="Total trips" data={area3Data.length} />
            </div>
            <div style={cardStyle}>
                <BasicCard title="Trips per second" data={getTripsPerSecond(area3Data)} />
            </div>
          </div>
          <div style={tableStyle}>
            <DataTable rows={area3Data} /> 
          </div>
      </TabPanel>
    </Box>
  );
}