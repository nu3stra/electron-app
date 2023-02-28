// eslint-disable-next-line react/jsx-no-bind
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import OsCard from './OsCard';
import HostCard from './HostCard';
import MemoryCard from './MemoryCard';
import RemoteCard from './RemoteCard';
import { DashboardLayout } from '../../types/DashboardLayout';
import { LayoutComponents } from '../../types/LayoutComponents';
import CardSelect from './CardSelect';
import LanguageSelect from './LanguageSelect';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const { t } = useTranslation();
  const components: LayoutComponents = {
    OsCard: <OsCard deleteCard={cardRemove} />,
    HostCard: <HostCard deleteCard={cardRemove} />,
    MemoryCard: <MemoryCard deleteCard={cardRemove} />,
    RemoteCard: <RemoteCard deleteCard={cardRemove} />,
  };

  function getLayout() {
    const key = 'layoutData';
    let savedLayout: DashboardLayout = [];
    let storageLayout: DashboardLayout = [];
    if (global.localStorage) {
      try {
        storageLayout =
          JSON.parse(global.localStorage.getItem('layouts') as string) || {};
        if (storageLayout) {
          // @ts-ignore
          savedLayout = storageLayout[key];
        }
      } catch (e) {
        console.log(e);
      }
    }

    return savedLayout;
  }
  function saveLayout(layoutData: DashboardLayout) {
    if (global.localStorage) {
      global.localStorage.setItem(
        'layouts',
        JSON.stringify({
          layoutData,
        })
      );
    }
  }

  const [layout, setLayout] = useState<DashboardLayout>();

  useEffect(() => {
    const savedLayout = getLayout();
    setLayout(savedLayout);
  }, []);

  function onLayoutChange(savedLayout: DashboardLayout) {
    saveLayout(savedLayout);
    setLayout(savedLayout);
  }

  function cardRemove(id: string) {
    if (layout) {
      const newLayout: DashboardLayout = layout.filter((item) => item.i !== id);
      saveLayout(newLayout);
      setLayout(newLayout);
    }
  }

  function addCard(id: string) {
    if (layout?.length) {
      let allowSave = true;
      // eslint-disable-next-line array-callback-return
      layout.map((item) => {
        if (item.i === id) {
          allowSave = false;
        }
      });
      if (allowSave) {
        const newLayout: DashboardLayout = layout.concat({
          i: id,
          x: (layout.length * 2) % 12,
          y: Infinity,
          w: 4,
          h: 4,
          name: id,
        });
        setLayout(newLayout);
        saveLayout(newLayout);
      }
    } else {
      const newLayout: DashboardLayout = [
        {
          i: id,
          x: 2,
          y: Infinity,
          w: 4,
          h: 4,
          name: id,
        },
      ];
      setLayout(newLayout);
      saveLayout(newLayout);
    }
  }

  if (!layout) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <LanguageSelect />
      <CardSelect addCard={addCard} />
      {layout.length > 0 ? (
        <ResponsiveReactGridLayout
          className="layout"
          layout={layout}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          width={1200}
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
            </div>
          ))}
        </ResponsiveReactGridLayout>
      ) : (
        <Box sx={{ textAlign: 'center', marginTop: '10%' }}>
          <Typography component="div" variant="h4">
            {t('dashboard.empty')}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
