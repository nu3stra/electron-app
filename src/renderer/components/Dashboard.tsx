// eslint-disable-next-line react/jsx-no-bind
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OsCard from './OsCard';
import HostCard from './HostCard';
import MemoryCard from './MemoryCard';
import RemoteCard from './RemoteCard';
import { DashboardLayout } from '../../types/DashboardLayout';
import { LayoutComponents } from '../../types/LayoutComponents';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const components: LayoutComponents = {
  OsCard: <OsCard />,
  HostCard: <HostCard />,
  MemoryCard: <MemoryCard />,
  RemoteCard: <RemoteCard />,
};

const initLayout: DashboardLayout = [
  {
    w: 2,
    h: 3,
    i: 'OsCard',
    name: 'OsCard',
    x: 0,
    y: 0,
  },
  {
    i: 'HostCard',
    name: 'HostCard',
    w: 2,
    h: 2,
    x: 2,
    y: 0,
  },
  {
    i: 'MemoryCard',
    name: 'MemoryCard',
    w: 2,
    h: 2,
    x: 0,
    y: 3,
  },
  {
    i: 'RemoteCard',
    name: 'RemoteCard',
    w: 2,
    h: 3,
    x: 2,
    y: 2,
  },
];

function Dashboard() {
  function getLayout(key: string) {
    let ls: DashboardLayout = [];
    let layouts: DashboardLayout;
    try {
      ls = JSON.parse(global.localStorage.getItem('dashboard') as string) || {};
    } catch (e) {
      /* empty */
    }
    // @ts-ignore
    if (!ls[key]) {
      layouts = initLayout;
    } else {
      // @ts-ignore
      layouts = ls[key];
    }

    return layouts;
  }
  function saveLayout(key: string, layoutData: DashboardLayout) {
    if (global.localStorage) {
      global.localStorage.setItem(
        'dashboard',
        JSON.stringify({
          [key]: layoutData,
        })
      );
    }
  }

  const [layout, setLayout] = useState<DashboardLayout>();
  const [selectCard, setSelectCard] = useState('');

  useEffect(() => {
    const savedLayout = getLayout('layouts');
    setLayout(savedLayout);
  }, []);

  function onLayoutChange(savedLayout: DashboardLayout) {
    saveLayout('layouts', savedLayout);
    setLayout(savedLayout);
  }

  function onCardRemove(id: string) {
    if (layout) {
      const newLayout: DashboardLayout = layout.filter((item) => item.i !== id);
      setLayout(newLayout);
    }
  }

  function addCard(id: string) {
    if (layout) {
      const newLayout: DashboardLayout = layout.concat({
        i: id,
        x: (layout.length * 2) % 12,
        y: Infinity,
        w: 2,
        h: 2,
        name: id,
      });
      setLayout(newLayout);
      saveLayout('layouts', newLayout);
    }
  }

  function handleSelectCard(event: SelectChangeEvent) {
    setSelectCard(event.target.value);
    addCard(event.target.value);
  }

  if (!layout) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="select-card-autowidth">Add new card</InputLabel>
        <Select
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleSelectCard}
          color="primary"
          id="select-card-autowidth"
          value={selectCard}
          label="Add new card"
          autoWidth
        >
          <MenuItem value="OsCard">OS Card</MenuItem>
          <MenuItem value="HostCard">Host Card</MenuItem>
          <MenuItem value="MemoryCard">Memory Card</MenuItem>
          <MenuItem value="RemoteCard">Remote Card</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveReactGridLayout
        className="layout"
        layout={layout}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        width={1200}
        // eslint-disable-next-line react/jsx-no-bind
        onLayoutChange={onLayoutChange}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="dashboard-item"
            data-grid={{
              i: item.i,
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            }}
          >
            {components[item.i]}
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              className="remove-card-button"
              onClick={() => onCardRemove(item.i)}
            >
              Remove Card
            </button>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default Dashboard;
