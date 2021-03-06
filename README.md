# Angular Programming Exercise

Some environmental sensors have been deployed on the field.
There are various types of sensors (CO, Temperature, O3, SO2, Humidity, …).
Sensors are housed in boxes, and a box contains one sensor of each kind.
Boxes have been placed at various locations.
The sensor data has been collected in a JSON file with the following schema:

```json
{
  "id": "Box-A1-O3", // UUID for this sensor reading
  "box_id": "Box-A1", // UUID of the box
  "sensor_type": "O3", // type of the sensor
  "name": "Ozone", // type of data read by sensor
  "range_l": 0, // measuring range lower bound
  "range_u": 1000, // measuring range upper bound
  "longitude": -0.06507, // location of the box (lon)
  "latitude": 51.51885, // location of the box (lat)
  "reading": 817, // actual value being read
  "unit": "ppm", // measurement unit
  "reading_ts": "2019-09-10T00:00:00" // when the reading was taken
}
```

The file can be found in the data/ directory

#### Basic Task

Write an Angular application which

1.  reads the records from the sensor_readings.json (**DONE**)
2.  displays them in a tabular component (nothing too ugly) (**DONE**)
3.  allows the user to sort data by time and sensor type (**DONE**)

#### Extra Tasks (two maximum)

- allow user to enter new sensor data. (**DONE**)
- allows the user to filter data by sensor type/name. (**DONE**)
- plot a graph of sensor readings over time.
- allow user to see sensor location on a map(use any lib google maps, openStreetMaps, openLayers, etc).
- aggregate the data from all readings for the same sensor type, and compute the median of all its values. e.g (**DONE**)

| Box         | Sensor Type | Median | Unit |
| ----------- | ----------- | ------ | ---- |
| Box-A1-O3   | O3          | 321    | ppm  |
| Box-A1-TEMP | TEMP        |        |      |

#### Submission

I approached this project trying to maximise my immpact in the allotted amount of time, going for the mandatory parts first and then expanding upon them.

I decided to use a simple `create-react-app`-based template to get the core logic running as quickly as possible and then moved on implmenting more features.

To run the project, please just clone it and then then in the project folder run

```bash
npm i; npm start
```

Alternatively, you can run

```bash
yarn; yarn start
```

In order to display the required amount of data, I decided to use `react-virtualized`, a popular library that, as the name implies, gives virtualisation functionalities which were highly recommended by the sheer size of data to be displayed and potentially manipulated with ease and a smooth UX.

For the interface I pondered about employing `material-ui`, which I tend to favour to quickly setup interfaces, but ultimately found it might have been an overkill for our simple needs and opted to fall back to `react-bootstrap`.

While well aware that only 2 extra tasks were required, I opted to complete a third one also to refresh myself how to handle tabular data with a specific library I have not been playing with for a while and ultimately decided to submit that too - I hope you won't mind it much and feel free to otherwise ignore that.
