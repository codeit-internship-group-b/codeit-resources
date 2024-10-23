import SeatBlock from "./SeatBlock";
/*
좌석 배치도
A1, A2, A3, A4     ___ B6, B7, B8, B9, B10

C1, C2, C3, C4, C5 ___ D1, D2, D3, D4, D5
C6, C7, C8, C9, C10 ___ D6, D7, D8, D9, D10

E1, E2, E3, E4, E5 ___ F1,F2, F3, F4, F5
E6, E7, E8, E9, E10 ___ F6, F7, F8, F9, F10

G1, G2, G3, G4, G5 ___ H1, H2, H3, H4, H5
G6, G7, G8, G9, G10 ___ H6, H7, H8, H9, H10

I1, I2, I3, I4, I5 ___ J1, J2, J3, J4, J5
*/

const SEAT_GRID = {
  A: ["A1", "A2", "A3", "A4"],
  B: ["B1", "B2", "B3", "B4", "B5"],
  C: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  D: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  E: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
  F: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
  G: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
  H: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
  I: ["I1", "I2", "I3", "I4", "I5"],
  J: ["J1", "J2", "J3", "J4", "J5"],
};

export default function SeatGrid(): JSX.Element {
  return (
    <div className="w-660 md:w-1004 m-auto grid grid-cols-2 gap-20 md:gap-40">
      <SeatBlock seats={SEAT_GRID.A} />
      <SeatBlock seats={SEAT_GRID.B} />
      <SeatBlock seats={SEAT_GRID.C} />
      <SeatBlock seats={SEAT_GRID.D} />
      <SeatBlock seats={SEAT_GRID.E} />
      <SeatBlock seats={SEAT_GRID.F} />
      <SeatBlock seats={SEAT_GRID.G} />
      <SeatBlock seats={SEAT_GRID.H} />
      <SeatBlock seats={SEAT_GRID.I} />
      <SeatBlock seats={SEAT_GRID.J} />
    </div>
  );
}
