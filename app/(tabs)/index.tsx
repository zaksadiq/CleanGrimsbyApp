import { StyleSheet } from 'react-native';
import { Button, SafeAreaView, Image } from 'react-native';

import { useState, useEffect } from 'react';

import Heatmap, { PROVIDER_GOOGLE } from 'react-native-maps';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import MapView, { Marker } from 'react-native-maps';

import pinicon from '../../assets/marker-black.png'
import piniconsmall from '../../assets/marker-black-small.png'
import pinicongreensmall from '../../assets/marker-green-small.png'

import {
  ref,
  onValue,
  push,
  set,
  update,
  remove
} from 'firebase/database';
import { db } from '../../components/FB_GetMarkers';

export default function TabOneScreen() {
  // const [id, setId] = useState<number>(0);
  const [markers, setMarkers] = useState<{location: {latitude: number, longitude: number}, done: Boolean, words: string}[]>([]);
  const [isSettingPos, setIsSettingPos] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<{latitude: number, longitude: number}>('Awaiting Region');

  // const mks = ref(db, '/markers');
  
  // // .once('value')
  // // .then(snapshot => {
  // //   console.log('User data: ', snapshot.val());
  // // });;
  // console.log(`mks : ${JSON.stringify(mks)}`);
  // console.log('About to do onValue');
  // onValue(mks, (snapshot) => {
  //     console.log('Done Query');
  //     console.log(`Snapshot : ${snapshot}`);
  //     let data = snapshot.val() || {};
  //     let markersData = {...data};
  //     console.log('Got Markers');
  //     setMarkers(markersData);
  //     console.log('Set Markers.');
  //     console.log(JSON.stringify(markersData));
  // });
  // connect firebase

  // Run on component mount.
  //  Get Markers
  useEffect(() => {
    return getMarkers();
  }, []); // Empty dependency array means effect only runs once, i.e. on mount. 

  // CRUD : Create
  const addMarker = (location: {latitude: number, longitude: number}, words: string) => {
    const markersRef = ref(db, '/markers');
    const newMarkersRef = push(ref(db, '/markers'));
    set(newMarkersRef, {
      id: 123,
      location: location,
      words: words
    });
  }
  // CRUD : Read
  const getMarkers = () => {
    console.log('markers:');
    console.log(JSON.stringify(markers));
    console.log('Using effect');
    return onValue(ref(db, '/markers'), snapshot => {
      console.log('Done Query');
      console.log(`Snapshot : ${snapshot}`);
      let data = snapshot.val() || {};
      console.log(`Data : ${data}`);
      // let markerjData = {...data};
      console.log('Got Markers');
      setMarkers(data);
      console.log('Set Markers.');
      // console.log(JSON.stringify(markers));
    }, err => { console.error(`error : ${err}`); });
  }

  // Draw Markers on Heatmap
  const drawMarkers = () => {
    {
      console.log('Drawing markers!');
      // return markers != null ?
      console.log(`markers : ${markers}`);
      if (markers) {
        let mkrs = markers;
        // console.log(`mkrs[0] : ${JSON.stringify(mkrs[1])}`)
        console.log(`mkrs:${JSON.stringify(mkrs)}`);
        let markerArr = [];

        Object.keys(mkrs).forEach((key, index) => {
          console.log('Drawing !~! ' + key + " ; " + index);
          console.log(mkrs[key].location);
          console.log(mkrs[key].words);
          // return <Marker
          //   coordinate={{ latitude: mkrs[key].location.latitude, longitude: mkrs[key].location.longitude }}
          //   description={mkrs[key].words}
          //   // draggable
          //   image={piniconsmall}
          //   key={index}
          //   // onPress={(e) => alert('test')}
          //   // pinColor='purple'
          //   title={'Marker!'}
          // />
          markerArr.push(<Marker
            coordinate={{ latitude: mkrs[key].location.latitude, longitude: mkrs[key].location.longitude }}
            description={mkrs[key].words}
            // draggable
            image={piniconsmall}
            key={index}
            // onPress={(e) => alert('test')}
            // pinColor='purple'
            title={'Marker ' + key}
          />)
          console.log('pushed item');
        });
        return markerArr;
      };
      }
      // : null
        {/* {markers.map((marker, index) => (
          <Marker
            coordinate={marker.latlng}
            description={marker.description}
            key={index}
            pinColor={"purple"}
            title={marker.title}
          />
        ))}
        <Marker
          coordinate={{latitude: 53.58163612360219, longitude: -0.07845662534236908}}
          title="Test Marker!"
          description="Test!"
          /> */}
    }

  return (
    <View style={styles.container}>
      <Heatmap
        initialRegion={{
          latitude: 53.552492,
          longitude: -0.086581,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        }}
        points={[{
          latitude: 53.552492,
          longitude: -0.086581,
          weight: 1}]}
        onPress={ e => { 
          // setMarkers([...markers, {location: [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude], description: 'test!'}]);
          // setId(id+1);
          // alert('setmarker! 😇😙😙😋😊');
        }}
        onRegionChangeComplete={ e => {setCoordinate({latitude: e.latitude, longitude: e.longitude});}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
      >
        {drawMarkers()}
      </Heatmap>
      {isSettingPos ?
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={pinicon} />
        </View>
        : null}


      <SafeAreaView style={styles.footer}>
      <Button style={styles.footer} title={isSettingPos?"Place Marker":"Flag Litter"} onPress={()=>{ if (isSettingPos) { 
        // setMarkers([...markers, { location: [coordinate.latitude, coordinate.longitude], description: 'test!'}]);
        let location = {"latitude": coordinate.latitude, "longitude": coordinate.longitude};
        let words = "placeholder";
        addMarker(location, words);
        setIsSettingPos(false);
      } else { setIsSettingPos(true) }
    }} />
          <Text style={styles.footerText}>{JSON.stringify(coordinate)}</Text>
          {/* <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text> */}
        </SafeAreaView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    bottom: 10,
    position: 'absolute',
    textAlign: 'center',
    width: '60%'
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    width: 85,
    height: 85,
  },
  markerFixed: {
    height: 'auto',
    left: '50%',
    marginLeft: -36,
    marginTop: -79,
    position: 'absolute',
    top: '50%',
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
