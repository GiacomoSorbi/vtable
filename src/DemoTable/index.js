import React from "react";
import { AutoSizer, Column, Table, SortDirection } from "react-virtualized";
import Button from "react-bootstrap/Button";

import _ from "lodash";

import FormInput from "../FormInput";
import Tabs from "../Tabs";
import NewEntryModal from "./NewEntryModal";

import { mean, median } from "../utils/array";

import { FilterControl, Wrapper, TableWrapper } from "./styles.js";

class DemoTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],

      sortable: ["sensor_type", "reading_ts"],
      sortBy: "",
      sortDirection: SortDirection.ASC,
      sortedList: [],

      sensorType: "",
      sensorName: "",

      activeTab: 0,

      metrics: [],
      showNewEntryModal: false,
    };
  }

  componentDidMount() {
    fetch("sensor_reading.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ list: json });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, sortDirection, list, sensorType, sensorName } = this.state;
    if (
      sortBy !== prevState.sortBy ||
      sortDirection !== prevState.sortDirection ||
      list.length !== prevState.list.length ||
      sensorType !== prevState.sensorType ||
      sensorName !== prevState.sensorName
    ) {
      this.setState({
        sortedList: this._sortList({
          sortBy,
          sortDirection,
        }).filter(
          (item) =>
            item.sensor_type.includes(sensorType.trim()) &&
            item.name.includes(sensorName.trim())
        ),
      });
    }

    if (list.length !== prevState.list.length) {
      const boxes = new Set(list.map((item) => item.box_id));

      const getMetrics = (_list) => {
        const sensorTypes = new Set(_list.map((item) => item.sensor_type));

        return Array.from(sensorTypes).map((sensorType) => ({
          box_id: _list[0].box_id,
          unit: _list.filter((item) => item.sensor_type === sensorType)[0].unit,
          sensor_type: sensorType,
          median: median(
            _list
              .filter((item) => item.sensor_type === sensorType)
              .map((item) => item.reading)
          ).toFixed(2),
          mean: mean(
            _list
              .filter((item) => item.sensor_type === sensorType)
              .map((item) => item.reading)
          ).toFixed(2),
        }));
      };

      this.setState({
        metrics: Array.from(boxes).reduce(
          (prev, curr) => [
            ...prev,
            ...getMetrics(list.filter((item) => item.box_id === curr)),
          ],
          []
        ),
      });
    }
  }

  _sortList = ({ sortBy, sortDirection }) => {
    const { list } = this.state;
    let newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const { sortable } = this.state;
    if (sortable.includes(sortBy)) {
      const sortedList = this._sortList({ sortBy, sortDirection });
      this.setState({ sortBy, sortDirection, sortedList });
    }
  };

  toggleNewEntryModal() {
    const { showNewEntryModal } = this.state;
    this.setState({ showNewEntryModal: !showNewEntryModal });
  }

  render() {
    const {
      sensorType,
      sensorName,
      activeTab,
      sortBy,
      sortDirection,
      sortedList,
      metrics,
      showNewEntryModal,
      list,
    } = this.state;

    return (
      <Wrapper>
        <FilterControl>
          <FormInput
            label="Sensor Type:"
            value={sensorType}
            onChange={(sensorType) => this.setState({ sensorType })}
          />
          <FormInput
            label="Sensor Name:"
            value={sensorName}
            onChange={(sensorName) => this.setState({ sensorName })}
          />
          <Button onClick={this.toggleNewEntryModal.bind(this)}>Add New</Button>
        </FilterControl>
        <Tabs
          tabs={["Data", "Metrics"]}
          activeIndex={activeTab}
          onChange={(activeTab) => this.setState({ activeTab })}
        />

        {activeTab === 0 && (
          <TableWrapper>
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={30}
                  sort={this._sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  rowCount={sortedList.length}
                  rowGetter={({ index }) => sortedList[index]}
                >
                  <Column label="Id" dataKey="id" width={100} />
                  <Column label="Box Id" dataKey="box_id" width={100} />
                  <Column
                    label="Sensor Type"
                    dataKey="sensor_type"
                    width={150}
                  />
                  <Column label="Unit" dataKey="unit" width={100} />
                  <Column label="Name" dataKey="name" width={300} />
                  <Column label="Range L" dataKey="range_l" width={100} />
                  <Column label="Range U" dataKey="range_u" width={100} />
                  <Column label="Longitude" dataKey="longitude" width={100} />
                  <Column label="Latitude" dataKey="latitude" width={100} />
                  <Column label="Reading" dataKey="reading" width={100} />
                  <Column label="Reading TS" dataKey="reading_ts" width={300} />
                </Table>
              )}
            </AutoSizer>
          </TableWrapper>
        )}
        {activeTab === 1 && (
          <TableWrapper>
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={30}
                  rowCount={metrics.length}
                  rowGetter={({ index }) => metrics[index]}
                >
                  <Column label="Box Id" dataKey="box_id" width={100} />
                  <Column
                    label="Sensor Type"
                    dataKey="sensor_type"
                    width={150}
                  />
                  <Column label="Median" dataKey="median" width={100} />
                  <Column label="Mean" dataKey="mean" width={100} />
                  <Column label="Unit" dataKey="unit" width={100} />
                </Table>
              )}
            </AutoSizer>
          </TableWrapper>
        )}
        <NewEntryModal
          show={showNewEntryModal}
          onAdd={(newItem) => {
            const _list = [newItem, ...list];
            this.setState({ list: _list, showNewEntryModal: false });
          }}
          onClose={this.toggleNewEntryModal.bind(this)}
        />
      </Wrapper>
    );
  }
}

export default DemoTable;
