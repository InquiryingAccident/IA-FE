import {create} from 'zustand';
interface FlightInfo {
  ident: string;
  identIcao: string;
  identIata: string;
  actualRunwayOff: string;
  actualRunwayOn: string;
  operator: string;
  operatorIcao: string;
  operatorIata: string;
  flightNumber: string;
  registration: string;
  aircraftType: string;
  status: string;
  scheduledOut: string;
  scheduledIn: string;
  estimatedOut: string;
  estimatedIn: string;
  actualOut: string;
  actualIn: string;
  departureDelay: number;
  arrivalDelay: number;
  blocked: boolean;
  diverted: boolean;
  cancelled: boolean;
  origin: {
    name: string;
    city: string;
    iata: string;
    icao: string;
    timezone: string;
    airportInfoUrl: string;
  };
  destination: {
    name: string;
    city: string;
    iata: string;
    icao: string;
    timezone: string;
    airportInfoUrl: string;
  };
}

interface FlightsState {
  flights: FlightInfo[] | null;
  setFlights: (newFlights: FlightInfo[]) => void;
  clearFlights: () => void;
}

export const useFlightsStore = create<FlightsState>(set => ({
  flights: [],
  setFlights: flights => set({flights}),
  clearFlights: () => set({flights: []}),
}));
