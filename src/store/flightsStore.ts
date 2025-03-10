// useUserStore.ts
import {create} from 'zustand';

/* 
    항공편 실제 필요한 정보
    ident: 항공편 코드
    identIcao: 항공편 코드 ICAO
    identIata: 항공편 코드 IATA

    actualRunwayOff: 실제 이륙 시간
    actualRunwayOn: 실제 착륙 시간
    operator: 운항사
    operatorIcao: 운항사 ICAO
    operatorIata: 운항사 IATA
    flightNumber: 항공편 번호
    registration: 항공기 등록번호
    aircraftType: 항공기 종류
    status: 항공편 상태
    scheduledOut: 예정 이륙 시간
    scheduledIn: 예정 착륙 시간
    estimatedOut: 예상 이륙 시간
    estimatedIn: 예상 착륙 시간
    actualOut: 실제 이륙 시간
    actualIn: 실제 착륙 시간
    departureDelay: 출발 지연 시간
    arrivalDelay: 도착 지연 시간
    Origin: {
        name: 출발 공항 이름
        city: 출발 공항 도시
        country: 출발 공항 국가
        iata: 출발 공항 IATA
        icao: 출발 공항 ICAO
        latitude: 출발 공항 위도
        longitude: 출발 공항 경도
        timezone: 출발 공항 시간대
        airportInfoUrl  출발 공항 정보 URL
    }
    Destination: {
        name: 도착 공항 이름
        city: 도착 공항 도시
        country: 도착 공항 국가
        iata: 도착 공항 IATA
        icao: 도착 공항 ICAO
        latitude: 도착 공항 위도
        longitude: 도착 공항 경도
        timezone: 도착 공항 시간대
        airportInfoUrl  도착 공항 정보 URL
    }
*/
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
  Origin: {
    name: string;
    city: string;
    country: string;
    iata: string;
    icao: string;
    latitude: number;
    longitude: number;
    timezone: string;
    airportInfoUrl: string;
  };
  Destination: {
    name: string;
    city: string;
    country: string;
    iata: string;
    icao: string;
    latitude: number;
    longitude: number;
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
  flights: null,
  setFlights: flights => set({flights}),
  clearFlights: () => set({flights: null}),
}));
