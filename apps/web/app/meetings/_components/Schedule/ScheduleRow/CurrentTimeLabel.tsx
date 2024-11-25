interface CurrentTimeLabelProps {
  position: number;
  time: string;
}

export default function CurrentTimeLabel(props: CurrentTimeLabelProps): JSX.Element {
  const { position, time } = props;
  return (
    <div
      className="text-xs-semibold text-custom-black absolute -bottom-24 z-30 -ml-16 rounded bg-none md:-bottom-20 md:block"
      style={{ left: `${position}px` }}
    >
      {time}
    </div>
  );
}
