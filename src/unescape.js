import escapeMap from './_escapeMap';
import invert from './invert';
import createEscaper from './_createEscaper';

export default createEscaper(invert(escapeMap));