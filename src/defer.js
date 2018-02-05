import partial from './partial';
import delay from './delay';

export default partial(delay, partial.placeholder, 1);