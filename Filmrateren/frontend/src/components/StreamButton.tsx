import { Button } from '@mui/material';
import netflix from '../assets/Netflix.svg';
import viaplay from '../assets/Viaplay.svg';
import apple from '../assets/Apple.svg';
import amazon from '../assets/Amazon.svg';
import disney from '../assets/Disney.svg';
import hbo from '../assets/HBO.svg';
import hbomax from '../assets/HBOMax.svg';
import google from '../assets/Google.svg';
import sfanytime from '../assets/SF.svg';
import strim from '../assets/Strim.svg';
import tv2 from '../assets/TV2.svg';

const getLogoByProvider = (provider: string) => {
  switch (provider) {
    case 'Netflix':
      return netflix;
    case 'Viaplay':
      return viaplay;
    case 'Apple TV':
      return apple;
    case 'Amazon Prime Video':
      return amazon;
    case 'Disney +':
      return disney;
    case 'HBO':
      return hbo;
    case 'HBO Max':
      return hbomax;
    case 'Google Play Movies':
      return google;
    case 'SF Anytime':
      return sfanytime;
    case 'Strim':
      return strim;
    case 'TV 2 Play':
      return tv2;
    default:
      return null;
  }
};

function StreamButton({ provider }: { provider: string }) {
  const logo = getLogoByProvider(provider);

  const openProvider = () => {
    // Open the corresponding link based on the streaming provider
    switch (provider) {
      case 'Netflix':
        window.open('https://www.netflix.com/no-en/', '_blank');
        break;
      case 'Viaplay':
        window.open('https://viaplay.no/no-nb/', '_blank');
        break;
      case 'Apple TV':
        window.open('https://tv.apple.com/no', '_blank');
        break;
      case 'Amazon Prime Video':
        window.open('https://www.primevideo.com/', '_blank');
        break;
      case 'Disney +':
        window.open('https://www.disneyplus.com/', '_blank');
        break;
      case 'HBO':
        window.open('https://www.hbo.com/', '_blank');
        break;
      case 'HBO Max':
        window.open('https://www.hbomax.com/no/no', '_blank');
        break;
      case 'Google Play Movies':
        window.open('https://play.google.com/store/movies', '_blank');
        break;
      case 'SF Anytime':
        window.open('https://www.sfanytime.com/no/', '_blank');
        break;
      case 'Strim':
        window.open('https://www.strim.no/', '_blank');
        break;
      case 'TV 2 Play':
        window.open('https://play.tv2.no/', '_blank');
        break;
      default:
        // Do not do anything if the provider is not matched
        break;
    }
  };

  return (
    <Button
      aria-label="Stream"
      className="shadow-md hover:scale-110"
      style={{
        height: '50px',
        width: '80px',
        borderRadius: '8px',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundImage: `url(${logo})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
      }}
      onClick={openProvider}
    />
  );
}

export default StreamButton;
