import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTable from './DataTable';
import BasicCard from './BasicCard';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://192.168.64.164:3003');


const baseUrl = 'http://192.168.64.164:3001/area'
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
    const [area1Entries, setArea1Entries] = React.useState([{}])
    const [area1Exits, setArea1Exits] = React.useState([{}])
    const [area2Entries, setArea2Entries] = React.useState([{}])
    const [area2Exits, setArea2Exits] = React.useState([{}])
    const [area1Data, setarea1Data] = React.useState()
    const [area2Data, setarea2Data] = React.useState()

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const cardStyle = {
        width: '275',
        margin: '10px',
    }
    const tableStyle = {
        margin: "10px",
        justifyContent: "space-around",
        display: "flex",

    }
    const cardsContainer = {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }


    React.useEffect(() => {
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

        fetch(baseUrl + "/get?area=area1Entries", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea1Entries(result.data)
        })
        .catch(error => console.log('error', error));

        fetch(baseUrl + "/get?area=area1Exits", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea1Exits(result.data)
        })
        .catch(error => console.log('error', error));

        fetch(baseUrl + "/get?area=area2Entries", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea2Entries(result.data)
        })
        .catch(error => console.log('error', error));

        fetch(baseUrl + "/get?area=area2Exits", requestOptions)
        .then(response => response.json())
        .then(result => {
            setArea2Exits(result.data)
        })
        .catch(error => console.log('error', error));
    }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Area One" {...a11yProps(0)} />
          <Tab label="Area Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div style={cardsContainer}>
            <div style={cardStyle}>
              <BasicCard title="People currently inside area 1" data={area1Entries.length - area1Exits.length} />
            </div>
          </div>
          <div style={tableStyle}>
            <div>
              <h3>Incoming</h3>
              <DataTable rows={area1Entries} /> 
            </div>
            <div>
              <h3>Outgoing</h3>
              <DataTable rows={area1Exits} /> 
            </div>
          </div>

        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <div style={cardsContainer}>
            <div style={cardStyle}>
              <BasicCard title="People currently inside area 2" data={area2Entries.length - area2Exits.length} />
            </div>
          </div>
          <div style={tableStyle}>
            <div>
              <h3>Incoming</h3>
              <DataTable rows={area2Entries} /> 
            </div>
            <div>
              <h3>Outgoing</h3>
              <DataTable rows={area2Exits} /> 
            </div>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
