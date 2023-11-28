import { Button } from '@mui/material';

function StreamButton({ provider }: { provider: string }) {
  const openProvider = () => {
    // Open the corresponding link based on the provider
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
        // Default behavior if the provider is not matched
        break;
    }
  };

  return (
    <Button
    aria-label='Stream'
    className="shadow-md hover:scale-110"
      style={{
        minHeight: '50px',
        minWidth: '80px',
        borderRadius: '8px',
        backgroundColor: 'black',
        marginTop: '10px',
        marginBottom: '10px',
        background: `url('/Logos/${provider}.png')`, // Replace 'your-image-url.jpg' with the actual URL of your image
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
      }}
      onClick={openProvider}
    ></Button>
  );
}

export default StreamButton;
