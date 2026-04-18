
import Beams from './Beams.jsx'


export default function Hero() {
  return (
    <div className='w-full' style={{ height: '1080px', position: 'relative' }}>
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={17}
        lightColor="#008b6b"
        speed={3.1}
        noiseIntensity={2}
        scale={0.25}
        rotation={0}
      />
    </div>
  );
}
