'use client';

import { useContext } from 'react';
import TravelLogContext from '@/TravelLogContext';
import TravelLogForm from '@/components/TravelLogForm';
import { TravelLogActionType } from '@/types/TravelLogProviderTypes';

export default function TravelLogSidebar() {
  const { state, dispatch } = useContext(TravelLogContext);

  const setSidebarVisibility = (data: boolean) => {
    dispatch({
      type: TravelLogActionType.SET_SIDEBAR_VISIBLE,
      data,
    });
  };

  const closeSideBar = () => setSidebarVisibility(false);

  return (
    <>
      <div className="fixed top-2 right-2 z-[999]">
        <button
          onClick={() => {
            if (state.map) {
              // TODO: adjust center according to sidebar size...
              const data = state.map.getCenter();
              dispatch({
                type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
                data,
              });
              state.map.flyTo(data, 5);
            }
            setSidebarVisibility(true);
          }}
          className="btn btn-info"
        >
          Add Travel Log
        </button>
      </div>
      {state.sidebarOpen && (
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
          <TravelLogForm onCancel={closeSideBar} onComplete={closeSideBar} />
        </div>
      )}
    </>
  );
}
