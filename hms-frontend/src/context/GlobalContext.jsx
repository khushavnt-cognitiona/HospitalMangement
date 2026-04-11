import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';
import wardService from '../services/wardService';

const GlobalStateContext = createContext();

const initialState = {
  doctors: [],
  appointments: [],
  notifications: [],
  wards: [],
  loading: false,
  error: null,
};

function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload, loading: false };
    case 'UPDATE_DOCTOR':
      return {
        ...state,
        doctors: state.doctors.map((doc) =>
          doc.id === action.payload.id ? { ...doc, ...action.payload } : doc
        ),
      };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload, loading: false };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50),
      };
    case 'SET_WARDS':
        return { ...state, wards: action.payload, loading: false };
    case 'UPDATE_WARD':
        return {
            ...state,
            wards: state.wards.map(w => w.id === action.payload.id ? { ...w, ...action.payload } : w)
        };
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const failedServices = React.useRef(new Set());

  const fetchInitialData = useCallback(async (isRetry = false) => {
    if (isRetry) failedServices.current.clear();
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Fetch Doctors
    if (!failedServices.current.has('doctors')) {
        try {
            const docs = await doctorService.getAllDoctors();
            dispatch({ type: 'SET_DOCTORS', payload: docs || [] });
        } catch (err) {
            failedServices.current.add('doctors');
        }
    }

    // Fetch Appointments
    if (!failedServices.current.has('appointments') && localStorage.getItem('hms_token')) {
        try {
            const apps = await appointmentService.getAllAppointments();
            dispatch({ type: 'SET_APPOINTMENTS', payload: apps || [] });
        } catch (err) {
            failedServices.current.add('appointments');
        }
    }

    // Fetch Wards
    if (!failedServices.current.has('wards')) {
        try {
            const wards = await wardService.getAllWards();
            dispatch({ type: 'SET_WARDS', payload: wards || [] });
        } catch (err) {
            failedServices.current.add('wards');
        }
    }

    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, fetchInitialData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};
