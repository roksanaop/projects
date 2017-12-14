export class CreatedData { 
  key: string;
  value: any[];
  color: string;
}

export class GraphData { 
  barData: BarData[];
  mapData: MapData[];
  linearData: LinearData[];
}

export class BarData {
  word: string; 
  freq: number;
  color: string;
}

export class MapData {
  word: string; 
  coords: number[];
  color: string;
}

export class LinearData {
  word: string; 
  color: string;
  data: any[];
}

export class Dimensions { 
  width: number;
  height: number;
  margin?: MarginDim;
}

export class MarginDim {
  top: number; 
  right: number;
  bottom: number;
  left: number;
}
