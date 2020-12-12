import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import SpaRoundedIcon from '@material-ui/icons/SpaRounded';
import ColorLensRoundedIcon from '@material-ui/icons/ColorLensRounded';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';

export const colors = {
  mindfulness: '#21B093',
  exercise: '#feb721',
  tech: '#6289ff',
  arts: '#995AE8',
  other: '#ff7f7e'
}

export function getPrimaryColor(category) {
  let hexColor, rgbColor, icon; 

  if (category === 'mindfulness') {

    hexColor = colors.mindfulness;
    rgbColor = 'rgba(33, 176, 147, 0.1)';
    icon = <SpaRoundedIcon style={{ color: hexColor }} />; 

  } else if (category === 'exercise') {

    hexColor = colors.exercise;
    rgbColor = 'rgba(254, 183, 33, 0.1)';
    icon = <SportsHandballRoundedIcon style={{ color: hexColor }} />; 

  } else if (category === 'tech') {
    
    hexColor = colors.tech;
    rgbColor = 'rgba(98, 137, 255, 0.1)';
    icon = <ComputerRoundedIcon style={{ color: hexColor }} />; 

  } else if (category === 'arts') {

    hexColor = colors.arts;
    rgbColor = 'rgba(153, 90, 232, 0.1)';
    icon = <ColorLensRoundedIcon style={{ color: hexColor }} />; 

  } else if (category === 'other') {

    hexColor = colors.other;
    rgbColor = 'rgba(255, 127, 126, 0.1)';
    icon = <EmojiObjectsRoundedIcon style={{ color: hexColor }} />; 

  }

  return {
    hexColor,
    rgbColor,
    icon
  }
}